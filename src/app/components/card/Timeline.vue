<script setup lang="ts">
import { ref } from 'vue'
import type { TimelineProps } from 'element-plus'

export interface Activities {
	content: string
	timestamp: string
	color: string
}

const proActivity = defineProps<{
	activity: Activities[]
}>()
const mode = ref<TimelineProps['mode']>('alternate-reverse')
</script>

<template>
	<el-timeline class="mt-4" :mode="mode">
		<el-timeline-item
			v-for="(activity, index) in proActivity.activity"
			:key="index"
			:color="activity.color"
			:timestamp="activity.timestamp"
			class="text-start font-bold font-mono"
		>
			{{ activity.content }}
		</el-timeline-item>
	</el-timeline>
</template>

<style scoped></style>
