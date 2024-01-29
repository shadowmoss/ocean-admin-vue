<template>
    <ContentWrap>
        <PageSearch
            v-model:searchItem="searchItems"
            @seach="search"
            @addNewData="addNewOAuth2Client"
        >
        </PageSearch>
    </ContentWrap>
    <ContentWrap>
        <ElTable :data="list">
            <ElTableColumn prop="clientId" label="客户端编号"/>
            <ElTableColumn prop="secret" label="客户端秘钥"/>
            <ElTableColumn prop="name" label="应用名称"/>
            <ElTableColumn prop="status" label="状态">
                <template #default="{row}">
                    <div>
                        <ElText v-if="row.status==0">
                            启用
                        </ElText>
                        <ElText v-else="column==1">
                            停用
                        </ElText>
                    </div>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="accessTokenValiditySeconds" label="访问令牌有效期"/>
            <ElTableColumn prop="refreshTokenValiditySeconds" label="刷新令牌有效期"/>
            <ElTableColumn prop="authorizedGrantTypes" label="授权类型">
                <template #default="{row}">
                    <div>
                        <ElTag 
                            v-for="item in row.authorizedGrantTypes"
                        >
                            {{ item }}
                        </ElTag>
                    </div>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="createTime" label="创建时间"/>
            <ElTableColumn label="操作" align="center">
                <template #default="{row}">
                    <div class="flex justify-center items-center">
                        <ElButton
                            type="primary"
                            link
                            @click="handleUpdate(row.id)"
                        >
                            编辑
                        </ElButton>
                        <ElButton
                            type="primary"
                            link
                            @click="handleDelete(row.id)"
                        >
                            删除
                        </ElButton>
                    </div>
                </template>
            </ElTableColumn>
        </ElTable>
        <paginationVue
                :total="total"
                v-model:currentPage="searchParam.currentPageNo"
                v-model:currentPageLimit="searchParam.pageSize"
                @paginationSearch="searchOAuth2Client"
                class="my-7 justify-center"
            >
        </paginationVue>
    </ContentWrap>
    <Oauth2Form ref="Oauth2FormRef" @create="searchOAuth2Client()" @update="searchOAuth2Client()"></Oauth2Form>
</template>
<script lang="ts" setup>
import Oauth2Form from "@/views/system/oauth2/form/oauth2Form.vue"
import paginationVue from "@/components/pagination/index.vue";
import {pageOAuth2Client,deleteOAuth2Client} from "@/api/system/oauth2/index"
import ContentWrap from "@/components/contentwrap/index.vue";
import PageSearch from "@/components/pageSearch/index.vue";
import { SearchProperty } from "@/types/searchProperty";
import { ElTable, ElTableColumn,ElText,ElTag,ElButton,ElMessage} from "element-plus";
import { reactive, ref,onMounted } from "vue";
const Oauth2FormRef = ref();
const list = ref();
const total = ref(0);
const searchItems:Array<SearchProperty> = [
    {
        name:"应用名称",
        column:"name",
        type:"Input",
    },
    {
        name:'状态',
        column:"status",
        type:"select",
        options:[
            {
                key:"enable",
                value:0,
                label:"启用",
            },
            {
                key:"disable",
                value:1,
                label:"停用"
            }
        ]
    }
]
const searchParam = reactive({
    name:undefined,
    status:undefined,
    currentPageNo:1,
    pageSize:10
})
async function search(params:any){
    searchParam.name = params.name;
    searchParam.status = params.status;
    await searchOAuth2Client();
}
async function searchOAuth2Client(){
    const data = await pageOAuth2Client(searchParam);
    list.value = data.data.records;
    total.value = data.data.total;
    console.log(list);
}
function addNewOAuth2Client(){
    Oauth2FormRef.value.open("create");
}
function handleUpdate(id:number){
    Oauth2FormRef.value.open("update",id);
}
async function handleDelete(id:number){
    const res =  await deleteOAuth2Client(id);
    if(res.success){
        ElMessage({
            message:res.message,
            type:'success'
        })
    }else{
        ElMessage({
            message:res.message,
            type:'success'
        })
    }
    searchOAuth2Client();
}
onMounted(()=>{
    searchOAuth2Client();
})
</script>