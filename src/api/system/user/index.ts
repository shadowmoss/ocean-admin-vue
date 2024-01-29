import request  from '@/api'
import { UserForm } from '@/types/form'

export function getUserList(data:{
    currentPageNo:number,
    pageSize:number,

}){
    return request.get({
        url:"/user/page",
        params:data
    })
}

export function createUser(data:UserForm){
    return request.post({
        url:"/user/create",
        data:data
    })
}

export function updateUser(data:UserForm){
    return request.put({
        url:"/user/update",
        data:data
    })
}
export function getUser(id:number){
    return request.get({
        url:"/user/getOne",
        params:{
            id:id
        },
    });
}
export function deleteUser(id:number){
    return request.delete({
        url:"/user/delete",
        params:{
            id:id
        }
    })
}