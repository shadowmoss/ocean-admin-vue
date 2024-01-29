import {defineStore } from 'pinia'
import {store} from '@/store/index';

export const useAuthorityStore = defineStore('authority',{
    state:()=>{
        return {
            defaultRoutes:[],
            addtionRoutes:[],
        }
    }
})
export function useAuthorityWithPinia(){
    useAuthorityStore(store);
}