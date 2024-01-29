<script lang="tsx">
import {defineComponent} from 'vue';
import {ElMenu,ElScrollbar,} from 'element-plus';
import {renderMenuItem} from "@/layout/components/menu/components/renderMenuItems";
    // 有时间研究一下在tailwind中如何全局设置主题颜色
    export default defineComponent({
        props:['routes'],
        setup(props){
            const menuMode = 'vertical';
            return ()=> (
                <>
                <ElScrollbar>
                    <ElMenu
                        mode={menuMode}
                        backgroundColor="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        router={true}
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