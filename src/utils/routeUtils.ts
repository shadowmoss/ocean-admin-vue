import {MenuTypes} from "@/enums/menu"
import {AuthorityMenu} from "@/types/route";
import { RouteLocationNormalizedLoaded, RouteMeta, RouteRecordRaw} from 'vue-router'
const Layout = () => import("@/layout/layout.vue")
// 多模块导入
const modules = import.meta.glob("../views/**/*.{vue,tsx}");
const moduleKeys = Object.keys(modules);
export const routeGenerate = (authorityMenus:AuthorityMenu[])=>{
    const result:RouteRecordRaw[] = [];
    for(const menu of authorityMenus){
        const meta={
            type:menu.type,
            title:menu.name,
            icon:menu.icon,
            hidden:menu.visible === 0 ? false:true,
            noCache:!menu.keepAlive,
            alwaysShow:menu.children && menu.children.length >=1 && (menu.alwaysShow !== undefined ? menu.alwaysShow :true)
        }
        let data:RouteRecordRaw ={
            path:menu.path,
            name:menu.componentName,
            meta:meta
        }
        // 当前数据为目录
        if(menu.type===MenuTypes.MENU_DIRECTORY){
            data.component=Layout
        }
        // 当前数据为菜单
        if(menu.type===MenuTypes.MENU_PAGE){
            const index = menu.component ? moduleKeys.findIndex((item)=>{
                return item.includes(menu.component)
            }):moduleKeys.findIndex((item)=>{return item.includes(menu.path)});
            data.component = modules[moduleKeys[index]];
        }
        // 当前数据包含子级时，递归生成
        if(menu.children){
            data.children = routeGenerate(menu.children);
        }
        result.push(data);
    }
    return result;
}
export function parentPathEnd(parentPath:string){
    if(parentPath.endsWith("/")){
        return parentPath
    }else{
        return parentPath.concat("/");
    }
}
// 为breadCrumb创建对应层级的渲染用列表
export function generateBreadcrumbItemList<T = any>(tree:T[],func:(n:T)=>boolean):T[]{
    return listFilter(tree,func);
}
function listFilter<T>(list: T[],func:(n:T)=>boolean){
    return list.map((node:any)=>({...node}))
        .filter((node:any)=>{
            node["children"] = node["children"] && listFilter(node["children"],func);
            return func(node) || node["children"] && node["children"].length;
        })
}
export function treeToList<T=any>(tree:any,targetList:T[] = []){
    for(const item of tree){
        targetList.push({...item});
        if(item["children"]){
            treeToList(item["children"],targetList);
        }
    }
    return targetList;
}

// 筛选所需要显示的tags路由
export function filterTagsRoute(routes:any[]):any[]{
    let result:any[] = [];
    routes.forEach((item:any)=>{
        if(!item.meta){
            return;
        }
        const meta = item.meta as RouteMeta;
        if(meta.type === MenuTypes.MENU_DIRECTORY){
            const tempResult =  filterTagsRoute(item["children"]);
            result = [...result,...tempResult];
        }
        if(meta.type === MenuTypes.MENU_PAGE){
            result.push(item);
        }
    })
    return result;
}