<template>
    <ElDialog
        :close-on-click-modal="true"
        destroy-on-close
        draggable
        
    >
        <template
            #header
        >
            <div>
                <slot name="title">
                {{ props.title }}
            </slot>
            </div>
        </template>
        <slot>
        </slot>
        <template #footer>
            <slot name="footer">
            </slot>
        </template>
    </ElDialog>
</template>
<script lang="ts" setup>
import { ElDialog } from 'element-plus';
const props = defineProps({
    title:{
        type:String,
        required:true,
        default: "",
    }
})
</script>
<style lang="scss">
.el-dialog__header{
    margin-right:0;
    border-bottom:1px solid rgb(203 213 225);
}
</style>