import { createRouter,createWebHistory,Router,RouterOptions} from 'vue-router';
import {routes} from '@/router/routes.ts';
import {App} from 'vue';
import {getAccessToken} from "@/utils/sessionStorage"
import {useUserStoreWithPinia} from '@/store/module/user'
import {usePermissionStoreWithPinia} from '@/store/module/permission'
const routerOptions:RouterOptions = {
    history:createWebHistory(),
    routes:routes,
}

const router =  createRouter(
    routerOptions
);
async function initRouter(router:Router){
    if(getAccessToken()){
        const userPermission = usePermissionStoreWithPinia();
            const userStore = useUserStoreWithPinia();
            // 如果当前用户未设置，表示为第一次登录系统，需要去获取用户权限信息
            if(!userStore.getIsSetUser){
                await userStore.getUserState();
            // 获取当前用户的可用菜单。
                await userPermission.generateRoute();
                userPermission.getAddtionalRoute.forEach(item=>{
                    router.addRoute(item);
                });
            }
    }
}
export async function setupRouter (app:App<Element>){
    await initRouter(router);
    app.use(router);
}
export {router};