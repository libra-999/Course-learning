import { defineStore } from "pinia";


export const ProfileSetting: App.Profile.Setting = {
    topNav: false,
    tagIcon: false,
    tagViews: true,
    sideBarLogo: true,
    fixedHeader: false
}

const { sideBarLogo, topNav, tagIcon, tagViews, fixedHeader } = ProfileSetting

export const settingStore = defineStore("setting", {
    state: () => ({
        sideBarLogo: sideBarLogo,
        topNav: topNav,
        tagIcon: tagIcon,
        tagViews: tagViews,
        fixedHeader: fixedHeader,
    }),
    actions: {
    }
})