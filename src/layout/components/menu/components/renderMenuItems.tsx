import {RouteRecordRaw} from 'vue-router'
import {MenuTypes} from "@/enums/menu" 
import {ElSubMenu,ElMenuItem} from "element-plus";
import {renderMenuTitle} from "@/layout/components/menu/components/renderMenuTitle";
import {parentPathEnd} from "@/utils/routeUtils";
export const renderMenuItem = (routes:RouteRecordRaw[],parentPath="/")=>{
                return routes.map((item:any)=>{
                    const meta = item.meta;
                    if(meta?.type==MenuTypes.MENU_DIRECTORY){
                        return (
                            <>
                                <ElSubMenu
                                    index={item.path}
                                >
                                    {{
                                        title:()=>renderMenuTitle(meta?.title,meta.icon),
                                        default:()=>renderMenuItem(item.children,item.path),
                                    }}
                                </ElSubMenu>
                            </>
                        )
                    }
                    if(meta?.type==MenuTypes.MENU_PAGE){
                        return (
                            <>
                                <ElMenuItem
                                    index={parentPathEnd(parentPath)+item.path}
                                >
                                    {{
                                        default:()=>renderMenuTitle(meta?.title,meta.icon)
                                    }}
                                </ElMenuItem>
                            </>
                        )
                    }
                });
}