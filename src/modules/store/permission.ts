import { defineStore } from "pinia";
import { menuRoute } from "@/modules/api/menu";
import { apiMenuRouteConstant as menuRouteConstant, staticMenuRouteConstant } from "@/modules/route/module.ts";
import ParentLink from "@/app/components/ParentView/index.vue"
import { getNormalPath } from "@/app/utils/common";


const modules = import.meta.glob("@/modules/view/System/**/*.vue")
export const permissionStore = defineStore("permission", {
   state: () => ({
      routes: [] as any[],
      addRoutes: [],
      defaultRoutes: [] as any[],
      tagRoutes: [], // tag route
      sidebarRoutes: [],
      topBarRoutes: []
   }),
   actions: {
      setRoutes(routes: any) {
         this.addRoutes = routes
         this.routes = menuRouteConstant.concat(routes)
      },
      setDefaultRoute(routes: any) {
         this.defaultRoutes = menuRouteConstant.concat(routes)
      },
      setTagRoute(routes: any) {
         this.tagRoutes = routes
      },
      setTopBarRoute(route: any){
         this.topBarRoutes = route
      },
      setSidebarRoute(routes: any) {
         this.sidebarRoutes = routes
      },
      generateRoutes() {
         return new Promise(resolve => {
            menuRoute().then(res => {
               const defaultData = res.data
               const sideData = res.data
               const rewriteData = res.data

               const sideBarRoutes = filterAsyncRouter(sideData)
               const rewriteRoutes = filterAsyncRouter(rewriteData, false, true)
               const defaultRoutes = filterAsyncRouter(defaultData)

               this.setDefaultRoute(sideBarRoutes)
               this.setRoutes(rewriteRoutes)
               this.setSidebarRoute([...staticMenuRouteConstant,...sideBarRoutes])
               this.setTagRoute(defaultRoutes)
               this.setTopBarRoute(defaultRoutes)

               resolve(rewriteRoutes)
            })
         })
      }
   },
});

function filterAsyncRouter(asyncRouteMap: any[], lastRoute: boolean = false, type: boolean = false) {
   return asyncRouteMap.filter(route => route.menuType !== 2) // no filter button permission
      .map(route => {
         const children = route.children || []

         route.path = getNormalPath(route.path)
         route.name = route.routingName

         route.meta = {
            ...route.meta,
            title: route.menuName,
            icon: route.icon,
            requireAuth: true,
            menuType: route.menuType,
            isCache : route.meta?.isCache || false,
            affix: route.meta?.affix || false
         }
        
         const childRoute = filterAsyncRouter(children,route,type)
         
         if (route.menuType === 0){
            route.component =  ParentLink
         }
         if (route.menuType === 1) {
            route.component = loadView(route.path)
         }

         if (childRoute.length > 0 ) {
            route.children = childRoute
         }else{
            delete route.children
         }
         return route
      })
}

function loadView(path: any) {
   const routePath = path.replace(/^\/system\//i, '')
   for (const p in modules) {
      const viewPath = p.replace('/src/modules/view/System/', '').replace('.vue', '')

      // Ex: apiPath = index , viewPath = index (true)
      if (viewPath.toLowerCase() === routePath.toLowerCase()) {
         return modules[p]
      }
   }

   console.warn(`Cannot found path : ${path}`)
   return undefined
}


