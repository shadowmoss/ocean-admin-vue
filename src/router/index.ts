import { createRouter,createWebHistory,RouterOptions} from 'vue-router';
import {routes} from '@/router/routes.ts';
import {App} from 'vue';

const routerOptions:RouterOptions = {
    history:createWebHistory(),
    routes:routes,
}

const router =  createRouter(
    routerOptions
);
export function setupRouter (app:App<Element>){
    app.use(router);
}