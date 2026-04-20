<template>
	<div :class="`app-container ${currentValue === 'kh' ? 'app-container-font-khmer' : ''}`">
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
<style scoped lang="scss">

.app-container {
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
}

.app-container-font-khmer {
	font-family: "Nokora", sans-serif;
	font-optical-sizing: auto;
	font-style: normal;
	font-weight: 400;
}
</style>
