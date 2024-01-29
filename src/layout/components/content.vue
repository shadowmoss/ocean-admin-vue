<template>
    <div class="p-[20px] w-[100%]">
        <router-view>
            <template #default="{ Component , route }">
                <keep-alive>
                    <component :is="Component" :key="route.fullPath"></component>
                </keep-alive>
            </template>
        </router-view>
    </div>
</template>
<script lang="ts" setup>

</script>