import { defineStore } from "pinia";


export const tagViewStore = defineStore ("tagView", {
   state: () => ({
      cacheViews: [] as any[],
      visitViews: [] as any[],
      iframeViews: [] as any[]
   }), actions: {
      
      addView(view: any) {
         this.addCacheView (view)
         this.addVisitView (view)
      },
      addCacheView(view: any) {
         // console.log("Cache Visited: " + view.name)
         if (this.cacheViews.includes (view.name)) return // keep the same
         
         if (view.meta.isCache) {
            this.cacheViews.push (view.name)
         }
      },
      addIframeView(view: any) {
         if (this.iframeViews.some (v => v.path === view.path)) return
         this.visitViews.push (
             Object.assign ({}, view, {
                title: view.name || "no name"
             })
         )
      },
      addVisitView(view: any) {
         console.log (`Visited: ${view.name}\nPath: ${view.path}`)
         if (this.visitViews.some (v => v.path === view.path)) return
         this.visitViews.push (
             Object.assign ({}, view, {
                title: view.name || "no name"
             })
         )
      },
      
      deleteView(view: any) {
         return new Promise (resolve => {
            this.deleteVisitView (view)
            this.deleteCacheView (view)
            resolve ({visitView: [...this.visitViews], cacheView: [...this.cacheViews]})
         })
      },
      deleteVisitView(view: any) {
         return new Promise (resolve => {
            for (let [index, item] of this.visitViews.entries ()) {
               if (item.path === view.path) {
                  this.visitViews.splice (index, 1)
                  break
               }
            }
            this.iframeViews = this.iframeViews.filter (item => item.path !== view.path)
            resolve ([...this.visitViews])
         })
         
      },
      deleteCacheView(view: any) {
         return new Promise (resolve => {
            const index = this.cacheViews.indexOf (view.name)
            if (index > -1 && this.cacheViews.splice (index, 1)) {
               resolve ([...this.cacheViews])
            }
         })
      },
      delAllViews() {
         return new Promise (resolve => {
            this.delAllVisitedViews ()
            this.delAllCachedViews ()
            resolve ({
               visitedViews: [...this.visitViews],
               cachedViews: [...this.cacheViews]
            })
         })
      },
      delAllVisitedViews() {
         return new Promise (resolve => {
            const affixTags = this.visitViews.filter (tag => tag.meta.affix)
            this.visitViews = affixTags
            this.iframeViews = []
            resolve ([...this.visitViews])
         })
      },
      delAllCachedViews() {
         return new Promise (resolve => {
            this.cacheViews = []
            resolve ([...this.cacheViews])
         })
      },
      // deleteLeftTag(view: any) {
      //    return new Promise (resolve => {
      //       const index = this.visitViews.findIndex (v => v.path === view.path)
      //
      //       console.log ("Delete Left Tag length: ", index)
      //       if (index === -1) return
      //
      //       this.visitViews = this.visitViews.filter ((i, idx) => {
      //          if (idx <= index || i.meta) {
      //             return true
      //          }
      //
      //          const indexCache = this.cacheViews.indexOf (i.name)
      //          if (indexCache > -1) {
      //             this.cacheViews.splice (indexCache, 1)
      //          }
      //          return false
      //       })
      //       resolve ([...this.visitViews])
      //    })
      // },
      // deleteRightTag(view: any) {
      //    return new Promise (resolve => {
      //       const index = this.visitViews.findIndex (v => v.path === view.path)
      //
      //       console.log ("Delete Right Tag length: ", index)
      //       if (index === -1) return
      //
      //       this.visitViews = this.visitViews.filter ((i, idx) => {
      //          if (idx >= index || i.meta) {
      //             return true
      //          }
      //
      //          const indexCache = this.cacheViews.indexOf (i.name)
      //          if (indexCache > -1) {
      //             this.cacheViews.splice (indexCache, 1)
      //          }
      //          return false
      //       })
      //       resolve ([...this.visitViews])
      //    })
      // },
      //
      updateVisitView(view: any) {
         for (let v of this.visitViews) {
            if (v.path === view.path) {
               v = Object.assign (v, view)
               break
            }
         }
      }
   }
})