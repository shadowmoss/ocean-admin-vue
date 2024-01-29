import request from '@/api/index.ts';
export function getUserRoleList(id:number){
    return request.get({
        url:"/permission/list/user/binded/role",
        params:{
            id:id
        }
    })
}
export function userBindRole(data:any){
    return request.post({
        url:"/permission/user/bind/role",
        data:data
    })
}
export function roleBindMenu(data:any){
    return request.post({
        url:"/permission/role/bind/menu",
        data:data
    })
}
export function getRoleBindedMenuList(id:number){
    return request.get({
        url:"/permission/list/role/binded/menu",
        params:{
            id:id
        }
    })
}