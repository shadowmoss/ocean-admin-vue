<template>
    <ElPagination 
        v-model:current-page="pageNo"
        :page-sizes="pageSizes"
        v-model:page-size="pageLimit"
        :background=true
        :total="total"
        :layout="layout"
        @size-change="pageSizeChangeHandler"
        @current-change="currentPageChangeHandler"
    />
</template>
<script lang="ts" setup>
import { ElPagination } from 'element-plus';
import { Ref, ref, reactive,computed } from 'vue';
const emits = defineEmits({
    paginationSearch:(val)=>{
        if(val){
            return true;
        }
        return false;
    },
    "update:currentPage":(val)=>{
        if(val){
            return true;
        }
        return false;
    },
    "update:currentPageLimit":(val)=>{
        if(val){
            return true;
        }
        return false;
    }
})
const props = defineProps({
    // 当前总条数
    total:{
        required:true,
        type:Number,
        default:0,
    },
    // 当前页号
    currentPage:{
        required:true,
        type:Number,
        default:1,
    },
    // 当前页显示条数
    currentPageLimit:{
        type:Number,
        default:10
    },
    // 显示的最大页码按钮数,当分页数量超过该值，d会发生折叠
    pageCount:{
        type:Number,
        default:7
    }
})
const pageNo = computed({
    get() {
        return props.currentPage;
    },
    set(val) {
        console.log("当前页码变更")
        console.log(val);
        emits("update:currentPage",val);
    }
})
const pageLimit = computed({
    get() {
        return props.currentPageLimit;
    },
    set(val) {
        console.log("当前页面最大显示数量调整")
        console.log(val);
        emits("update:currentPageLimit",val);
    }
})
const pageSizes:Array<number> = reactive([
    1,5,10,20,30,40,50,60,100
])
const layout:Ref<string> = ref("total,sizes,prev,pager,next,jumper");
function pageSizeChangeHandler(val:number){
    emits('paginationSearch',{currentPageNo:pageNo,pageSize:val});
}
function currentPageChangeHandler(val:number){
    emits('paginationSearch',{currentPageNo:val,pageSize:pageLimit});
}
</script>