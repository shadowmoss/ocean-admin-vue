import {router} from "@/router"
import {getAccessToken} from "@/utils/sessionStorage"
import {useUserStoreWithPinia} from '@/store/module/user'
import {usePermissionStoreWithPinia} from '@/store/module/permission'

router.beforeEach(async (to,from,next)=>{
    if(to.name!="login"&&getAccessToken()){
        // 执行获取当前用户的角色权限等信息
        if(to.path=="/login"){
            next({name:'home'});
        }
        else{
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
            next();
        }
    }else{
        if(from.name!='login'&&to.name!="login"){
            next({name:"login"})
        }else{
            next();
        }
    }
})