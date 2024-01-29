import request from '@/api/index'

export function getAuthenticatiedInfo(){
   return request.get({
        url:"/auth/get/authenticatied/info"
    });
}
export function getAuthorityMenu(){
    return request.get({
        url:"/auth/authority/menu"
    });
}