import Content from '@/layout/components/content.vue'
import Menu from '@/layout/components/menu/menu.vue'
import LayoutHeader from "@/layout/components/top/layoutheader.vue";
import {usePermissionStore} from "@/store/module/permission";
export const layoutFactory = () => {
    const permissionStore = usePermissionStore();
            let routes = permissionStore.getRoutes;
            console.log(routes);
            permissionStore.$subscribe((mutation,state)=>{
                console.log("路由信息发生了变化");
                routes = state.originalRoutes;
            })
    const classicLayout = ()=>{
        return (
        <>
            <div class={'page-left grow basis-[15%] bg-[#545c64]'}>
                <Menu routes={routes}></Menu>
            </div>
            <div class={'page-content flex flex-col grow basis-[85%]'}>
                <div class={'grow basis-[10%] border-b-2 border-solid border-[#eee]'}>
                    <LayoutHeader />
                </div>
                <Content class={'grow basis-[80%] '}/>
                <div class={'page-footer grow basis-[10%] bg-red-700'}>
                    <h2>页脚</h2>
                </div>
            </div>
        </>
        )
    }
    return {
        classicLayout
    }
}