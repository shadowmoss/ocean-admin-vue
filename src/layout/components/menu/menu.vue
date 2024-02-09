<script lang="tsx">
import {defineComponent,computed} from 'vue';
import {ElMenu,ElScrollbar,} from 'element-plus';
import {renderMenuItem} from "@/layout/components/menu/components/renderMenuItems";
import { useUIStore } from '@/store/module/ui';
const uiStore = useUIStore();
const collapse = computed(()=>uiStore.getCollapse);
    // 有时间研究一下在tailwind中如何全局设置主题颜色
    export default defineComponent({
        props:['routes'],
        setup(props){
            const menuMode = 'vertical';
            return ()=> (
                <>
                    <ElScrollbar>
                    <ElMenu
                        collapse={!collapse.value}
                        mode={menuMode}
                        backgroundColor="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        router={true}
                        style={"border-right: none"}
                    >
                    {{
                        default:()=>renderMenuItem(props.routes)
                    }}
                    </ElMenu>
                </ElScrollbar>
                </>
            );
        }
    })
</script>