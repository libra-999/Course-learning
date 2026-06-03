import { defineStore } from "pinia";


const { sideBarLogo, topNav, tagIcon, tagViews }= ProfileSetting
const storageSetting : any = localStorage.getItem('layout') ?? ''

export const settingStore = defineStore("setting", {
    state: () => ({
        sideBarLogo:  storageSetting.sideBarLogo ? sideBarLogo : storageSetting.sideBarLogo ,
        topNav:  storageSetting.topNav ? topNav : storageSetting.topNav ,
        tagIcon:  storageSetting.tagIcon ? tagIcon : storageSetting.tagIcon ,
        tagViews:  storageSetting.tagViews ? tagViews : storageSetting.tagViews ,
    }),
    actions : {
    }
})