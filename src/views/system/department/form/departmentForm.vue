<template>
    <Dialog v-model="isShowDialog" :title="title">
        <ElForm
            ref="deptFormRef"
            :model="form"
            :rules="rule"
        >
        </ElForm>
    </Dialog>
</template>
<script lang="ts" setup>
import {FormType} from "@/types/form"
import Dialog from "@/components/dialog/index.vue"
import { reactive, ref } from "vue";
import { ElForm, FormRules } from "element-plus";
const formType = ref("");
const title = ref("");
const isShowDialog = ref(false);
const form = reactive({
    id:undefined,
    name:undefined,
    parentId:undefined
})
const rule = reactive<FormRules>({
    name:[{
        required:true,
        type:"string",
        message:"请输入角色名称",
        trigger:"blur"
    }],
})
async function open(type:FormType,id:number){
    resetForm();
    isShowDialog.value = true;
    switch(type){
        case "create":
            title.value = "新增部门";
            formType.value = "create";
            break;
        case "update":
             
            break;
    }
}
function resetForm(){
    form.id = undefined;
    form.name = undefined;
    form.parentId = undefined;
}
defineExpose(
    {
        
    }
)
</script>