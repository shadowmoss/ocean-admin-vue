<template>
    <div class="flex items-baseline flex-nowrap w-[260px]">
        <label class="grow shrink-0 mr-[5px]" :for="props.column">
            {{ props.name +":" }}
        </label>
        <ElInput class="grow shrink " :id="props.column" v-model="inputModel"></ElInput>
    </div>
    
    
</template>
<script lang="ts" setup>
import {ElInput} from 'element-plus';
import {computed} from 'vue'
const emits = defineEmits({
    "update:model":(val:any)=>{
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
        return props.model;
    },
    set(val){
        if(!val){
            val = undefined;
        }
       emits("update:model",val);
    }
})
</script>