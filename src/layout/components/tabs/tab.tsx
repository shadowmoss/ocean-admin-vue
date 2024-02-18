import {RouterLink, useRouter} from "vue-router";
import {usePermissionStore} from "@/store/module/permission";
import {useTagsViewStore} from "@/store/module/tagsView"
import { computed,defineComponent, onMounted,ref,unref,watch} from "vue";
import { ElScrollbar, ElTag } from "element-plus";
import {filterTagsRoute} from "@/utils/routeUtils";
import Icon from "@/components/icon/Icon.vue";
const permissionStore = usePermissionStore();

const routes = computed(()=>permissionStore.getRoutes);

const tagsViewStore = useTagsViewStore();

const visitedView = computed(()=>tagsViewStore.getVisitedViews);


function readnerTags(){ 
   return visitedView.value.map((item:any)=>{
    const router = useRouter();
    function closeTags(item:any){
        tagsViewStore.deleteVisitedViews(item);
        const tagsList = tagsViewStore.getVisitedViews;
        const index = tagsList.length-1;
        router.push({name:tagsList[index].name||"home"});
    }
    return (
        <>
            <ElTag 
                class={"ml-2 mt-3"}
                key={item.name} 
                closable={true}
                type="primary"
                onClose={()=>closeTags(item)}
                >
                    {
                        <RouterLink to={{name:item.name}}>
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
                        </RouterLink>   
                    }
            </ElTag>
        </>
    )
    });
}
export const TabsView = defineComponent({

    setup(){
        const router = useRouter();
        const currentRoute = ref(router.currentRoute);
        onMounted(()=>{
            init()
            addTag();
        })
        function init(){
            const filterResult = filterTagsRoute(unref(routes));
                for(const item of filterResult){
                    tagsViewStore.addVisitedViews(item);
                }
        }
        function addTag(){
            tagsViewStore.addVisitedViews(unref(currentRoute));
        }

        watch(currentRoute,(newValue,oldValue)=>{
            addTag();
        })
        return {
        }
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