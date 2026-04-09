<template>
	<el-dropdown trigger="click" @command="handleLanguageChange">
		<div>
			<svg-icon icon-class="language" :size="size" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in langOptions"
					:key="item.value"
					:disabled="theme.changeLang === item.value"
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
import { useTheme } from '@/modules/store/theme'

defineProps({
	size: {
		type: String,
		required: false,
	},
})

const langOptions = [
	{ label: '中文', value: Locale.CH },
	{ label: 'English', value: Locale.EN },
]

const theme = useTheme()
const message = useMessage()
const { changeLocale } = useLocale()
const { t } = useI18n()

function handleLanguageChange(lang: LocaleType) {
	changeLocale(lang)
	theme.switchLanguage(lang)
	message.messageBox(t('language'),"success")
}
</script>
<style scoped lang="scss"></style>
