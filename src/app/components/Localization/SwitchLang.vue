<template>
	<el-dropdown trigger="click" @command="handleLanguageChange" class=" cursor-pointer">
		<div class="overflow-hidden w-9 h-9 bg-white rounded-sm">
			<img class="w-full h-full object-cover" :src="i18nIcon"/>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in langOptions"
					:key="item.value"
					:disabled="currentValue === item.value"
					:command="item.value"
				>
					{{ item.label }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup lang="ts">
import { Locale, type LocaleType, useLocale } from '@/modules/locales'
import { useI18n } from 'vue-i18n'
import { useMessage } from '@/app/utils/message.ts'
import i18nIcon from  '@/app/assets/image/translate.png'

defineProps({
	size: {
		type: String,
		required: false,
	},
})

const langOptions = [
	{ label: '中文', value: Locale.CH },
	{ label: 'English', value: Locale.EN },
	{ label: 'ខ្មែរ', value: Locale.KH },
]

const message = useMessage()
const { changeLocale, currentValue } = useLocale()
const { t } = useI18n()

function handleLanguageChange(lang: LocaleType) {
	changeLocale(lang)
	message.messageBox(t('language'),"success")
}
</script>
<style scoped lang="scss"></style>
