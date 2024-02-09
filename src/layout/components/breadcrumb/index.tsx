import { computed, defineComponent,ref,watch,unref,Ref} from "vue";
import { usePermissionStore } from "@/store/module/permission";
import {ElBreadcrumb,ElBreadcrumbItem, ElButton} from "element-plus";
import { useRouter,RouteLocationNormalizedLoaded, RouteRecordRaw} from "vue-router";
import {generateBreadcrumbItemList,treeToList} from '@/utils/routeUtils';
export default defineComponent({
    name:'breadcrumb',
    setup(){
        const levelList:any = ref([]);
        const router = useRouter();
        const currentRoute:Ref<RouteLocationNormalizedLoaded> = router.currentRoute;
        const permissionStore = usePermissionStore();
        const menuRoutes = computed(()=>{
            const routes = permissionStore.getAddtionalRoute;
            return routes;
        })
        const generateBreadcrumbList = ()=>{
            const resultTree = generateBreadcrumbItemList(unref(menuRoutes),(node:RouteRecordRaw)=>{
               return node.name === currentRoute.value.name;
            });
            levelList.value = treeToList(resultTree);
        }
        // 根据当前路由生成对应的breadcrumb树。
        function renderBreadcrumbItem(){
            return levelList.value.map((item:any)=>{
                return (
                    <>
                    <ElBreadcrumbItem to={{name:item.name}} key={item.meta.title}>
                        {item.meta.title}
                    </ElBreadcrumbItem>
                    </>
                )
            });
        }
        // 监听当前路由的变化
        // 只要变化了重新为Breadcrumb创建列表
        watch(() => currentRoute.value,
            (route:RouteLocationNormalizedLoaded)=>{
            generateBreadcrumbList();
        })
        return () => (
            <>
                <ElBreadcrumb separator="/">
                    {
                        renderBreadcrumbItem()
                    }
                </ElBreadcrumb>
            </>   
        )
        
    }
}) 