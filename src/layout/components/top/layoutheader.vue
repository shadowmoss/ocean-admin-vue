<script lang="tsx">
import {defineComponent} from 'vue';
import UserInfo from "@/layout/components/top/userInfo.vue";
import { useRoute } from 'vue-router';
export default defineComponent({
    setup(){
        const route = useRoute();
        
        return ()=> (
            <>
            <div class="flex justify-between items-center mx-[1%] mt-[0.2%]">
                <div>
                    {route.name}
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