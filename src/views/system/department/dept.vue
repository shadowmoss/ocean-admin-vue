<template>
    <ContentWrap>
        <PageSearch
            :searchItem="searchItems"
            @seach="getDept"
            @addNewData="createDepartment"
            :has-add-perm="checkPerm(['system:department:insert'])"
            :has-query-perm="checkPerm(['system:department:query'])"
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
        <ElTableColumn align="left" label="部门名称" prop="name"/>
        <ElTableColumn align="center" label="排序" prop="sort" />
        <ElTableColumn align="center" label="创建时间" prop="createTime"/>
        <ElTableColumn align="center" label="操作">
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
                        @click="createChildDepartment(row.id)"
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
    </ContentWrap>
</template>
<script  lang="ts" setup>
import {getdepts} from "@/api/system/department/index";
import{ElTable,ElTableColumn} from "element-plus";
import ContentWrap from "@/components/contentwrap/index.vue";
import PageSearch from "@/components/pageSearch/index.vue";
import {SearchProperty} from "@/types/searchProperty";
import {checkPerm} from "@/utils/checkPermission";
import { reactive, ref } from "vue";
const queryParam = reactive({
    name:''
})
const searchItems:Array<SearchProperty> = [
    {
        name:"部门名称",
        column:"name",
        type:"Input"
    }
]
const list = ref([]);
async function getDept(name:string){
    queryParam.name = name
    const data = await getdepts(queryParam.name);
    list.value = data.data;
}
function createDepartment(){

}
function handleUpdate(id){
}
function createChildDepartment(id){

}
function handleDelete(id){

}
</script>