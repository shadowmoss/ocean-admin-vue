import request from '@/api/index';
export function register(data:any):Promise<any>{
   return request.post({
        url:"/user/register",
        data:{...data}
    })
}