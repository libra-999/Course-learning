import apiRequest from "@/app/utils/request";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL
export async function BotApi(contents: any, deviceName: string): Promise<any>{
    const generateContent = await apiRequest.post("/api/chat/bot/generate-content", {
        contents: contents,
        device: deviceName
    })
    return generateContent.data;
}

export async function healthServer() :Promise<any> {
    return await axios.get(`${SERVER_URL}/`)
}