import { defineStore } from "pinia";
import { menuRoute } from "@/modules/api/menu";
import { menuRouteConstant } from "@/modules/route/module.ts";


const modules = import.meta.glob("@/modules/view/System/**/*.vue")
export const permissionStore = defineStore("permission", {
   state: () => ({
      routes: [] as any[],
      addRoutes: [],
      defaultRoutes: [] as any[],
      tagRoutes: [], // tag route
      sidebarRoutes: []
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
               this.setSidebarRoute(sideBarRoutes)
               this.setTagRoute(defaultRoutes)

               resolve(rewriteRoutes)
            })
         })
      }
   },
});

function filterAsyncRouter(asyncRouteMap: any[], lastRoute: boolean = false, type: boolean = false) {
   return asyncRouteMap.filter(route => route.menuType !== 2)
      .map(route => {
         const children = route.children || []
         route.path = normalizaPath(route.path)
         route.name = route.routingName
         route.meta = {
            title: route.menuName,
            icon: route.icon,
            requireAuth: true,
            menuType: route.menuType,
         }

         if (route.menuType === 1) {
            route.component = loadView(route.path)
         }

         if (route.menuType === 0) {
            route.redirect = children.find((item: any) => item.menuType === 1)?.path
         }

         route.children = filterAsyncRouter(children, route, type)
         if (!route.children.length) {
            delete route.children
         }
         return route
      })
}

// function filterChildren(childrenMap: any[], lastRouter: any = false) {
//    const children: any[] = []
//    childrenMap.forEach(i => {
//       i.path = lastRouter ? lastRouter.path + '/' + i.path : i.path
//       if (i.children && i.children.length) {
//          children.push(...filterChildren(i.children, i))
//       } else children.push(i)
//    })
//    return children
// }

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

function normalizaPath(path: string) {
   if (!path) return ''
   return path
      .replace(/\/+/g, '/')
      .replace(/^\/System/i, '/system')
}


