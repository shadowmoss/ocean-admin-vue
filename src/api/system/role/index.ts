import request from '@/api/index.ts';
import {RoleForm} from '@/types/form';
export function getRolePage(data:any){
    return request.get({
        url:"/role/page",
        params:data
    })
}
export function getRoleOne(id:number){
    return request.get({
        url:"/role/getOne",
        params:{
            id:id
        }
    })
}
export function createRole(data:RoleForm){
    return request.post({
        url:"/role/create",
        data:data
    })
}
export function updateRole(data:RoleForm){
    return request.put({
        url:"/role/update",
        data:data
    })
}
export function deleteRole(id:number){
    return request.delete({
        url:"/role/delete",
        params:{
            id:id
        }
    })
}
export function getEnableRoleList(){
    return request.get({
        url:"/role/list"
    })
}
