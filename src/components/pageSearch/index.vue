<template>
        <ElForm>
            <ElRow 
                v-for="(row,index) in rows"
                :key="index"
                :gutter="12"
            >
                <ElCol 
                    :span="8"
                    v-for="col in row"
                >
                <ElFormItem 
                    :key="col.column"
                    :label="col.name"

                >
                    <ElInput
                        v-if="col.type==`Input`"
                        v-model="params[col.column]"
                        
                    />
                    <ElSelect 
                        v-if="col.type==`select`"
                        v-model="params[col.column]"
                       
                    >
                        <ElOption
                            v-for="option in col.options"
                            :key="option.key"
                            :label="option.label"
                            :value="option.value"
                        >
                        </ElOption>
                    </ElSelect>
                    <ElDatePicker
                        v-if="col.type==`datetime`"
                        v-model="params[col.column]"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetimerange"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                    >
                </ElDatePicker>
            </ElFormItem>
                </ElCol>
            </ElRow>
        </ElForm>
        <div>
            <ElButton class="mr-5" v-if="hasQuery" :icon="Search" @click="searchHandler">搜索</ElButton>
            <ElButton class="mr-5"  :icon="RefreshRight" @click="resetHandler">重置</ElButton>
            <ElButton type="primary" v-if="hasAdd" :icon="Plus" @click="addPlus">新增</ElButton>
        </div>
</template>
<script lang="ts" setup>

import { ElButton, ElFormItem,ElForm, ElInput, ElSelect, ElOption, ElDatePicker, ElRow, ElCol } from "element-plus";
import {Search,RefreshRight,Plus} from '@element-plus/icons-vue';
import {SearchProperty} from '@/types/searchProperty';
import {computed, ref,unref,onMounted} from "vue";
onMounted(()=>{
    console.log(props.hasAddPerm);
    console.log(props.searchItem)
    if(props.hasAddPerm!=undefined){
        hasAdd.value = props.hasAddPerm;
        // console.log("打印是否拥有新增权限")
        // console.log(hasAdd.value);
    }
    if(props.hasQueryPerm!=undefined){
        
        hasQuery.value = props.hasQueryPerm;
        // console.log("打印是否拥有查询权限")
        // console.log(hasQuery.value)
    }
})
const hasAdd = ref(true);
const hasQuery = ref(true);
const emits = defineEmits({
    seach:(params:any)=>{
        if(params){
            return true;
        }
        return true;
    },
    addNewData:()=>{
        return true;
    }
})
const props = defineProps({
    // 检查是否该用户是否拥有查询这个页面的权限
    hasQueryPerm:{
        type:Boolean,
        default:undefined
    },
    // 检查该用户是否拥有新增这个页面数据的权限
    hasAddPerm:{
        type:Boolean,
        default:undefined
    },
    // 待渲染的搜索项
    searchItem:{
        required:true,
        type:Array<SearchProperty>,
        default:()=>[]
    }
});
const rowIndex = computed(()=>{
    if(props.searchItem.length % 3 === 0){
        return props.searchItem.length / 3;
    }
    else if(props.searchItem.length % 3 !== 0){
        return (props.searchItem.length / 3) + 1;
    }
    return 1;
})
// 将传入的待渲染的搜索项,转换为rows数组，方便渲染执行
const rows = computed(()=>{
    // 最终拼接好的结果
    const result = [];
    // 每一行当中的每一列
    let cols=[];
    // j表示当前遍历到searchItem的指针
    // i表示当前目标数组已组装了多少行
    for(let i = 0,j = 0;i<rowIndex.value&&props.searchItem[j]!=undefined;){
        cols.push(props.searchItem[j]);
        if(((j+1)-(i+1)*3)==0){
            j=(i+1)*3;
            i++;
            result.push(cols);
            cols = [];
        }else{
            j++;
        }
    }
    if(cols){
        result.push(cols);
    }
    return result;
})
const params:{[key:string]:any} = ref({});
function searchHandler(){
    emits("seach",unref(params));
}
function resetHandler(){
    for(const item of props.searchItem){
        params.value[item.column] = undefined;
    }
    emits("seach",unref(params));
}
function addPlus(){
    emits("addNewData");
}
</script>