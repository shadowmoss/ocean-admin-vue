import axios,{CreateAxiosDefaults,AxiosInstance,AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError} from 'axios';
import {getAccessToken,geRefreshToken,clearStorage, setSessionStorage,TokenEnum} from '@/utils/sessionStorage'
import {ElMessage} from "element-plus"
import {useUserStoreWithPinia} from "@/store/module/user"
import { rejects } from 'assert';

// axios对象默认基本配置
const defaultConfig:CreateAxiosDefaults = {
    baseURL:import.meta.env.VITE_APP_REQUEST_BASE_URL+import.meta.env.VITE_APP_API_URL,
    timeout:1000,
    withCredentials: false // 禁用 Cookie 等信息
}

// 创建一个请求列表,当访问令牌过期时,使用刷新令牌刷新访问之后,重放请求
let requestList:any[] = [];

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
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  });

// 配置响应拦截器
requestInstance.interceptors.response.use((response)=>{
    console.log("当前响应的内容");
    console.log(response);
    return response;
},async (error:AxiosError)=>{
    // console.log(error);
    let isRefresh = false;
    let msg = null;
    if(!error.response||!error.response.data||!error.response.data.code){
        return Promise.reject(error);
    }
    const {data} = error.response;
    const code = data.code;
    msg = data.message;
    const config = error.config;
    if(code!=6000003 && code != 6000004){
        return Promise.reject(error);
    }
        // 表示当前未进行令牌刷新
        if(!isRefresh){
            // 如果当前正在执行令牌刷新
            // 将请求保存起来
            config.headers["authentication_token"] = getAccessToken();
            requestList.push(()=>{
                requestInstance(config);
            })
            // return Promise.reject(error);
        }
        isRefresh = true;
        // 如果获取不到刷新令牌则执行重新登录
        if(!geRefreshToken()){
            const userStore = useUserStoreWithPinia();
            // 重设用户信息
            userStore.$reset();
            // 将SessionStorage中的内容清空
            clearStorage();
            // 再次执行一遍路由，走一遍router.beforeEach()
            window.location.href = window.location.href
        }
        // 进行刷新令牌的请求
        try{
            const token = await refreshToken(geRefreshToken())
            setSessionStorage(TokenEnum.accessToken,token.data.data.accessToken);
            setSessionStorage(TokenEnum.refreshToken,token.data.data.refreshToken);
            // 刷新成功重放请求列表
            requestList.forEach(async (item)=>{
                await item();
            })
            config.headers["authentication_token"] = getAccessToken();
        }catch(e){
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
        ElMessage({
            message:msg,
            type:"error"
        })
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