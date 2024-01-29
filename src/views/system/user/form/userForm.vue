<template>
    <Dialog v-model="isShow" :title="formTitle">
        <ElForm 
            ref="userFormRef"
            :model="form"
            :rules="rules"
            label-width="80px"
        >
                <ElRow>
                    <ElCol 
                        :span="12"
                    >
                        <ElFormItem label="用户名:" prop="username">
                            <ElInput 
                                v-model="form.username"
                            />
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span="12">
                        <ElFormItem label="密码:" prop="password">
                            <ElInput 
                                type="password"
                                v-model="form.password"
                            />
                        </ElFormItem>
                    </ElCol>
                </ElRow>
                <ElRow>
                    <ElCol
                        :span="12"
                    >
                        <ElFormItem label="昵称:" prop="nickname">
                            <ElInput
                                v-model="form.nickname"
                            />
                        </ElFormItem>
                    </ElCol>
                    <ElCol
                        :span="12"
                    >
                        <ElFormItem label="邮件:" prop="email">
                            <ElInput
                                v-model="form.email"
                            />
                        </ElFormItem>
                    </ElCol>
                </ElRow>
                <ElRow>
                    <ElCol 
                        :span="12"
                    >
                        <ElFormItem label="电话:" prop="telephone">
                            <ElInput 
                                v-model="form.telephone"
                            />
                        </ElFormItem>
                    </ElCol>
                    <ElCol
                        :span="24"
                    >
                        <ElFormItem label="备注" prop="remark">
                            <ElInput type="textarea" :rows="3" v-model="form.remark"/>
                        </ElFormItem>
                    </ElCol>
                </ElRow>
        </ElForm>
        <template #footer>
            <ElButton type="primary" @click="submitUser">提交</ElButton>
            <ElButton @click="isShow=false">取消</ElButton>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
import Dialog from '@/components/dialog/index.vue';
import { ElButton, ElCol, ElForm, ElFormItem, ElInput, ElRow, FormRules } from 'element-plus';
import { ref,reactive, Ref } from 'vue';
import { UserForm,FormType } from '@/types/form';
import { createUser,updateUser,getUser } from '@/api/system/user';
const emits = defineEmits({
    success:()=>{
        return true;
    }
})
const userFormRef = ref();
const formType:Ref<FormType> = ref(undefined);
const isShow = ref(false);
const formTitle = ref("");
const form = reactive({
    id:undefined,
    username:undefined,
    password:undefined,
    nickname:undefined,
    email:undefined,
    telephone:undefined,
    remark:undefined
})
const rules = reactive<FormRules<UserForm>>({
    username:[
        {
            required:true,
            type:'string',
            message:'请输入用户名',
            trigger:'blur'
        },
        {
            min:6,
            message:'长度最少6个字符',
            trigger:'blur'
        }
    ],
    password:[
        {
            required:true,
            type:'string',
            message:'请输入密码',
            trigger:'blur'
        }
    ],
    email:[
        {
            required:true,
            message:'请输入邮箱',
            trigger:'blur'
        },{
            type:'email',
            message:'邮箱格式不正确',
            trigger:'blur'
        }
    ],
    telephone:[
        {
            required:true,
            type:'string',
            message:'请输入电话',
            trigger:'blur'
        },
        {
            len:11,
            message:'请输入11位电话',
            type:'string',
            trigger:'blur'
        }
    ]
})
const open = async (type:FormType,id:number)=>{
   
    resetForm();
    switch(type){
        case "create":
            formType.value = "create";
            formTitle.value = "新增用户";
            break;
        case "update":
            if(id){
                await getUser(id).then((res)=>{
                    form.id=res.data.id;
                    form.username = res.data.username;
                    form.password = res.data.password;
                    form.nickname = res.data.nickname;
                    form.email = res.data.email;
                    form.telephone = res.data.telephone;
                    form.remark = res.data.remark;
                    console.log(form);
               });
            }
            formType.value = "update";
            formTitle.value = "更新用户";
            break;
    }
    isShow.value=true;
}
async function submitUser(){
   if(!userFormRef){
    return;
   }
   const validate =  await userFormRef.value.validate();
   if(!validate){
    return;
   }
   switch(formType.value){
        case "create":
        await createUser(form);
        // 新增成功向外发送消息
        emits("success");
        resetForm();
            break;
        case "update":
        // 更新成功向外发送消息
        await updateUser(form);
        emits("success");
        resetForm();
            break;
   }
   isShow.value = false;
}
function resetForm(){
    form.id = undefined;
    form.username = undefined;
    form.password = undefined;
    form.nickname = undefined;
    form.email = undefined;
    form.telephone = undefined;
    form.remark = undefined;
}
defineExpose({
    open
})
</script>