import { type } from "os";
import WebStorageCache from "web-storage-cache";

const webstorage = new WebStorageCache({
    storage:"localStorage"
})
// 设置localStorage
export function setLocalStorage(key:string,value:string){
    webstorage.set(key,value);
}
// 获取localStorage
export function getLocalStorage(key:string){
   return webstorage.get(key);
}
// 获取访问令牌
export function getAccessToken(){
   return webstorage.get(TokenEnum.accessToken);
}
// 删除访问令牌
export function deleteAccessToken(){
   webstorage.delete(TokenEnum.accessToken);
}
// 删除localstorage信息
export function deleteLocalStorage(key:string){
    webstorage.delete(key);
}
export enum TokenEnum{
    accessToken = "access",
    refreshToken = "refresh"
}
export const userStateLocalStorage = "USER_LOCAL_CACHE"; 
export const userPermissionRoute = "USER_PERMISSION_ROUTE";
