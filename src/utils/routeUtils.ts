import {MenuTypes} from "@/enums/menu"
import {AuthorityMenu} from "@/types/route";
import { RouteRecordRaw} from 'vue-router'
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
            hidden:!menu.visible,
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