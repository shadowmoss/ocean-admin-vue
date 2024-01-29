import WebStorageCache from "web-storage-cache";
const sessionStorage = new WebStorageCache({
    storage:"sessionStorage"
})

// 设置会话存储
export function setSessionStorage(key:string,value:string){
    sessionStorage.set(key,value);
}
// 获取会话存储
export function getSessionStorage(key:string){
   return sessionStorage.get(key);
}
// 获取访问令牌
export function getAccessToken(){
    return sessionStorage.get(TokenEnum.accessToken);
 }
 // 删除访问令牌
export function deleteAccessToken(){
    sessionStorage.delete(TokenEnum.accessToken);
}
// 删除localstorage信息
export function deleteSessionStorage(key:string){
    sessionStorage.delete(key);
}
// 获取刷新令牌
export function geRefreshToken(){
    return sessionStorage.get(TokenEnum.refreshToken);
}

// 清空SessionStorage信息
export function clearStorage(){
    sessionStorage.clear();
}
export enum TokenEnum{
    accessToken = "access",
    refreshToken = "refresh"
}
export const userStateLocalStorage = "USER_LOCAL_CACHE"; 
export const userPermissionRoute = "USER_PERMISSION_ROUTE";