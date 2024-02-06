import Icon from "@/components/icon/Icon.vue";
export const renderMenuTitle = (name:string|unknown,icon:string|unknown)=>{
    return (
        <>
            <Icon
                class="mr-2"
                iconName={String(icon)} 
                width={Number(20)} 
            />
            <span>
                {name}
            </span>
        </>
    )
}