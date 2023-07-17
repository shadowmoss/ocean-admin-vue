import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {setupRouter} from '@/router';

const ocean_admin = createApp(App);
// 配置路由
setupRouter(ocean_admin);

ocean_admin.mount('#app');
