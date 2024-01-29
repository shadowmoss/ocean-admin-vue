import { createOAuth2Client } from "@/api/system/oauth2/index";
import { formType, form } from "./oauth2Form.vue";

export async function submitOAuth2() {
switch (formType.value) {
case "create":
await createOAuth2Client(form);
break;
case "update":
break;
}
}
