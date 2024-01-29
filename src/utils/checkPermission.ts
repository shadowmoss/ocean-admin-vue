import {getSessionStorage,userStateLocalStorage} from '@/utils/sessionStorage'
export function checkPerm(value:Array<string>){
    if(value && value.length > 0){
       const userState = getSessionStorage(userStateLocalStorage);
       // 该字符串表示拥有所有的权限
       const all_permission = "*:*:*";
       const result = value.some(permission =>{
        return userState.userPermissions.includes(all_permission) || all_permission === permission || userState.userPermissions.includes(permission);
       })
       console.log("打印权限检查结果")
       console.log(result);
       return !!result;
    }else{
        return false;
    }
}