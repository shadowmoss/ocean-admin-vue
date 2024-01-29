import {defineStore} from 'pinia'
import {store} from '@/store/index'
import { RouteRecordRaw } from 'vue-router'
// import {userPermissionRoute,setLocalStorage,getLocalStorage} from "@/utils/localstorage"
import {setSessionStorage,getSessionStorage,userPermissionRoute} from '@/utils/sessionStorage';
import {getAuthorityMenu} from '@/api/system/authority/index'
import {routeGenerate} from '@/utils/routeUtils';
import {AuthorityMenu} from '@/types/route'
import {routes} from '@/router/routes'

export interface permissionState{
    originalRoutes:RouteRecordRaw[],
    addtionalRoutes:RouteRecordRaw[],
}
export const usePermissionStore = defineStore("permission",{
    state:():permissionState=>{
        return {
            originalRoutes:[],
            addtionalRoutes:[]
        }
    },
    getters:{
        getRoutes(state):RouteRecordRaw[]{
            return state.originalRoutes;
        },
        getAddtionalRoute():RouteRecordRaw[]{
            return this.addtionalRoutes;
        }
    },
    actions:{
        async generateRoute(){
            return new Promise<void>(async(resolve)=>{
            let authorityMenu:AuthorityMenu[] = [];
            // if(getLocalStorage(userPermissionRoute)){
            //     authorityMenu = getLocalStorage(userPermissionRoute);
            // }
            if(getSessionStorage(userPermissionRoute)){
                authorityMenu = getSessionStorage(userPermissionRoute);
            }
            // else{
            //     const data = await getAuthorityMenu();
            //     setLocalStorage(userPermissionRoute,data.data);
            //     authorityMenu = data.data;
            // }
            else{
                const data = await getAuthorityMenu();
                setSessionStorage(userPermissionRoute,data.data);
                authorityMenu = data.data;
            }
            const addtionals = routeGenerate(authorityMenu as AuthorityMenu[]);
            this.addtionalRoutes = addtionals;
            this.originalRoutes = [
                ...routes,
                ...addtionals
            ]
            resolve();
            })
        }
    }
})
export function usePermissionStoreWithPinia(){
    return usePermissionStore(store);
}