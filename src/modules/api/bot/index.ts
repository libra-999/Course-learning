import apiRequest from "@/app/utils/request";

export async function BotApi(content: any): Promise<any>{
    const generateContent = await apiRequest.post("/api/chat/bot/generate-content", content)
    return generateContent.data;
}