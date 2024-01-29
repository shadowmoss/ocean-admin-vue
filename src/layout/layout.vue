<script lang="tsx">
import {defineComponent} from 'vue'
import {layoutFactory} from '@/layout/components/layoutFactory.tsx'
// 当前
const layout:string = 'classic';
function renderLayout(layoutType:string){
    switch(layoutType){
        case 'classic':
            const { classicLayout } = layoutFactory();
            return classicLayout();
    }
}
// TSX模板语法,配合defineComponent定义组件。
export default defineComponent({
    setup(){
        return ()=>(
            <>
                <div class={"w-full h-full flex"}>
                    {renderLayout(layout)}
                </div>
            </>
        )
    }
})
</script>
