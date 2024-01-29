import request  from '@/api'

export function login(data:any){
    return request.post({
        url:'/user/login',
        data:data
    });
}
export function logout(){
    return request.post({
        url:'/user/logout'
    })
}