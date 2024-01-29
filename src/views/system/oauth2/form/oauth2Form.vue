<template>
    <Dialog v-model="isShow" :title="title">
        <ElForm
            ref="oauth2FormRef"
            :model="form"
            :rules="rules"
        >
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="客户端编号:" prop="clientId"
                    >
                        <ElInput
                            v-model="form.clientId" />
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="客户端秘钥:"
                        prop="secret"
                    >
                        <ElInput v-model="form.secret"/>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="应用名称:"
                        prop="name"
                    >
                        <ElInput v-model="form.name"/>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="应用图标:"
                    >
                        <ElInput v-model="form.logo"/>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="应用描述:"
                    >
                        <ElInput v-model="form.description"/>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="状态:"
                        prop="status"
                    >
                        <ElSelect v-model="form.status">
                            <ElOption
                                v-for="item in statusSelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </ElSelect>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="授权类型"
                    >
                        <ElSelect
                            v-model="form.authorizedGrantTypes"
                            multiple
                            placeholder="选择赋予允许的授权方式"
                        >
                            <ElOption
                                v-for="item in grantTypes"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            />   
                        </ElSelect>
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="访问令牌过期时间"
                        prop="accessTokenValiditySeconds"
                    >
                        <ElInputNumber v-model="form.accessTokenValiditySeconds" /> 秒
                    </ElFormItem>
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol
                    :span="24"
                >
                    <ElFormItem
                        label="刷新令牌过期时间"
                        prop="refreshTokenValiditySeconds"
                    >
                        <ElInputNumber v-model="form.refreshTokenValiditySeconds" /> 秒
                    </ElFormItem>
                </ElCol>
            </ElRow>
        </ElForm>
        <template #footer>
            <ElButton type="primary" @click="submitOAuth2">提交</ElButton>
            <ElButton @click="isShow=false">取消</ElButton>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
import {createOAuth2Client,getOAuth2ClientDetails,updateOAuth2Client} from "@/api/system/oauth2/index"
import {FormType, OAuth2ClientForm} from "@/types/form";
import { ElCol, ElForm, ElInput, ElOption, ElRow, ElSelect, FormRules,ElFormItem, ElInputNumber,ElButton,ElMessage } from "element-plus";
import Dialog from "@/components/dialog/index.vue"
import { reactive, ref } from "vue";
const updateId = ref();
const formType = ref("");
const oauth2FormRef = ref();
const title = ref("");
const isShow = ref(false);
const emits =  defineEmits({
    create:()=>{
        return true;
    },
    update:()=>{
        return true;
    }
})
const grantTypes=[
    {
        value:"authority_code",
        label:"授权码模式",
    },
    {
        value:"password",
        label:"密码模式",
    },{
        value:"refreshToken",
        label:"刷新令牌"
    }
];
const statusSelect = [
    {
        value:0,
        label:'启用'
    },
    {
        value:1,
        label:'停用'
    }
]
const form = reactive({
    id:undefined,
    clientId:undefined,
    secret:undefined,
    name:undefined,
    logo:undefined,
    description:undefined,
    status:undefined,
    accessTokenValiditySeconds:1800,
    refreshTokenValiditySeconds:43200,
    authorizedGrantTypes:[],
    redirectUris:[]
})
const rules = reactive<FormRules<OAuth2ClientForm>>({
    clientId:[
        {
            required:true,
            type:'string',
            message:'请输入客户端编号',
            trigger:'blur'
        }
    ],
    secret:[
        {
            required:true,
            type:'string',
            message:"请输入客户端秘钥",
            trigger:'blur'
        }
    ],
    name:[
        {
            required:true,
            type:'string',
            message:"请输入应用名称",
            trigger:'blur'
        }
    ],
    status:[
        {
            required:true,
            type:'number',
            message:"请输入OAuth2客户端状态"
        }
    ],
    accessTokenValiditySeconds:[
        {
            required:true,
            type:"number",
            message:"请输入访问令牌过期时间"
        }
    ],
    refreshTokenValiditySeconds:[
        {
            required:true,
            type:"number",
            message:"请输入刷新令牌的过期时间"
        }
    ]
})
async function open(type:FormType,id:number){
    switch(type){
        case "create":
            formType.value="create"
            title.value="新增OAuth2客户端"
            break;
        case "update":
            formType.value = "update"
            title.value="更新OAuth2客户端"
            updateId.value = id;
            const data = await getOAuth2ClientDetails(id);
            form.id = data.data.id;
            form.clientId = data.data.clientId;
            form.secret = data.data.secret;
            form.name = data.data.name;
            form.logo = data.data.logo;
            form.description = data.data.description;
            form.status = data.data.status;
            form.accessTokenValiditySeconds = data.data.accessTokenValiditySeconds;
            form.refreshTokenValiditySeconds = data.data.refreshTokenValiditySeconds;
            form.authorizedGrantTypes = data.data.authorizedGrantTypes;
            form.redirectUris = data.data.redirectUris;
            break;
    }
    isShow.value = true;
}
async function submitOAuth2(){
    switch(formType.value){
        case "create":
            const res = await createOAuth2Client(form);
            if(res.success){
                ElMessage({
                    message:res.message,
                    type:'success'
                })
            }else{
                ElMessage({
                    message:res.message,
                    type:'error'
                })
            }
            emits("create");
            break;
        case "update":
            const upRes = await updateOAuth2Client(form);
            console.log("更新客户端信息");
            console.log(form);
            if(upRes.success){
                ElMessage({
                    message:upRes.message,
                    type:"success"
                })
            }
            else{
                ElMessage({
                    message:upRes.message,
                    type:"error"
                })
            }
            emits("update");
            break;
    }
    restForm();
    isShow.value=false;
}
function restForm(){
    form.clientId=undefined,
    form.secret=undefined,
    form.name=undefined,
    form.logo=undefined,
    form.description=undefined,
    form.status=undefined,
    form.accessTokenValiditySeconds=1800,
    form.refreshTokenValiditySeconds=43200,
    form.authorizedGrantTypes=[],
    form.redirectUris=[]
}
defineExpose({
    open
})
</script>