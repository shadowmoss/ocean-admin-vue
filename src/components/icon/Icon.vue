<template>
    <component 
    :is="props.iconName"
    :width="props.width"
    >
    </component>
</template>
<script lang="ts" setup>
const props =  defineProps({
    iconName:{
        type:String,
        required:true
    },
    width:{
        type:Number,
        required:false,
    }
})
</script>
<style></style>