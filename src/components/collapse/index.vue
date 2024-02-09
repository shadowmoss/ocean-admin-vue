<template>
    <Icon
        class="cursor-pointer"
        :iconName="collapse ? `expand` : `fold`"
        :width="25"
        @click="handlerCollapse"
    >
    </Icon>
</template>
<script lang="ts" setup>
import Icon from "@/components/icon/Icon.vue";
import {useUIStore} from "@/store/module/ui";
import {unref,computed} from "vue";
const uiStore = useUIStore();
const collapse = computed(()=>uiStore.getCollapse);
// 点击进行菜单折叠/展开
function handlerCollapse(){
    uiStore.setCollapse(!collapse.value);
}
</script>
<style lang="sass">
</style>