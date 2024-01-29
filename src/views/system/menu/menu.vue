<template>
    <ContentWrap>
        <PageSearch
            :searchItem="searchItems"
            @seach="getMenu"
            @addNewData="createMenu"
            :has-add-perm="checkPerm(['system:menu:insert'])"
            :has-query-perm="checkPerm(['system:menu:query'])"
        >
        </PageSearch>
    </ContentWrap>
    <ContentWrap>
        <ElTable 
            :data="list"
            :show-overflow-tooltip="true"
            :scrollbarAlwaysOn="true"
            row-key="id"
            >
            <ElTableColumn align="left" label="菜单名称" prop="name"/>
            <ElTableColumn align="center" label="图标" prop="icon"/>
            <ElTableColumn align="center" label="排序" prop="sort"/>
            <ElTableColumn align="center" label="权限标识" prop="permission"/>
            <ElTableColumn align="center" label="路由地址" prop="path"/>
            <ElTableColumn align="center" label="组件路径" prop="component"/>
            <ElTableColumn align="center" label="组件名称" prop="componentName"/>
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
                        @click="createChildMenu(row.id)"
                    >
                    新增
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
        <!-- <Pagniation
            :total="total"
            v-model:currentPage="queryParam.currentPageNo"
            v-model:currentPageLimit="queryParam.pageSize"
            @paginationSearch="getMenu"
        >
        </Pagniation> -->
    </ContentWrap>
    <menuForm ref="menuFormRef" @success="getMenu"></menuForm>
</template>
<script lang="ts" setup>
import {checkPerm} from '@/utils/checkPermission';
import {listMenu,deleteMenu} from "@/api/system/menu/index.ts"
import ContentWrap from "@/components/contentwrap/index.vue";
import PageSearch from "@/components/pageSearch/index.vue";
import menuForm from "@/views/system/menu/form/menuForm.vue";
import { SearchProperty } from "@/types/searchProperty";
import { ElButton, ElTable,ElTableColumn } from "element-plus";
import {MenuStatus} from "@/enums/menu.ts";
import { onMounted, reactive, ref } from "vue";
const menuFormRef = ref();
const list = ref([]);
const queryParam = reactive({
    name:undefined,
    status:undefined,
    startTime:undefined,
    endTime:undefined,
    currentPageNo:1,
    pageSize:10
})
const searchItems:Array<SearchProperty> = [
    {
        name:"菜单名称",
        column:"name",
        type:"Input"
    },
    {
        name:"状态",
        column:"status",
        type:'select',
        options:[
            {
                key:"ENABLE",
                value:MenuStatus.ENABLE,
                label:"启用",
            },
            {
                key:"DISABLE",
                value:MenuStatus.DISABLE,
                label:"停用"
            }
        ]
    },
]
async function getMenu(){
    const data = await listMenu(queryParam);
    console.log(data);
    list.value = data.data;
}
onMounted(()=>{
    getMenu();
})
function createMenu(){
    console.log("执行了新增菜单")
    menuFormRef.value.open({type:"create"});
}
function createChildMenu(parentId:number){
    console.log("执行了新增子菜单")
    menuFormRef.value.open({type:"createChild",id:undefined,parentId:parentId});
}
function handleUpdate(id:number){
    console.log("执行了更新")
    menuFormRef.value.open({type:"update",id:id});
}
async function handleDelete(id:number){
    await deleteMenu(id);
    getMenu();
}
</script>