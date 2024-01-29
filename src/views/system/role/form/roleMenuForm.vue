<template>
    <Dialog v-model="isShowDialog" :title="title">
        <ElForm
            :model="form"
        >
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="角色名称:"
                    >
                    <ElTag>{{ roleName }}</ElTag>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="角色标识:"
                    >
                    <ElTag>
                        {{ roleCode }}
                    </ElTag>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="菜单权限:"
                    >
                        <ElTree
                            ref="MenuTreeRef"
                            :data="treeData"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            highlight-current
                            check-strictly
                            :props="defaultProps"
                        >
                        </ElTree>
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
import {roleBindMenu,getRoleBindedMenuList} from '@/api/system/permission/index'; 
import {RoleUpdateMenuForm} from "@/types/form"
import {MenuStatus} from "@/enums/menu"
import {getRoleOne} from "@/api/system/role/index";
import {listMenu} from '@/api/system/menu/index.ts'
import Dialog from "@/components/dialog/index.vue"
import {ElButton,ElForm,ElRow,ElCol,ElFormItem,ElTree,ElTag} from "element-plus"
import {reactive,ref} from "vue"
const MenuTreeRef = ref();
const isShowDialog = ref(false);
const title = ref("");
const roleName = ref("");
const roleCode = ref("");
const form:RoleUpdateMenuForm = reactive({
    roleId:undefined,
    menuIds:[]
})
let treeData=ref<any[]>([])
const defaultProps = {
    label:'name',
    children:'children',
}
async function submit(){
    form.menuIds = [
        ...MenuTreeRef.value.getHalfCheckedKeys(false),
        ...MenuTreeRef.value.getCheckedKeys(false),
    ]
    await roleBindMenu(form);
    isShowDialog.value = false;
}
async function open(id:number){
    isShowDialog.value = true;
    resetForm();
    title.value = "角色分配菜单";
    form.roleId = id;
    await getRoleById(form.roleId);
    await getMenuListTree();
    await getBindedMenuList(form.roleId);
}
async function getRoleById(id:number){
    const data =  await getRoleOne(id); 
    roleName.value = data.data.name;
    roleCode.value = data.data.code;
}
defineExpose({
    open
})
function resetForm(){
    form.roleId = undefined;
    form.menuIds = [];
}
async function getMenuListTree(){
    const data = await listMenu({
        name:undefined,
        status:MenuStatus.ENABLE
    });
    console.log(data.data);
    treeData.value = data.data;
}
async function getBindedMenuList(id:number){
    const data = await getRoleBindedMenuList(id);
    const checked = data.data.map((item:any)=>{return item.id});
    console.log(data.data);
    // 设置不递归选中父节点的所有子节点。
    for(const menuId of checked){
        MenuTreeRef.value.setChecked(menuId,true,false);
    }
}
</script>