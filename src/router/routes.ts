import {RouteRecordRaw} from 'vue-router'
const routes:RouteRecordRaw[] = [
    {
        path:"/",
        name:"home",
        component:()=>import("@/layout/layout.vue"),
    },
    {
        path:"/login",
        name:"login",
        component:()=>import("@/views/login/login.vue"),
    }
]
export {routes};