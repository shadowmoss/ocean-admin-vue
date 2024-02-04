<template>
    <ElInput @click="showIconSelect">
        <template #append>
            <ElPopover
            :visible="visible"
            :width="350"
            :popper-options="{
                placement:'right-start'
            }"
            >
            <template #reference>
                <p>icon</p>
            </template>
            <ElInput v-model="iconName" placeholder="搜索图标"/>
            <ElDivider border-style="dashed"/>
            <ElScrollbar :height="450">
            <ul 
                class="flex flex-wrap"
            >
                <li
                    class="border-2 border-inherit mx-1 my-1 cursor-pointer"
                    v-for="item in elementPlusIcons"
                    :key="item"
                    @click="chooseIcon(item)"
                >
                    <Icon :iconName="item" :width="IconWidth"></Icon>
                </li>
            </ul>
            </ElScrollbar>
            </ElPopover>
        </template>
    </ElInput>
</template>
<script lang="ts" setup>
import Icon from "@/components/icon/Icon.vue"
import {ElInput,ElPopover,ElDivider,ElScrollbar} from 'element-plus';
import {ref} from 'vue';
import {IconList} from '@/components/iconSelect/data'; 
const visible  = ref(false);
const elementPlusIcons = ref(IconList["element-plus"]);
const IconWidth = ref(25);
function showIconSelect(){
    visible.value = !visible.value;
}
function chooseIcon(item:String){
    console.log(item);
    iconName.value = item;
}
console.log(elementPlusIcons)
const iconName = ref('');
</script>
<style lang="scss">
</style>