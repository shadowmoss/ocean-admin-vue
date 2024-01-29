import { deleteOAuth2Client } from "@/api/system/oauth2/index";

export async function handleDelete(id: number) {
await deleteOAuth2Client(id);
}
