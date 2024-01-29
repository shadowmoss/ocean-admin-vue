<template>
    <Dialog v-model="isShowDialog" :title="title">
        <ElForm
            ref="roleFormRef"
            :model="form"
            :rules="rule"
        >
        <ElRow>
            <ElCol 
                :span="24"
            >
            <ElFormItem label="角色名称" prop="name">
                <ElInput v-model="form.name"/>
            </ElFormItem>
            </ElCol>
            <ElCol 
                :span="24"
            >
            <ElFormItem label="角色标识" prop="code">
                <ElInput v-model="form.code"/>
            </ElFormItem>
            </ElCol>
            <ElCol 
                :span="24"
            >
            <ElFormItem label="显示顺序" prop="roleOrder">
                <ElInputNumber v-model="form.roleOrder" controls-position="right"/>
            </ElFormItem>
            </ElCol>
            <ElCol 
                :span="24"
            >
            <ElFormItem label="状态" prop="status">
                <ElSelect v-model="form.status">
                    <ElOption 
                        v-for=" option in options"
                        :key="option.key"
                        :value="option.value"
                        :label="option.label"
                    />
                </ElSelect>
            </ElFormItem>
            </ElCol>
            <ElCol 
                :span="24"
            >
            <ElFormItem label="备注" >
                <ElInput type="textarea" v-model="form.remark"/>
            </ElFormItem>
            </ElCol>
        </ElRow>
        </ElForm>
        <template #footer>
            <ElButton type="primary" @click="submitRole">提交</ElButton>
            <ElButton @click="isShowDialog=false">取消</ElButton>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
import {createRole,getRoleOne,updateRole} from "@/api/system/role/index"
import Dialog from "@/components/dialog/index.vue"
import {RoleForm,FormType} from "@/types/form";
import {ElForm,FormRules,FormInstance, ElRow, ElCol, ElFormItem,ElSelect,ElOption,ElInput,ElButton,ElInputNumber} from "element-plus";
import { Ref, reactive, ref } from "vue";
import {OptionProperty} from '@/types/searchProperty';
import {RoleStatus} from "@/enums/roles";
const emits = defineEmits({
    "success":()=>{
        return true;
    }
})
const formType:Ref<FormType> = ref(undefined);
const title = ref("");
const isShowDialog = ref(false);
const form:RoleForm = reactive({
    id:undefined,
    name:undefined,
    code:undefined,
    roleOrder:undefined,
    status:undefined,
    remark:undefined
})
const roleFormRef = ref<FormInstance>();
const options:Array<OptionProperty>=[
    {
        key:"enable",
        value:RoleStatus.ENABLE,
        label:"启用",
    },
    {
        key:"disable",
        value:RoleStatus.DISABLE,
        label:"停用",
    }
]
const rule = reactive<FormRules<RoleForm>>({
    name:[
        {
            required:true,
            type:"string",
            message:"请输入角色名称",
            trigger:"blur",
        }
    ],
    code:[
        {
            required:true,
            type:"string",
            message:"请输入角色标识",
            trigger:"blur",
        }
    ],
    roleOrder:[
        {
            required:true,
            type:"number",
            message:"请输入显示顺序",
            trigger:"blur",
        }
    ],
    status:[
        {
            required:true,
            type:"number",
            message:"请选择一个角色状态",
            trigger:"blur"
        }
    ]
});
const open = async (type:FormType,id:number)=>{
    resetForm();
    isShowDialog.value = true;
    switch(type){
        case "create":
            title.value = "新增角色"
            formType.value = "create";
            break;
        case "update":
            const data =  await getRoleOne(id);
            console.log(data.data.id);
            form.id = data.data.id;
            form.name = data.data.name;
            form.code = data.data.code;
            form.roleOrder = data.data.order;
            form.status = data.data.status;
            form.remark = data.data.remark;
            title.value = "更新角色"
            formType.value = "update";
            break;
    }
}
function resetForm(){
    form.id=undefined;
    form.name=undefined;
    form.code=undefined;
    form.roleOrder=undefined;
    form.status=undefined;
    form.remark=undefined;
}
async function submitRole(){
    switch(formType.value){
        case "create":
            await createRole(form);
            emits("success");
            break;
        case "update":
            console.log("更新角色时的数据打印")
            console.log(form);
            await updateRole(form);
            emits("success");
            break;
    }
    resetForm();
    isShowDialog.value = false;
}
defineExpose({
    open,
})
</script>