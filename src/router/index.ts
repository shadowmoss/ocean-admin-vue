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
// TODO 刷新访问令牌的逻辑尚未完成。
async function initRouter(router:Router){
    if(getAccessToken()){
        const userPermission = usePermissionStoreWithPinia();
            const userStore = useUserStoreWithPinia();
            // 如果当前用户未设置，表示为第一次登录系统，需要去获取用户权限信息
            if(!userStore.getIsSetUser){
                await userStore.getUserState();
            // 获取当前用户的可用菜单。
                await userPermission.generateRoute();
            // 将获取到的可用菜单添加到路由列表中。
                userPermission.getAddtionalRoute.forEach(item=>{
                    router.addRoute(item);
                });
            }
    }
}
export async function setupRouter (app:App<Element>){
    // 解决刷新页面之后，路由丢失的问题，刷新窗口之后,整个Vue对象重新生成。
    await initRouter(router);
    app.use(router);
}
export {router};