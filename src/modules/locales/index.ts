import { createI18n, useI18n } from 'vue-i18n'

import { computed } from 'vue'
import en from "@/modules/locales/en.ts";
import ch from "@/modules/locales/ch.ts";
import kh from '@/modules/locales/kh';
import { en as epEn, zhCn as epZhCn, km as epKh } from 'element-plus/es/locales.mjs'

export const Locale = {
	EN:"en",
	CH:"ch",
	KH:"kh"
} as const
export type LocaleType = (typeof Locale)[keyof typeof Locale]


const localeKey = localStorage.getItem('localization') || 'en'
const i18n = createI18n({
	legacy: false, // must not change to true , vue 3 didn't support
	locale: localeKey,
	fallbackLocale: 'en',
	allowComposition: true,
	messages: {
		en,
		ch,
		kh
	},
})

export const locales: { label: string; value: LocaleType; code: string }[] = [
	{ label: 'English', value: 'en', code: 'en-US' },
	{ label: '中文', value: 'ch', code: 'zh-CN' },
	{ label: 'ខ្មែរ', value: 'kh', code: 'km-KH' },
]

export const elementPlusLocaleMap: Record<LocaleType, any> = {
	en: epEn,
	ch: epZhCn,
	kh: epKh ,
}

export const useLocale = () => {
	const i18n = useI18n()
	const currentLocale = computed(() => i18n.locale.value)

	// which label lang from system
	const currentLabel = computed(() => {
		const match = locales.find(
			(locales) => locales.value === currentLocale.value,
		)
		return match?.label || 'English'
	})

	// which value lang from system
	const currentValue = computed((): LocaleType => {
		const match = locales.find(
			(locales) => locales.value === currentLocale.value,
		)
		return match?.value || 'en'
	})

	// which code lang from system
	const currentCode = computed(() => {
		const match = locales.find(
			(locales) => locales.value === currentLocale.value,
		)
		return match?.code || 'en-US'
	})

	// i18n change header
	const changeLocale = (locale: LocaleType) => {
		if (i18n.locale.value !== locale) {
			i18n.locale.value = locale
			localStorage.setItem("i18n", locale)
		}
	}

	// apply current locale to element plus
	const elementPlusLocale = computed(() => {
		return elementPlusLocaleMap[currentValue.value]
	})
	return {
		currentLocale,
		currentLabel,
		currentValue,
		currentCode,
		changeLocale,
		elementPlusLocale,
	}
}
export default i18n
