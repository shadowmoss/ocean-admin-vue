import { pageOAuth2Client } from "@/api/system/oauth2/index";
import { searchParam } from "./oauth2.vue";

export async function searchOAuth2Client(params: any) {
searchParam.name = params.name;
searchParam.status = params.status;
await pageOAuth2Client(searchParam);
}
