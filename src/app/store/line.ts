import { defineStore } from 'pinia'
import type { Activities } from '@/app/components/card/Timeline.vue'

export const timelineStore = defineStore('timeline', {
	state: (): Activities => ({
		content: '',
		timestamp: '',
		color: ''
	}),
	actions: {
		isSave(activity: any) {
			const activityArr = [];
			localStorage.setItem('timeline', JSON.stringify(activityArr.push(activity)))
		},
		isUpdate: {},
		isDelete: {}
	}
})