import apiRequest from "@/app/utils/request.ts";


export async function menuRoute(): Promise<any> {
   const getRoutes = await apiRequest.get ('/api/menu/routes')
   return getRoutes.data
}