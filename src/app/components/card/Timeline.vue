<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type TimelineProps } from 'element-plus'
import { dayMonthFormat } from '@/app/utils/dateFormat.ts'
import { Delete } from '@element-plus/icons-vue'
import { timelineStore } from '@/modules/store/line.ts'

export interface Activities {
	content: string
	timestamp: string
	color: string
}

const proActivity = defineProps<{
	activity?: Activities[]
}>()
const mode = ref<TimelineProps['mode']>('alternate-reverse')
const timeline = timelineStore()
const removeItem = (id: number) => {
	timeline.delete(id)
	ElMessage({
		message: 'Remove timeline',
		type: 'success',
	})
}
</script>

<template>
	<el-timeline :mode="mode" :v-model="proActivity.activity">
		<el-timeline-item
			v-for="(element, index) in proActivity.activity"
			:key="index"
			:color="element.color"
			:timestamp="dayMonthFormat(element.timestamp)"
			class="text-start font-bold font-mono hover:rounded-xl focus:border-b-gray-600 duration-100 transition-all py-2"
		>
			<Transition> {{ element.content }}</Transition>
			<el-icon class="mx-2 opacity-40 hover:opacity-85 duration-100 transition-all cursor-pointer" @click="removeItem(index)">
				<Delete />
			</el-icon>
		</el-timeline-item>
	</el-timeline>
</template>

<style scoped></style>
