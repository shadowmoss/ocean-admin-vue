import request from '@/api/index'
export function listMenu(data:any){
    return request.get({
        url:"/menu/list",
        params:data
    })
}
export function deleteMenu(id:number){
    return request.delete({
        url:"/menu/delete",
        params:{
            id:id
        }
    });
}
export function getMenuOne(id:number){
    return request.get({
        url:"/menu/getOne",
        params:{
            id:id
        }
    })
}
export function createMenu(data:any){
    return request.post({
        url:"/menu/create",
        data:data,
    })
}
export function updateMenu(data:any){
    return request.put({
        url:"/menu/update",
        data:data,
    })
}