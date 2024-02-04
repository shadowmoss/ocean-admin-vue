<template>
    <Dialog v-model="isShowDialog" :title="title">
        <ElForm
            :model="form"
            :rules="rules"
            ref="menuFormRef"
        >
        <ElRow>
            <ElCol
                :span="24"
            >
                <ElFormItem label="上级菜单">
                    <ElTreeSelect :disabled="isSelectAble" v-model="form.parentId" :data="MenuTree" check-strictly />
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow>
            <ElCol
                :span="24"
            >
                <ElFormItem label="菜单名称" prop="name">
                    <ElInput v-model="form.name" />
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow>
            <ElCol
                :span="24"
            >
                <ElFormItem label="菜单类型" prop="type">
                    <ElRadioGroup v-model="form.type">
                        <ElRadioButton
                            :label="MenuTypes.MENU_DIRECTORY"
                        >
                            目录
                        </ElRadioButton>
                        <ElRadioButton
                            :label="MenuTypes.MENU_PAGE"
                        >
                            菜单
                        </ElRadioButton>
                        <ElRadioButton
                            :label="MenuTypes.MENU_BUTTON"
                        >
                            按钮
                        </ElRadioButton>
                    </ElRadioGroup>
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type==MenuTypes.MENU_PAGE || form.type==MenuTypes.MENU_DIRECTORY"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="菜单图标" prop="icon">
                    <!-- <ElInput v-model="form.icon" /> -->
                    <IconSelect v-model="form.icon" @choose="(value)=>form.icon = value"/>
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type==MenuTypes.MENU_PAGE || form.type==MenuTypes.MENU_DIRECTORY"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="路由地址" prop="path">
                    <ElInput v-model="form.path" />
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type==MenuTypes.MENU_PAGE"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="组件地址" prop="component">
                    <ElInput v-model="form.component" />
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type==MenuTypes.MENU_PAGE"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="组件名称" prop="path">
                    <ElInput v-model="form.componentName" />
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type==MenuTypes.MENU_PAGE || form.type == MenuTypes.MENU_BUTTON"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="权限标识" prop="permission">
                    <ElInput v-model="form.permission" />
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type==MenuTypes.MENU_PAGE || form.type==MenuTypes.MENU_DIRECTORY"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="显示排序" prop="sort">
                    <ElInputNumber v-model="form.sort" controls-position="right"/>
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow>
            <ElCol
                :span="24"
            >
                <ElFormItem label="菜单状态" prop="status">
                    <ElRadioGroup
                        v-model="form.status"
                    >
                        <ElRadio
                            :label="MenuStatus.ENABLE"
                        >
                            启用
                        </ElRadio>
                        <ElRadio
                            :label="MenuStatus.DISABLE"
                        >
                            停用
                        </ElRadio>
                    </ElRadioGroup>
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type == MenuTypes.MENU_DIRECTORY|| form.type==MenuTypes.MENU_PAGE"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="显示状态" prop="visible">
                    <ElRadioGroup
                        v-model="form.visible"
                    >
                        <ElRadio
                            border
                            :label="MenuVisible.VISIBLE"
                        >
                            显示
                        </ElRadio>
                        <ElRadio
                            border
                            :label="MenuVisible.UNVISIBLE"
                        >
                            隐藏
                        </ElRadio>
                    </ElRadioGroup>
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type==MenuTypes.MENU_PAGE"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="是否缓存" prop="keepAlive">
                    <ElRadioGroup
                        v-model="form.keepAlive"
                    >
                        <ElRadio
                            border
                            :label="KeepAlive.CACHE"
                        >
                            缓存
                        </ElRadio>
                        <ElRadio
                            border
                            :label="KeepAlive.UNCACHE"
                        >
                            不缓存
                        </ElRadio>
                    </ElRadioGroup>
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElRow
            v-if="form.type == MenuTypes.MENU_DIRECTORY|| form.type==MenuTypes.MENU_PAGE"
        >
            <ElCol
                :span="24"
            >
                <ElFormItem label="总是显示" prop="alwaysShow">
                    <ElRadioGroup
                        v-model="form.alwaysShow"
                    >
                        <ElRadio
                            border
                            :label="MenuAlwaysShow.ALWAYS"
                        >
                            总是
                        </ElRadio>
                        <ElRadio
                            border
                            :label="MenuAlwaysShow.NOT"
                        >
                            不是
                        </ElRadio>
                    </ElRadioGroup>
                </ElFormItem>
            </ElCol>
        </ElRow>
        </ElForm>
        <template #footer>
            <ElButton
                type="primary"
                @click="submitMenu"
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
import IconSelect from '@/components/iconSelect/index.vue';
import {getMenuOne,listMenu,createMenu,updateMenu} from '@/api/system/menu/index'
import {ElForm,FormRules,ElButton,ElFormItem,ElTreeSelect,ElInputNumber,ElInput,ElRadioGroup,ElRadio,ElRadioButton,ElRow,ElCol} from "element-plus";
import Dialog from "@/components/dialog/index.vue"
import { FormType,MenuForm } from "@/types/form";
import {MenuOriginType,MenuSelectType} from '@/types/menuTypes';
import { reactive, ref,Ref} from "vue";
import { MenuStatus,MenuTypes,MenuVisible,KeepAlive,MenuAlwaysShow} from '@/enums/menu';
const isSelectAble = ref(false);
const isShowDialog = ref(false);
const formType:Ref<FormType> = ref(undefined);
const title = ref("");
const menuFormRef = ref();
const emits = defineEmits({
    "success":()=>{
        return true;
    }
})
const MenuTree:Ref<Array<MenuSelectType>>=ref([{
    value:0,
    parentId:-1,
    label:"主目录",
    children:[]
}])
const form:MenuForm = reactive({
    id:undefined,
    name:undefined,
    permission:undefined,
    type:undefined,
    sort:undefined,
    parentId:undefined,
    path:undefined,
    icon:undefined,
    component:undefined,
    componentName:undefined,
    status:undefined,
    visible:undefined,
    keepAlive:undefined,
    alwaysShow:undefined
})
const rules = reactive<FormRules<MenuForm>>({
    name:[
        {
            required:true,
            type:"string",
            message:"请输入菜单名称",
            trigger:"blur"
        }
    ],
    path:[
        {
            required:true,
            type:"string",
            message:"请输入路由地址",
            trigger:"blur",
        }
    ],
    sort:[
        {
            required:true,
            type:"number",
            message:"请输入排序",
            trigger:"blur"
        }
    ],
    status:[
        {
            required:true,
            type:"number",
            message:"请选择菜单状态",
            trigger:"blur"
        }
    ]
})
async function submitMenu(){
    if(!menuFormRef){
        return;
    }
    const validate = await menuFormRef.value.validate();
    if(!validate){
        return ;
    }
    switch(formType.value){
        case "create":
            await createMenu(form);
            emits("success");
            resetForm();
            break;
        case "update":
            await updateMenu(form);
            emits("success");
            resetForm();
            break;
        case "createChild":
            await createMenu(form);
            emits("success");
            resetForm();
            break;
    }
    isShowDialog.value = false;
}
async function open(obj:{type:FormType,id:number,parentId:number}){
    resetForm();
    getMenuList();
    switch(obj.type){
        case "create":
            console.log("新增菜单")
            initValue();
            formType.value = "create"
            title.value="新增菜单";
            break;
        case "update":
            console.log("更新菜单")
            const data = await getMenuOne(obj.id);
            console.log(data);
            form.id = data.data.id;
            form.name = data.data.name;
            form.permission = data.data.permission;
            form.type = data.data.type;
            form.sort = data.data.sort;
            form.parentId = data.data.parentId;
            form.path = data.data.path;
            form.icon = data.data.icon;
            form.component = data.data.component;
            form.componentName = data.data.componentName;
            form.status = data.data.status;
            form.visible = data.data.visible;
            form.keepAlive = data.data.keepAlive;
            form.alwaysShow = data.data.alwaysShow;
            title.value="更新菜单";
            formType.value="update"
            break;
        case "createChild":
            console.log("新增子菜单")
            isSelectAble.value = true;
            initValue();
            form.parentId = obj.parentId;
            formType.value = "createChild"
            title.value="新增子菜单";
            break;
    }
    isShowDialog.value = true;
}
function resetForm(){
    form.id=undefined;
    form.name=undefined;
    form.permission=undefined;
    form.type=undefined;
    form.sort=undefined;
    form.parentId=undefined;
    form.path=undefined;
    form.icon=undefined;
    form.component=undefined;
    form.componentName=undefined;
    form.status=undefined;
    form.visible=undefined;
    form.keepAlive=undefined;
    form.alwaysShow=undefined;
    MenuTree.value[0].children = [];
}
function initValue(){
    form.type=MenuTypes.MENU_DIRECTORY;
    form.status=MenuStatus.ENABLE;
}
async function getMenuList(){
   const data = await listMenu({});
   const treeNode:Map<number,MenuSelectType> = new Map();
   for(const item of data.data){
        generateSelectTree(item,treeNode);
   }
   const childs:MenuSelectType[] = new Array();
   for(let item of treeNode.values()){
        if(item.parentId==0){
            childs.push(item);
        }
   }
   MenuTree.value[0].children.push(...childs);
}
function generateSelectTree(tree:MenuOriginType,treeNode:Map<number,MenuSelectType>){
    const node:MenuSelectType = {
        value:tree.id,
            label:tree.name,
            children:[],
            parentId:tree.parentId
    }
    if(!treeNode.has(tree.id)){
        treeNode.set(tree.id,node);
    }
    if(treeNode.has(tree.parentId)){
        const parent = treeNode.get(tree.parentId);
        parent?.children.push(node);
    }
    if(tree.children!=null){
        for(const item of tree.children){
            generateSelectTree(item,treeNode);
        }
    }
}
defineExpose({
    open
})
</script>