import { defineStore } from "pinia";


export const ProfileSetting: App.Profile.Setting = {
    topNav: false,
    tagIcon: false,
    tagViews: true,
    sideBarLogo: true,
    fixedHeader: true
}

const { sideBarLogo, topNav, tagIcon, tagViews , fixedHeader }= ProfileSetting
const storageSetting : any = localStorage.getItem('layout') ?? ''

export const settingStore = defineStore("setting", {
    state: () => ({
        sideBarLogo:  storageSetting.sideBarLogo ? sideBarLogo : storageSetting.sideBarLogo ,
        topNav:  storageSetting.topNav ? topNav : storageSetting.topNav ,
        tagIcon:  storageSetting.tagIcon ? tagIcon : storageSetting.tagIcon ,
        tagViews:  storageSetting.tagViews ? tagViews : storageSetting.tagViews ,
        fixedHeader: storageSetting.fixedHeader ? fixedHeader : storageSetting.fixedHeader,
    }),
    actions : {
    }
})