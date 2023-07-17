import axios,{CreateAxiosDefaults,AxiosInstance,AxiosRequestConfig} from 'axios';

// axios对象默认基本配置
const defaultConfig:CreateAxiosDefaults = {
    baseURL:import.meta.env.VITE_APP_REQUEST_BASE_URL+import.meta.env.VITE_APP_API_URL,
    timeout:1000,
    withCredentials: false // 禁用 Cookie 等信息
}

// 创建请求实例对象
const requestInstance:AxiosInstance = axios.create(defaultConfig);
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
    }
}