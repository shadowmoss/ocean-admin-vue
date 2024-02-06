import {defineStore} from 'pinia'
import {store} from '@/store/index';
import {getAuthenticatiedInfo} from '@/api/system/authority/index';
// import {setLocalStorage,userStateLocalStorage,getLocalStorage,getAccessToken,deleteLocalStorage,deleteAccessToken,userPermissionRoute} from '@/utils/localstorage';
import {setSessionStorage,getSessionStorage,getAccessToken,deleteAccessToken,userStateLocalStorage,deleteSessionStorage,userPermissionRoute} from '@/utils/sessionStorage';
import {logout} from '@/api/login/login';
interface UserVO{
    user_id:number,
    username:string,
    avatar:string,
    nickname:string,
}
interface UserState{
    user_permissions:[],
    user_roles:[],
    user:UserVO,
    isSetUser:boolean
}
export const useUserStore = defineStore('userStore',{
    state:():UserState=>{
        return {
            user_permissions:[],
            user_roles:[],
            user:{
                user_id:-1,
                username:'',
                avatar:'',
                nickname:''
            },
            isSetUser:false
        }
    },
    getters:{
        getIsSetUser(state){
            return state.isSetUser;
        }
    },
    actions:{
        async getUserState(){
            // 如果当前获取不到访问令牌,则说明未登录，
            if(!getAccessToken()){
                this.resetState();
                return null;
            }
            let userState =  getSessionStorage(userStateLocalStorage);
            if(!userState){
                const data =  await getAuthenticatiedInfo();
                userState = data.data
                setSessionStorage(userStateLocalStorage,userState);
            }
            this.user_permissions = userState.userPermissions;
            this.user_roles = userState.userRoles;
            this.user = userState.user;
            this.isSetUser = true;
        },
        async logout(){
            const res =  await logout();
            if(res.success){
                this.$reset();
                // 登出时删除本地用户信息
                // deleteLocalStorage(userStateLocalStorage);
                deleteSessionStorage(userStateLocalStorage);
                // 登出时删除访问令牌
                deleteAccessToken();
                // 登出时删除用户的菜单权限信息
                // deleteLocalStorage(userPermissionRoute);
                deleteSessionStorage(userPermissionRoute);
            }else{

            }
            return res;
        },
        resetState(){
            this.user_permissions=[],
            this.user_roles=[],
            this.user={
                user_id:-1,
                username:'',
                avatar:'',
                nickname:''
            },
            this.isSetUser=false
        }
    }
})
export function useUserStoreWithPinia(){
    return useUserStore(store);
} 