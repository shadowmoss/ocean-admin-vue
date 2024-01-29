import request from '@/api/index.ts';
export function pageOAuth2Client(params:any){
    return request.get({
        url:"/oauth2/client/page",
        params:params,
    });
}
export function createOAuth2Client(data:any){
    return request.post({
        url:"/oauth2/client/create",
        data:data
    })
}
export function updateOAuth2Client(data:any){
    return request.put({
        url:"/oauth2/client/update",
        data:data,
    })
}
export function deleteOAuth2Client(id:number){
    return request.delete({
        url:"/oauth2/client/delete",
        params:{
            id:id
        }
    })
}
export function getOAuth2ClientDetails(id:number){
    return request.get({
        url:"/oauth2/client/details",
        params:{
            id:id
        }
    })
}
export function refreshToken(params:any){
    return request.post({
        url:"/oauth2/token/get",
        data:{
            ...params,
            requestType:"refresh",
        }
    })
}