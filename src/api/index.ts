import axios,{CreateAxiosDefaults,AxiosInstance,AxiosRequestConfig, InternalAxiosRequestConfig,AxiosResponse,AxiosError} from 'axios';
import {getAccessToken,getRefreshToken,clearStorage, setSessionStorage,TokenEnum} from '@/utils/sessionStorage'
import {ElMessage, ElMessageBox} from "element-plus"
import {useUserStoreWithPinia} from "@/store/module/user"

// axios对象默认基本配置
const defaultConfig:CreateAxiosDefaults = {
    baseURL:import.meta.env.VITE_APP_REQUEST_BASE_URL+import.meta.env.VITE_APP_API_URL,
    timeout:1000,
    withCredentials: false // 禁用 Cookie 等信息
}

// 创建一个请求列表,当访问令牌过期时,使用刷新令牌刷新访问之后,重放请求
let requestList:any[] = [];
// 当前是否正在执行刷新令牌的操作。
let isRefresh = false;

const whitelist = ["/user/login","/oauth2/token/get"]
// 创建请求实例对象
const requestInstance:AxiosInstance = axios.create(defaultConfig);

// 配置请求拦截器,并在请求开始前,向请求头中插入访问令牌信息
requestInstance.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    // 当前请求是否需要设置
    let isToken = true;
    whitelist.some(item=>{
        if(item == config.url){
            return (isToken = false)
        }
    })
    // 如果当前请求需要携带访问令牌则加上
    if(getAccessToken() && isToken){
        config.headers["authentication_token"]=getAccessToken();
    }
    return config;
},(error: AxiosError) => {
    Promise.reject(error)
  });

// 配置响应拦截器
requestInstance.interceptors.response.use(async (response:AxiosResponse<any>)=>{
    // console.log("响应处理");
    // console.log(response);
    const resultCode = response.data.code;
    const config = response.config;
    // 刷新令牌过期
    if(resultCode==6000006 || resultCode == 6000007){
        reLoginMessageBox();
    }
    // 访问令牌过期
    if(resultCode!=6000003 && resultCode != 6000004){
        return Promise.resolve(response);
    }
    // 当前正在执行刷新时,将请求放置到请求队列中
    if(isRefresh){
        return new Promise((resolve)=>{
            requestList.push((accessToken:string)=>{
                config.headers["authentication_token"] = accessToken;
                resolve(requestInstance(config));
            })
        })
    }
    // 还并未进行刷新令牌操作,说明刷新令牌可能过期了
    if(!isRefresh){
        // 执行刷新令牌的操作
        isRefresh = true;
        try{
            const token = await refreshToken(getRefreshToken());
            setSessionStorage(TokenEnum.accessToken,token.data.data.accessToken);
            setSessionStorage(TokenEnum.refreshToken,token.data.data.refreshToken);
            // 令牌刷新完成
            const newAccessToken = getAccessToken();
            config.headers["authentication_token"] = getAccessToken();
            // 执行请求队列回放
            requestList.forEach((item:any)=>{
                item(newAccessToken);
            })
            // 回放本请求
            return requestInstance(config);
        }catch(e){
            console.log("刷新令牌获取出现异常");
            // 如果刷新令牌报异常。
            const userStore = useUserStoreWithPinia();
            // 重设用户信息
            userStore.$reset();
            // 将SessionStorage中的内容清空
            clearStorage();
            // 再次执行一遍路由，走一遍router.beforeEach()
            window.location.href = window.location.href
        }finally{
            requestList = [];
            isRefresh = false;
        }
    }
    return response;
},async (error:AxiosError)=>{
    console.log("响应异常处理");
    console.log(error);
    return Promise.reject(error);
})
async function refreshToken(refreshToken:string){
    return requestInstance({
        method:'post',
        url:"/oauth2/token/get",
        data:{
            requestType:"refresh",
            refreshToken:refreshToken
        },
        headers:{
            client_id:"default",
            secret:"default"
        }
    });
}
function reLoginMessageBox(){
    ElMessageBox.alert(
        "当前用户访问令牌已过期，请重新登录！",
        "提示!",
        {
            confirmButtonText:'确定',
            callback:()=>{
            // 如果刷新令牌报异常。
            const userStore = useUserStoreWithPinia();
            // 重设用户信息
            userStore.$reset();
            // 将SessionStorage中的内容清空
            clearStorage();
            // 再次执行一遍路由，走一遍router.beforeEach()
            window.location.href = window.location.href
            }
        }
    )
}
  // 常用的get、post、put、delete HTTP方法
export default{
    get:async (config:AxiosRequestConfig):Promise<any> =>{
        const response = await requestInstance({
            method:'get',
            ...config
        });
        return response.data
    },
    post: async (config:AxiosRequestConfig):Promise<any> => {
        const response = await requestInstance({
            method:'post',
            ...config
        });
        return response.data;
    },
    put: async (config:AxiosRequestConfig):Promise<any> => {
        const response = await requestInstance({
            method:'put',
            ...config
        });
        return response.data;
    },
    delete: async (config:AxiosRequestConfig):Promise<any> =>{
        const response = await requestInstance({
            method:'delete',
            ...config
        })
        return response.data;
    }
}