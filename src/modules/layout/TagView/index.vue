<template>
   <div id="tag-view-container" class="tag-view-container">
      <ScrollTagHorizontal class="tag-view-container-scroll" ref="scrollRef" @scroll="() => closeMenu()">
         <router-link
             :class="{ 'active' : isCurrentActive(tag)}"
             class="tag-view-container-scroll-item"
             v-for="tag in visitView"
             :key="tag.path"
             :data-path="tag.path"
             :to="{ path: tag.path, query: tag.query }"
             @contextmenu.prevent="openMenu(tag, $event)"
             @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''">
            {{ tag.name }}
            <span v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)">
                    <el-icon>
                        <CloseBold/>
                    </el-icon>
                </span>
         </router-link>
      </ScrollTagHorizontal>
   </div>
</template>

<script setup lang="ts">
import { getNormalPath } from '@/app/utils/common';
import ScrollTagHorizontal from '@/modules/layout/TagView/ScrollTagHorizontal.vue';
import { permissionStore } from '@/modules/store/permission';
import { tagViewStore } from '@/modules/store/tagview';
import { CloseBold } from '@element-plus/icons-vue';
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const visible = ref (false)
const top = ref (0)
const left = ref (0)
const selectTag = ref<any> ({})
const affixTag = ref ([])
const scrollRef = ref<any> (null)
const route = useRoute ()
const router = useRouter ()

const useTagView = tagViewStore ()
const usePermission = permissionStore ()

const {proxy} = getCurrentInstance () as any
const visitView = computed (() => useTagView.visitViews)
const routeTag = computed (() => usePermission.routes)


const tagStore = tagViewStore ()

function isAffix(tag: any) {
   return tag.meta && tag.meta.affix
}

// active tag
function isCurrentActive(rt: any) {
   return rt.path === route.path
}

function addTags() {
   const {name} = route
   if (name) {
      tagStore.addView (route)
   }
}

// init tag to route
function filterAffixTag(routes: any, basePath: string = '') {
   let tags: any = []
   routes.forEach ((route: any) => {
      if (route.meta && route.meta.affix) {
         const tagPath = getNormalPath (basePath + '/' + route.path)
         tags.push ({
            fullpPath: tagPath,
            path: tagPath,
            name: route.menuName,
            meta: {...route.meta}
         })
      }
      if (route.children) {
         const tempTags: any = filterAffixTag (route.children, route.path)
         if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
         }
      }
   })
   return tags
}

function initTags() {
   const res = filterAffixTag (routeTag.value)
   affixTag.value = res
   for (const tag of res) {
      if (tag.name) {
         tagStore.addVisitView (tag)
      }
   }
}

function moveToCurrentTag() {
   nextTick (() => {
      for (const res of visitView.value) {
         if (res.path === route.path) {
            scrollRef.value.moveToTarget (res)
            if (res.fullPath !== route.fullPath) {
               tagStore.updateVisitView (route)
            }

         }
      }
   })
}

function toLastView(visitView: any, view?: any) {
   const latestView = visitView.slice (-1)[0]
   if (latestView) {
      router.push (latestView.fullPath)
   } else {
      if (view.name === 'Menu') {
         router.replace ({path: '/redirect' + view.fullPath})
      } else {
         router.push ('/system/menu')
      }
   }
}

function closeSelectedTag(view: any) {
   closePage (view).then ((v: any) => {
      if (isCurrentActive (view)) {
         toLastView (v.visitView, view)
      }
   })
}

function closeMenu() {
   visible.value = false
}

function openMenu(tag: any, e: any) {
   const menuMinWidth = 105
   const offsetLeft = proxy.$el.getBoundingClientRect ().left
   const offsetWidth = proxy.$el.offsetWidth
   const maxLeft = offsetWidth - menuMinWidth
   const l = e.clientX - offsetLeft + 15

   if (l > maxLeft) {
      left.value = maxLeft
   } else {
      left.value = l
   }

   top.value = e.clientY
   visible.value = true
   selectTag.value = tag
}

async function closePage(obj: any) {

   if (obj === undefined) {
      return useTagView.deleteView (router.currentRoute.value).then ((v: any) => {
         const latestView = v.slice (-1)[0]
         if (latestView) {
            return router.push (latestView.fullPath)
         }
         return router.push ('/system/menu/dashboard')
      })
   }
   return useTagView.deleteView (obj)
}


watch ([route, visible], (value) => {
   addTags (),
       moveToCurrentTag ()

   if (value) {
      document.body.addEventListener ('click', closeMenu)
   } else {
      document.body.removeEventListener ('click', closeMenu)
   }
})
onMounted (() => {
   initTags ()
   addTags ()
})

</script>

<style lang="scss" scoped>
.tag-view-container {
   height: 34px;
   width: 100%;
   background: #fff;
   border-bottom: 1px solid rgba(0, 0, 0, 0.051);
   box-shadow: 0 1px 3px 0 rgba(147, 146, 146, 0.12), 0 0 3px 0 rgba(225, 222, 222, 0.04);

   &-scroll {
      text-align: start;

      &-item {
         display: inline-block;
         position: relative;
         cursor: pointer;
         height: 26px;
         line-height: 26px;
         border: 1px solid var(--tags-item-border, #d8dce5);
         color: var(--tags-item-text, #495060);
         background: var(--tags-item-bg, #fff);
         padding: 0 8px;
         font-size: 12px;
         margin-left: 5px;
         margin-top: 4px;

         &:first-of-type {
            margin-left: 15px;
         }

         &:last-of-type {
            margin-right: 15px;
         }

         &.active {
            background-color: $defaultSidebarItem;
            color: #fff;

            &::before {
               content: '';
               background: #fff;
               display: inline-block;
               width: 8px;
               height: 8px;
               border-radius: 50%;
               position: relative;
               margin-right: 5px;
            }
         }
      }
   }
}
</style>