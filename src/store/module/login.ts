import { defineStore } from "pinia";
import {store} from '@/store/index.ts'
import {LoginStatus} from '@/enums/login';
interface LoginState{
    loginState:LoginStatus
}
export const loginSettingStore = defineStore('loginState',{
    state:():LoginState=>{
        return {
            loginState:LoginStatus.LOGIN
        };
    },
    getters:{
        getLoginState(state){
            return state.loginState;
        }
    },
    actions:{
        setLoginState(){
            this.loginState = LoginStatus.LOGIN;
        },
        setRegisterState(){
            this.loginState = LoginStatus.REGISTER;
        },
        setLoginedState(){
            this.loginState = LoginStatus.LOGINED
        }
    }
})