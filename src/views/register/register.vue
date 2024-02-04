<template>
    <div 
        class="register-card"
        v-show="getShow"
    >   
        <div 
            class="register-header font-sans text-2xl/[1.5]"
        >
            <el-row justify="center">
                <el-col :span="24" >
                    <h1>注册</h1>
                </el-col>
            </el-row>
        </div>
        <div
            class="register-form"
        >
            <el-form
                ref="registerRef"
                :model="form"
                :rules="rules"
                label-position="top"
            >
                <el-row>
                    <el-col>
                        <el-form-item label="用户名:" prop="username">
                            <el-input v-model="form.username" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="密码:" prop="password">
                            <el-input v-model="form.password" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="确认密码:" prop="confirmPassword">
                            <el-input v-model="form.confirmPassword"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div
                class="action-group"
            >
                <div
                    class="action-item"
                >
                    <el-button
                        type="primary"
                        size="large"
                        style="width:96%"
                        @click="handleRegister"
                    >
                        注册
                    </el-button>
                </div>
                <div
                    class="action-item"
                >
                    <el-button
                        size="large"
                        style="width:96%"
                        @click="handleRedirectLogin"
                    >
                        已有账号?去登录
                    </el-button>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script lang="ts" setup>
import { ElRow,ElCol,ElForm,ElFormItem,ElInput,ElButton } from 'element-plus';
import { LoginStatus } from '@/enums/login';
import {loginSettingStore} from '@/store/module/login'
import {computed,reactive,ref} from 'vue';
import { FormRules } from 'element-plus/lib';
import {register} from '@/api/login/register';
const registerRef = ref();
const form = reactive({
    username:'',
    password:'',
    confirmPassword:''
})
const validateUserName = (rule:any,value:any,callback:any)=>{
    console.log(rule);
    console.log("执行了验证方法");
    let result = false;
    if(value===''){
        result = false;
    }
    else if(value){
        const regex = new RegExp("^[a-z0-9_-]{6,20}");
        const strValue = new String(value);
        if(strValue.match(regex)){
            result = true;
        }
    }
    if(result){
        callback();
    }else{
        callback(new Error('请输入你的用户名,字母、数字、不超过6~20个字符'));
    }
}
const rules = reactive<FormRules>({
    username:[
        {required:true,message:'请输入你的用户名'},
        {validator:validateUserName}
    ],
    password:[
        {required:true,message:'请输入你的密码'}
    ],
    confirmPassword:[
        {
            required:true,message:'请确认你的密码'
        }
    ]
})
const loginStore = loginSettingStore();
const getShow = computed(()=>{
    return loginStore.loginState === LoginStatus.REGISTER;
})
async function handleRegister(){
    registerRef.value.validate().then(async(data:any)=>{
        console.log(data);
        console.log("验证成功");
        const result = await register(form);
        result.then((data:any)=>{
            console.log(data);
        }).catch((error:Error)=>{
            console.log(error);
        });
    }).catch(
        (error:Error)=>{
        console.log(error);
        console.log("验证失败");
    });
}
function handleRedirectLogin(){
    loginStore.setLoginState();
}
</script>
<style lang="scss">
.register-card{
    display: flex;
    flex-direction: column;
    padding:0% 3%;
    margin: 0 5%;
    .register-header{
        text-align: center;
    }
    .register-form{
        text-align: center;
        .action-group{
                display: flex;
                align-items: stretch;
                .action-item{
                    flex: 1 1 50%;
                    margin-bottom: 4%;
                }
            }
    }
}
</style>