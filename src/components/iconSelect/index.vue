<template>
    <ElSelect
        v-model="iconName"
        placeholder="请选择"
    >
    <template #header>
        <ElInput v-model="searchName" >
            <template #prepend>
                输入关键字查询:
            </template>
        </ElInput>
    </template>
    <ElOption
        v-for="item in elementPlusIcons"
        :key="item"
        :label="item"
        :value="item"
    >
        <div
            class="flex item-center"
        >
            <Icon class="mr-5" :iconName="item" :width="IconWidth" />
            <span>{{ item }}</span>
        </div>
    </ElOption>
    <template #tag>
        <!-- <Icon v-for="name in elementPlusIcons" :key="name" :iconName="name" :width="IconWidth"/> -->
    </template>
    </ElSelect>    
            <!-- <ElPopover
            trigger="click"
            :width="350"
            :popper-options="{
                placement:'right-start'
            }" 
            > -->
            <!-- <template #reference>
                <p class="cursor-pointer">icon</p>
            </template> -->
            <!-- <ElDivider border-style="dashed"/> -->
            <!-- <ElScrollbar :height="450"> -->
            <!-- <ul 
                class="flex flex-wrap"
            >
                <li
                    class="icon-item border-2 border-inherit mx-1 my-1 cursor-pointer"
                    v-for="item in elementPlusIcons"
                    :key="item"
                    @click="chooseIcon(item)"
                > -->
                <!-- </li>
            </ul> -->
            <!-- </ElScrollbar> -->
            <!-- </ElPopover> -->
    <!-- </ElInput> -->
</template>
<script lang="ts" setup>
import Icon from "@/components/icon/Icon.vue"
import {ElInput,ElSelect,ElOption} from 'element-plus';
import {computed, ref} from 'vue';
import {IconList} from '@/components/iconSelect/data';
const iconName = ref('');
const searchName = ref('');
// const visible  = ref(false);
const elementPlusIcons = computed(()=>{
    return IconList["element-plus"]?.filter((v)=>v.includes(searchName.value));
})
const IconWidth = ref(20);
const emits =  defineEmits({
    "choose":(iconName)=>{
        if(iconName){
            return true;
        }
        else{
            return false;
        }
    }
});
// function showIconSelect(){
//     visible.value = !visible.value;
// }
// function chooseIcon(item:String){
//     iconName.value = item;
//     emits("choose",item);
//     showIconSelect();
// }
</script>
<style lang="scss">
.icon-item:hover{
    color:var(--el-color-primary);
    border-color:var(--el-color-primary);
    transform: scaleX(1.05);
    transition: all 0.4s;
}
</style>