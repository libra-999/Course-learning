export interface MenuRoute{
    id: string
    path: string
    menuName: string
    routingName?: string
    orderNumber?: number
    icon?: string 
    meta?: {
        isCache: boolean
        title: string
    },
    children?: MenuRoute[]   
}
