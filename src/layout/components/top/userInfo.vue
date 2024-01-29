<template>
    <ElDropdown  trigger="click">
        <template #default>
            <div class="flex items-center">
                <ElAvatar :size="50" :src="avatar" />
                <span class="ml-3">
                    {{ username }}
                </span>
            </div>
        </template>
        <template #dropdown>
            <ElDropdownMenu>
                <ElDropdownItem>个人中心</ElDropdownItem>
                <ElDropdownItem @click="handleLogOut">登出</ElDropdownItem>
            </ElDropdownMenu>
        </template>
    </ElDropdown>
</template>
<script lang="ts" setup>
import { ElAvatar, ElDropdown, ElDropdownItem, ElDropdownMenu} from 'element-plus';
import {useUserStore} from '@/store/module/user.ts';
import { computed } from 'vue';
import {useRouter} from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const username = computed(()=>{
    return userStore.user.username;
})
const avatar = computed(()=>{
    return userStore.user.avatar;
})
async function handleLogOut(){
    // 将当前用户信息初始化为默认值
   const res = await userStore.logout();
   if(res.success){
    router.push({name:'login'});
   }
}
</script>