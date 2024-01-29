import { type } from "os";

export interface UserForm{
    id?:number|undefined,
    username:string|undefined,
    password:string|undefined,
    nickname:string|undefined,
    email:string|undefined,
    telephone:string|undefined,
    remark:string|undefined
}
export type FormType = "create" | "update"| "createChild" | undefined;
export interface RoleForm{
    id?:number|undefined,
    name:string|undefined,
    code:string|undefined,
    roleOrder:number|undefined,
    status:number|undefined,
    remark:string|undefinde,
}
export interface MenuForm{
    id?:number|undefined,
    name:string|undefined,
    permission:string|undefined,
    type:number|undefined,
    sort:number|undefined,
    parentId:number|undefined,
    path:string|undefined,
    icon:string|undefined,
    component:string|undefined,
    componentName:string|undefined,
    status:number|undefined,
    visible:number|undefined,
    keepAlive:number|undefined,
    alwaysShow:number|undefined
}
export interface UserUpdateRoleForm{
    userId:number|undefined;
    roleIds:Array<number>|undefined;
}
export interface RoleUpdateMenuForm{
    roleId:number|undefined;
    menuIds:Array<number>|undefined;
}
export interface OAuth2ClientForm{
    clientId:string,
    secret:string,
    name:string,
    logo:string,
    description:string,
    status:number,
    accessTokenValiditySeconds:number,
    refreshTokenValiditySeconds:number,
    authorizedGrantTypes:Array<grantTypes>,
    redirectUris:Array<string>
}

type grantTypes = "authority_code" | "password" | "refreshToken";