<template>
    <div class="flex items-baseline flex-nowrap ">
        <label class="grow-[0.1] shrink mr-[5px]" :for="props.column">
            {{ props.name + ":"}}
        </label>
    <ElDatePicker 
            v-model="inputModel"
            value-format="YYYY-MM-DD HH:mm:ss"
            :name="props.column"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
        >
        </ElDatePicker>
    </div>
    
    
</template>
<script lang="ts" setup>
import {ElDatePicker} from 'element-plus';
import {computed} from 'vue';
const emits = defineEmits({
    "update:model":(val)=>{
        if(val){
            return true;
        }
        return true;
    }
})
const props = defineProps({
    name:{
        type:String,
        required:true,
        default:""
    },
    column:{
        type:String,
        required:true,
        default:""
    },
    model:{
        type:null,
        required:true,
    }
})
const inputModel = computed({
    get (){
        return props.model
    },
    set(val){
        console.log("更新日期选择")
        emits("update:model",val);
    }
})
</script>