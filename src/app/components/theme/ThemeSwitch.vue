<script setup lang="ts">
import type { Placement } from 'element-plus'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { computed } from 'vue'

// default icon
const prop = withDefaults(
	defineProps<{
		themeSchema: 'light' | 'dark'
		showTool?: boolean
		placementTool?: Placement
	}>(),
	{
		showTool: true,
		placementTool: 'bottom',
	},
)
// event
const emit = defineEmits<{
	(e: 'switch'): void
}>()

function handleClick() {
	emit('switch')
}

// icon manage
const icons = {
	light: Sunny,
	dark: Moon
}
// execute icon
const icon = computed(() => icons[prop.themeSchema])
</script>

<template>
	<el-tooltip
		v-if="prop.showTool"
		:placement="prop.placementTool"
	>
		<button class="icon-btn" @click="handleClick">
			<component :is="icon" class="w-8 h-5 m-2" />
		</button>
		<template #content>
			<span class="text-white">{{ prop.themeSchema.toUpperCase()}}</span>
		</template>
	</el-tooltip>
	<button v-else class="icon-btn" @click="handleClick">
		<component :is="icon" class="w-8 h-7 m-2" />
	</button>
</template>

<style scoped>
.icon-btn {
	cursor: pointer;
	display: flex;
	align-items: center;
	border-radius: 50%;
	transition: all ease-in-out;
}
</style>
