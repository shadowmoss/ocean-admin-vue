import {RouteRecordRaw} from 'vue-router'
/**
 * meta:{
 * 
 * }
 * 对象中具体含义
 * affix属性:当拥有这个标签的路由表示该路由固定出现在tabs组件的列表当中。
 */
const routes:RouteRecordRaw[] = [
    {
        path:"/",
        name:"home",
        component:()=>import("@/layout/layout.vue"),
        meta:{
            affix:true,
        }
    },
    {
        path:"/login",
        name:"login",
        component:()=>import("@/views/login/login.vue"),
    },
    {
        path:"/register",
        name:"register",
        component:()=>import("@/views/register/register.vue"),
    }
]
export {routes};