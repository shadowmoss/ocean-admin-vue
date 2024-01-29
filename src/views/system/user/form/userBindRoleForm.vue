<template>
    <Dialog v-model="isShowDialog" :title="title">
        <ElForm
            :model="form"
        >
            <ElRow>
                <ElCol :span="24">
                    <ElFormItem label="用户名称">
                        <ElInput v-model="username" disabled/>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol :span="24">
                    <ElFormItem label="用户昵称">
                        <ElInput v-model="nickname" disabled/>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol :span="24">
                    <ElFormItem label="角色">
                        <ElSelect 
                            v-model="form.roleIds"
                            multiple
                            placeholder="请选择角色"
                        >
                            <ElOption
                                v-for="item in roleList"
                                :key="item.key"
                                :value="item.value"
                                :label="item.label"
                            />
                        </ElSelect>
                    </ElFormItem>
                </ElCol>
            </ElRow>
        </ElForm>
        <template #footer>
            <ElButton
                type="primary"
                @click="submit"
            >
                提交
            </ElButton>
            <ElButton
                @click="isShowDialog=false"
            >
                取消
            </ElButton>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
import {getUserRoleList,userBindRole} from '@/api/system/permission/index.ts'
import {getUser} from '@/api/system/user/index.ts'
import {getEnableRoleList} from '@/api/system/role/index.ts'
import {ElButton,ElSelect,ElForm,ElRow,ElCol,ElFormItem,ElInput,ElOption} from "element-plus";
import {UserUpdateRoleForm} from "@/types/form";
import Dialog from "@/components/dialog/index.vue"
import {Ref, reactive, ref} from 'vue';
import { OptionProperty } from '@/types/searchProperty';
const isShowDialog = ref(false);
const title = ref("");
const username = ref("");
const nickname = ref("");
const roleList:Ref<Array<OptionProperty>> = ref([]);
const form:UserUpdateRoleForm = reactive({
    userId:undefined,
    roleIds:[],
})
function open(id:number){
    title.value="角色分配"
    isShowDialog.value = true;
    resetForm();
    form.userId = id;
    getRoleList();
    getUserOne(form.userId);
    getUserBindedRoles(form.userId);
}
async function submit(){
    await userBindRole(form);
    isShowDialog.value = false;
}
async function getUserOne(id:number){
    const data = await getUser(id);
    username.value = data.data.username;
    nickname.value = data.data.nickname;
}
async function getRoleList(){
    const data =  await getEnableRoleList();
    for(const item of data.data){
        const role:OptionProperty = {
            key:item.code,
            value:item.id,
            label:item.name
        };
        roleList.value.push(role);
    }
}
async function getUserBindedRoles(id:number){
    const data = await getUserRoleList(id);
    if(data.data){
        for(const item of data.data){
        form.roleIds?.push(item.id);
    }
    }
}
function resetForm(){
    form.userId = undefined;
    form.roleIds = [];
    roleList.value = [];
}
defineExpose({
    open
})
</script>
