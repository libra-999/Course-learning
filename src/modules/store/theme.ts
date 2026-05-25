import { defineStore } from 'pinia'
import { computed, type Ref, ref, watch } from 'vue'
import { toggleHTMLClass } from '@/app/utils/common.ts'

export function initThemeSetting(): App.Theme.ThemeSetting {
	const savedTheme = localStorage.getItem('themeSchema')
	const themeSchema : App.Theme.ThemeSetting['themeSchema'] = savedTheme === 'dark' || savedTheme === 'light' ?savedTheme : 'light'
	return {
		themeSchema
	}
}

export function toggleClassCss(darkMode = false) {
	const { add, remove } = toggleHTMLClass('dark')
	if (darkMode) add()
	else remove()
}

export const useTheme = defineStore('theme', () => {
	const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSetting())
	type ThemeSchema = App.Theme.ThemeSetting['themeSchema'] // map to themeSchema
	const themes: ThemeSchema[] = ['light', 'dark']

	/* Dark Mode */
	const darkMode = computed(() => {
		return settings.value.themeSchema === 'dark'
	})

	/* ThemeSchema */
	function setThemeSchema(theme: ThemeSchema) {
		settings.value.themeSchema = theme
		localStorage.setItem('themeSchema', theme)
	}

	/* Toggle switch schema */
	function toggleThemeSchema() {
		const index = themes.indexOf(settings.value.themeSchema)
		const nextIndex = index === themes.length - 1 ? 0 : index + 1
		const nextSchema = themes[nextIndex] as ThemeSchema // declare theme value already exist
		setThemeSchema(nextSchema)
	}

	/* watch theme change by localstorage */
	watch(darkMode, val => {
		toggleClassCss(val)
	}, { immediate: true })


	return {
		darkMode,
		toggleThemeSchema,
		settings,
	}
})

