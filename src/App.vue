<template>
	<div class="w-full h-full">
		<el-config-provider :locale="elementPlusLocale">
			<RouterView />
		</el-config-provider>
	</div>
</template>
<script setup lang="ts">
import { useLocale } from '@/modules/locales';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const { currentValue, elementPlusLocale } = useLocale()
document.title = t("TITLE_SYSTEM") 
watch((currentValue), () => document.title = t("TITLE_SYSTEM")) // can be nearly real time to see title changed
</script>
<style scoped></style>
