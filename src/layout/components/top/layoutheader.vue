<script lang="tsx">
import {defineComponent} from 'vue';
import UserInfo from "@/layout/components/top/userInfo.vue";
import { useRouter} from 'vue-router';
import Collapse from "@/components/collapse/index.vue";
import Icon from "@/components/icon/Icon.vue";
import Breadcrumb from "@/layout/components/breadcrumb/index";

export default defineComponent({
    setup(){
        // const route = useRoute();
        const router = useRouter();
        const route = router.currentRoute;
        return ()=> (
            <>
            <div class="flex justify-between items-center mx-[1%] mt-[0.2%]">
                <div class="flex item-center">
                    <div class="mr-5">
                        <Collapse/>
                    </div>
                    <div
                        class="flex items-center justify-between"
                    >
                    {
                        route.value.meta.icon
                        ? 
                        <div>
                        <Icon
                            iconName={String(route.value.meta.icon)}
                            width={20}
                            />
                        </div>
                        : undefined
                    }
                        <div
                            class="ml-2"
                        >
                            <Breadcrumb></Breadcrumb>
                        </div>
                    </div>
                </div>
                <div class="basis-[8%]">
                    <UserInfo />
                </div>
            </div>
            </>
        )
    }
}) 
</script>