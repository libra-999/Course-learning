import { defineStore } from 'pinia'
import { toggleHTMLClass } from '@/app/utils/common.ts'


type ThemeSchema = App.Theme.ThemeSetting['themeSchema']
const themes: ThemeSchema[] = ['light', 'dark']

function initThemeSetting(): App.Theme.ThemeSetting {
   const savedTheme = localStorage.getItem ('themeSchema')
   const themeSchema: ThemeSchema = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light'
   return {
      themeSchema
   }
}

function toggleClassCss(darkMode = false) {
   const {add, remove} = toggleHTMLClass ('dark')
   if (darkMode) add ()
   else remove ()
}

export const useTheme = defineStore ('theme', {
   state: () => ({
      settings: initThemeSetting ()
   }),
   getters: {
      darkMode: state => state.settings.themeSchema === 'dark',
   },
   actions: {
      initTheme() {
         toggleClassCss (this.darkMode)
      },
      setThemeSchema(theme: ThemeSchema) {
         this.settings.themeSchema = theme
         localStorage.setItem ('themeSchema', theme)
         toggleClassCss (theme === 'dark') // set default
      },
      
      toggleThemeSchema() {
         const index = themes.indexOf (this.settings.themeSchema)
         const nextIndex = index === themes.length - 1 ? 0 : index + 1
         const nextSchema = themes[nextIndex] as ThemeSchema
         this.setThemeSchema (nextSchema)
      }
   }
   
})

