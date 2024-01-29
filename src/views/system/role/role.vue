<template>
    <ContentWrap>
        <PageSearch
            :searchItem="searchItems"
            @seach="getRole"
            @addNewData="createRole"
            :has-add-perm="checkPerm(['system:role:insert'])"
            :has-query-perm="checkPerm(['system:role:query'])"
        >
        </PageSearch>
    </ContentWrap>
    <ContentWrap>
        <ElTable 
            :data="list"
            :show-overflow-tooltip="true"
            :scrollbarAlwaysOn="true"
            >
            <ElTableColumn align="center" label="角色编号" prop="id"/>
            <ElTableColumn align="center" label="角色名称" prop="name"/>
            <ElTableColumn align="center" label="角色类型" prop="roleType"/>
            <ElTableColumn align="center" label="角色标识" prop="code"/>
            <ElTableColumn align="center" label="显示顺序" prop="roleOrder"/>
            <ElTableColumn align="center" label="备注" prop="remark"/>
            <ElTableColumn align="center" label="状态" prop="status"/>
            <ElTableColumn align="center" label="创建时间" prop="createTime"/>
            <ElTableColumn align="center" label="操作" fixed="right">
                <template #default="{row}">
                    <div class="flex content-baseline">
                    <ElButton
                        type="primary"
                        link
                        @click="handleUpdate(row.id)"
                    >
                    更新
                    </ElButton>
                    <ElButton
                        type="primary"
                        link
                        @click="handleUpdateRoleMenu(row.id)"
                    >
                    菜单权限
                    </ElButton>
                    <ElButton
                        type="danger"
                        link
                        @click="handleDelete(row.id)"
                    >
                    删除
                    </ElButton>
                </div>
                </template>
                
            </ElTableColumn>
        </ElTable>
        <Pagniation
            :total="total"
            v-model:currentPage="queryParam.currentPageNo"
            v-model:currentPageLimit="queryParam.pageSize"
            @paginationSearch="getRole"
        >
        </Pagniation>
    </ContentWrap>
    <roleForm ref="roleFormRef" @success="getRole"></roleForm>
    <RoleMenuForm ref="roleMenuFormRef" ></RoleMenuForm>
</template>
<script lang="ts" setup>
import {checkPerm} from '@/utils/checkPermission';
import {getRolePage,deleteRole} from "@/api/system/role/index.ts"
import ContentWrap from "@/components/contentwrap/index.vue";
import PageSearch from "@/components/pageSearch/index.vue";
import Pagniation from "@/components/pagination/index.vue";
import RoleMenuForm from "@/views/system/role/form/roleMenuForm.vue";
import roleForm from "@/views/system/role/form/roleForm.vue";
import { SearchProperty } from "@/types/searchProperty";
import { ElButton, ElTable,ElTableColumn } from "element-plus";
import {RoleType} from "@/enums/roles.ts";
import { onMounted, reactive, ref } from "vue";
const roleFormRef = ref();
const roleMenuFormRef = ref();
const list = ref([]);
const total = ref(undefined);
const queryParam = reactive({
    name:undefined,
    code:undefined,
    startTime:undefined,
    endTime:undefined,
    currentPageNo:1,
    pageSize:10
})
const searchItems:Array<SearchProperty> = [
    {
        name:"角色名称",
        column:"name",
        type:"Input"
    },
    {
        name:"角色标识",
        column:"code",
        type:"Input"
    },
    {
        name:"状态",
        column:"status",
        type:'select',
        options:[
            {
                key:"EMPTY_OPTION",
                value:-1,
                label:""
            },
            {
                key:"SYSTEM_INNER_ROLE",
                value:RoleType.SYSTEM_INNER_ROLE,
                label:"内置角色",
            },
            {
                key:"CUSTOM_ROLE",
                value:RoleType.CUSTOM_ROLE,
                label:"自定义角色"
            }
        ]
    },
]
async function getRole(){
    const data = await getRolePage(queryParam);
    list.value = data.data.records;
    total.value = data.data.total;
}
onMounted(()=>{
    getRole();
})
function createRole(){
    roleFormRef.value.open("create");
}
function handleUpdate(id:number){
    roleFormRef.value.open("update",id);
}
async function handleDelete(id:number){
    await deleteRole(id);
    getRole();
}
function handleUpdateRoleMenu(id:number){
    roleMenuFormRef.value.open(id);
}
</script>