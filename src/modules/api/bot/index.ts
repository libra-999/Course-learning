import apiRequest from "@/app/utils/request";

export async function BotApi(contents: any, deviceName: string): Promise<any>{
    const generateContent = await apiRequest.post("/api/chat/bot/generate-content", {
        contents: contents,
        device: deviceName
    })
    return generateContent.data;
}