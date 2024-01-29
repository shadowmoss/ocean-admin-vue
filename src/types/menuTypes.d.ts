export interface MenuOriginType{
    id:number,
    name:string,
    permission:string,
    type:number,
    sort:number,
    parentId:number,
    path:string,
    icon:string,
    component:string,
    componentName:string,
    status:number,
    visible:number,
    keepAlive:number,
    alwaysShow:number,
    children:Array<MenuOriginType>
}
export interface MenuSelectType{
    value:number;
    label:string;
    parentId:number;
    children:MenuSelectType[]
}