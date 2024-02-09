import {RouterLink, useRouter} from "vue-router";
import {usePermissionStore} from "@/store/module/permission";
import {useTagsViewStore} from "@/store/module/tagsView"
import { computed,defineComponent, onMounted,unref} from "vue";
import { ElScrollbar, ElTag } from "element-plus";
import {filterTagsRoute} from "@/utils/routeUtils";
import Icon from "@/components/icon/Icon.vue";
const permissionStore = usePermissionStore();

const routes = computed(()=>permissionStore.getAddtionalRoute);

const tagsViewStore = useTagsViewStore();

const visitedView = computed(()=>tagsViewStore.getVisitedViews);

function pushToTargetRoute(item:any){
    console.log("导航至指定路由")
    console.log(item)
}
function closeTags(item:any){

}

function readnerTags(){ 
    console.log("打印计算属性")
    console.log(visitedView);
   return visitedView.value.map((item:any)=>{
    console.log("打印每一个选项")
    console.log(item)
    return (
        <>
        <ElTag 
            class={"ml-2 mt-2 cursor-pointer"}
            key={item.title} 
            closable
            type="primary"
            onClick={()=>pushToTargetRoute(item)}
            onClose={()=>closeTags(item)}
            >
                {
                    <div
                        class={"flex items-end justify-items-center"}
                    >
                        <Icon
                            
                            iconName={item.meta.icon}
                            width={14}
                        >
                        </Icon>
                        <div
                        >
                            {item.meta.title}
                        </div>
                    </div>
                    
                }
            
        </ElTag>
        </>
    )
    });
}
function init(){
    const filterResult = filterTagsRoute(unref(routes));
    for(const item of filterResult){
        tagsViewStore.addVisitedViews(item);
    }
}
export const TabsView = defineComponent({
    setup(){
        onMounted(()=>{
            init()
        })
        return {}
    },
    render(){
        return (
            <>
                <div
                >
                    <ElScrollbar
                    >
                            {readnerTags()}
                    </ElScrollbar>
                </div>
            </>
        )
    }
})