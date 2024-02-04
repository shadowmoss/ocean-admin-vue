import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {setupRouter} from '@/router';
import {setUpPinia} from '@/store/index'
import '@/permission/permission'
import * as ElementPlusIconVue from '@element-plus/icons-vue';

const ocean_admin = createApp(App);
// 配置路由,动态加载路由，需要将路由信息配置完全之后才开始，执行路由匹配，
// 由于路由是请求后端信息，动态生成的，此处需等待路由对象，初始化完成再进行路由匹配。所以需要异步等待
await setupRouter(ocean_admin);
// 配置存储中心
setUpPinia(ocean_admin);
// 全局注册当前Element-Plus的所有Icon组件
for(const [key,component] of Object.entries(ElementPlusIconVue)){
    ocean_admin.component(key,component);
}

ocean_admin.mount('#app');
