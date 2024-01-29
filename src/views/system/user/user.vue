<template>
    <ContentWrap>
        <PageSearch 
            v-model:searchItem="pageSearchItems"
            @seach="seach"
            @addNewData="handleFormDialog"
            :has-add-perm="checkPerm(['system:user:insert'])"
            :has-query-perm="checkPerm(['system:user:query'])"
        >
        </PageSearch>

    </ContentWrap>
    <ElCard class="my-7" shadow="never">
            <ElTable :data="list">
                <ElTableColumn label="用户编号" prop="id" key="id"/>
                <ElTableColumn label="用户名称" prop="username" />
                <ElTableColumn label="用户昵称" prop="nickname" />
                <ElTableColumn label="电话" prop="telephone" />
                <ElTableColumn label="状态" prop="status" />
                <ElTableColumn label="创建时间" prop="createTime" />
                <ElTableColumn label="操作" fixed="right" align="center">
                    <template #default="{row}">
                        <div class="flex justify-center items-center">
                            <ElButton
                            type="primary"
                            link
                            @click="handleUpdate(row.id)"
                        >
                            更新
                        </ElButton>
                        <ElDropdown
                            class="dropDownMenu"
                            @command="handleCommand"
                        >
                            <ElButton
                                type="primary"
                                link
                            >
                                更多操作
                            </ElButton>
                            <template #dropdown>
                                <ElDropdownMenu>
                                    <ElDropdownItem :command="commandObject('delete',row.id)">删除</ElDropdownItem>
                                    <ElDropdownItem :command="commandObject('updateRole',row.id)">分配角色</ElDropdownItem>
                                    <ElDropdownItem :command="commandObject('resetPassword',row.id)">重设密码</ElDropdownItem>
                                </ElDropdownMenu>
                            </template>
                        </ElDropdown>
                        </div>
                    </template>
                </ElTableColumn>
            </ElTable>
            <paginationVue
                :total="total"
                v-model:currentPage="queryParam.currentPageNo"
                v-model:currentPageLimit="queryParam.pageSize"
                @paginationSearch="getUsers"
                class="my-7 justify-center"
            >
            </paginationVue>
    </ElCard>
    <UserForm ref="userFormRef" @success="getUsers()"></UserForm>
    <UserBindRoleForm ref="userBindRoleFormRef"></UserBindRoleForm>
</template>
<script lang="ts" setup>
import { checkPerm } from "@/utils/checkPermission";
import UserBindRoleForm from "@/views/system/user/form/userBindRoleForm.vue"
import UserForm from "@/views/system/user/form/userForm.vue"
import ContentWrap from "@/components/contentwrap/index.vue";
import { ElTable,ElTableColumn,ElCard,ElButton, ElDropdown, ElDropdownItem,ElDropdownMenu } from 'element-plus';
import { reactive,ref,onMounted } from 'vue';
import paginationVue from '@/components/pagination/index.vue';
import PageSearch from '@/components/pageSearch/index.vue';
import { getUserList,deleteUser } from '@/api/system/user/index.ts';
import { SearchProperty } from '@/types/searchProperty';
import { UserStatus } from '@/enums/users';
const list = ref([]);
const total = ref(0);
const loading = ref(true);
const userBindRoleFormRef = ref();
const queryParam:{
    currentPageNo:number,
    pageSize:number,
    username?:undefined,
    mobile?:undefined,
    status?:undefined,
    startTime?:undefined,
    endTime?:undefined
} = reactive({
    currentPageNo:1,
    pageSize:10,
    username:undefined,
    mobile:undefined,
});
const pageSearchItems:Array<SearchProperty>=[
{
    name:"用户名称",
    column:"username",
    type:"Input"
},{
    name:"手机号码",
    column:"mobile",
    type:"Input"
},
{
    name:"状态",
    column:"status",
    type:"select",
    options:[
        {
            key:"undefined",
            value:-1,
            label:'请选择'
        },
        {
            key:"enable",
            value:UserStatus.Enable,
            label:"启用"
        },
        {
            key:"disable",
            value:UserStatus.Disable,
            label:"停用"
        },
    ]
},
{
    name:"创建时间",
    column:"create_time",
    type:"datetime"
},
{
    name:"昵称",
    column:"nickname",
    type:"Input",
}
]
async function getUsers(){
    const data = await getUserList(queryParam);
    list.value = data.data.records;
    total.value = data.data.total;
    loading.value = false;
}
async function seach(params:any){
        queryParam.username = params.username;
        queryParam.mobile = params.mobile;
        if(params.create_time){
            queryParam.startTime = params.create_time[0];
            queryParam.endTime = params.create_time[1];
        }else{
            queryParam.startTime = undefined;
            queryParam.endTime = undefined;
        }
        await getUsers();
}
const userFormRef = ref();
function handleFormDialog(){
    userFormRef.value.open("create")
}
function handleUpdate(id:number){
    userFormRef.value.open("update",id);
}
function handleCommand(command:{
    command:string,
    id:number
}){
    switch(command.command){
        case "delete":
            deleteRow(command.id);
            break;
        case "updateRole":
        userBindRoleFormRef.value.open(command.id);
            break;
        case "resetPassword":
            break;
    }
}
async function deleteRow(id:number){
    await deleteUser(id);
    getUsers();
}
function commandObject(command:string,id:number){
    return {
        command:command,
        id:id,
    }
}
onMounted(()=>{
     getUsers();
})
</script>
<style lang="scss">
.el-dropdown-link:focus{
    outline: none;
}
</style>