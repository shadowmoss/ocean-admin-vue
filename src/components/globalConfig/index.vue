<template>
    <!-- 用于配置ElementPlus组件的国际化，ElMessage最大数量的全局配置组件 -->
    <ElConfigProvider
        :locale="local"
    >
        <slot></slot>
    </ElConfigProvider>
</template>
<script lang="ts" setup>
import {zhCn,en} from 'element-plus/es/locale/index'
import { ref,computed } from 'vue';
import { ElConfigProvider } from 'element-plus';
const language = ref('zh-cn')
const local = zhCn;
</script>