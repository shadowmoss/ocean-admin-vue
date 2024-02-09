import Content from '@/layout/components/content.vue'
import Menu from '@/layout/components/menu/menu.vue'
import LayoutHeader from "@/layout/components/top/layoutheader.vue";
import {usePermissionStore} from "@/store/module/permission";
import { useUIStore } from '@/store/module/ui';
import {computed} from 'vue';
import {TabsView} from "@/layout/components/tabs/tab.tsx";
const uiStore = useUIStore();
const collapse = computed(()=>uiStore.getCollapse);
export const layoutFactory = () => {
    const permissionStore = usePermissionStore();
            let routes = permissionStore.getRoutes;
            permissionStore.$subscribe((mutation,state)=>{
                routes = state.originalRoutes;
            })
    const classicLayout = ()=>{
        return (
        <>
        {/* bg-[#545c64] */}
            <div class={[{
                'basis-[10%]':collapse.value,
                'basis-[2%]':!collapse.value,
                },
                "h-[100%]",
                "bg-[#545c64]"]}
                style="transition: all 0.2s">
                <Menu 
                    routes={routes}
                >
                </Menu>
            </div>
            <div class={'page-content flex flex-col basis-[90%]'}>
                <div class={'basis-[5%] border-b-2 border-solid border-[#eee]'}>
                    <LayoutHeader />
                </div>
                <div class={'basis-[5%] border-b-2 border-solid border-[--el-border-color]'}>
                    <TabsView ></TabsView>
                </div>
                <Content class={'grow basis-[90%] '}/>
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