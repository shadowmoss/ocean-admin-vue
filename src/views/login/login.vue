<template>
    <div class="login-container">
        <div class="login-left">
            <img :src="login_picture"/>
        </div>
        <div class="login-card">
            <div class="login-header">
                <h2 class="font-sans text-2xl/[1.5]">登录</h2>
            </div>
            <el-form
                size="large"
                label-position="top"
                v-model="form"
            >
                <el-form-item
                label="用户名:"
                >
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item
                label="密码:"
                >
                    <el-input v-model="form.password" show-password/>
                </el-form-item>
            </el-form>
                <div class="action-group">
                    <div class="action-item">
                        <el-button
                        type="primary"
                        size="large"
                        style="width:100%"
                        @click="loginAction"
                        >
                            登录
                        </el-button>
                    </div>
                    <div class="action-item">
                        <el-button
                            size="large"
                            style="width:100%"
                        >
                            注册
                        </el-button>
                    </div>
                </div>
            </div>
    </div>
</template>
<script setup lang="ts">
import { ElForm,ElFormItem,ElInput,ElButton} from 'element-plus';
import login_left from '/login-left.png';
import { ref,reactive } from 'vue';
import {login} from '@/api/login/login';
import { useRouter } from 'vue-router';
// import {setLocalStorage,TokenEnum} from '@/utils/localstorage';
import {setSessionStorage,TokenEnum} from '@/utils/sessionStorage';
const router = useRouter();
const login_picture = ref(login_left);
const form:any = reactive({
    username:'',
    password:'',
});
async function loginAction(){
    login(form).then(data=>{
       if(data.success){
        // setLocalStorage(TokenEnum.accessToken,data.data.accessToken);
        setSessionStorage(TokenEnum.accessToken,data.data.accessToken);
        setSessionStorage(TokenEnum.refreshToken,data.data.refreshToken);
        router.push({name:"home"});
       }
    });
}
</script>
<style lang="scss">
.login-container{
    display: flex;
    align-items: center;
    min-height: 100vh;
    .login-left{
        margin-top: 2%;
        flex: 1 1 50%;
        img{
            max-width: 100%;
            height: 100%;
        }
    }
    .login-card{
        flex: 1 1 50%;
        display: flex;
        flex-direction: column;
        padding: 0 3%;
        margin:0 2%;
        .login-header{
            align-self: center;
        }
        .action-group{
            display: flex;
            flex-direction: column;
            align-items: stretch;
            .action-item{
                margin-bottom: 4%;
            }
        }
    }
}
</style>