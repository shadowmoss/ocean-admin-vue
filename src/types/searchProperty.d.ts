/**
 * 用于构建搜索项的参数类型
 */
export interface SearchProperty{
    name:string,    // 搜索项名称,用于显示名称
    column:string,  // 搜索项的column,搜索项的传递值的名称
    type:ItemType,  // 搜索项的搜索类型,是已下拉框形式搜索,还是输入框形式搜索,还是以时间形式搜索
    options?:Array<OptionProperty>  // 用于给下拉框指定选择项
}
type ItemType = "select" | "Input" | "datetime"
export interface OptionProperty{
    key:string,             // 下拉选项的key关键字,用于渲染时区分选择项
    value:string|number,    // 下拉选项的具体值
    label:string,           // 下拉选项的名称
}