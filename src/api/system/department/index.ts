import request from '@/api/index.ts'
export function getdepts(data:any){
    return request.get({
        url:"/dept/get",
        params:data
    })
}