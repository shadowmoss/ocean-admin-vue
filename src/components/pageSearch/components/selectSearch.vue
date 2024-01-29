<template>
    <div class="flex items-baseline flex-nowrap ">
        <label class="grow-[0.1] shrink-0 mr-[5px]" :for="props.column">
            {{ props.name + ":"}}
        </label>
    <ElSelect class="grow shrink" :name="props.column" v-model="inputModel">
            <ElOption 
                v-for=" option in props.options"
                :key="option.key"
                :label="option.label"
                :value="option.value"
            >
            </ElOption>
    </ElSelect>
    </div>
    
    
</template>
<script lang="ts" setup>
import { ElOption, ElSelect } from 'element-plus';
import { computed } from 'vue';
import {OptionProperty} from '@/types/searchProperty';
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
        default:"",
    },
    column:{
        type:String,
        required:true,
        default:"",
    },
    model:{
        type:null,
        required:true,
    },
    options:{
        type:Array<OptionProperty>,
        required:true,
    }
})
const inputModel = computed({
    get (){
        return props.model;
    },
    set(val){
        if(val==-1){
            val=undefined;
        }
        emits("update:model",val);
    }
})
</script>