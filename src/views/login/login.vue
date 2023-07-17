<template>
    <div class="login-container">
        <el-form
          label-position="top"
        >
            <el-form-item
              label="用户名:"
            >
                <el-input />
            </el-form-item>
            <el-form-item
              label="密码:"
            >
                <el-input />
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { ElForm,ElFormItem,ElInput} from 'element-plus';
</script>
<style lang="scss">

</style>