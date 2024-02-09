import {defineStore} from 'pinia';
import {store} from "@/store/index.ts";
interface UIStatus{
    collapse:boolean
}
export const useUIStore = defineStore("ui",{
    state:():UIStatus=>{
        return {
            collapse: true // 菜单折叠状态,默认打开
        }
    },
    getters:{
        getCollapse():boolean{
            return this.collapse;   
        }
    },
    actions:{
        setCollapse(collapse:boolean){
            this.collapse = collapse;
        }
    }
})