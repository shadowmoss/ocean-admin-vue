export interface AuthorityMenu{
    id:number,
    parentId:number,
    type:number,
    name:string,
    path:string,
    componentName:string,
    component:string,
    icon:string|undefined,
    visible:number,
    alwaysShow:number,
    keepAlive:number,
    children:Array<AuthorityMenu>
}