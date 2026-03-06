<script setup lang="ts">
import { Notebook } from '@element-plus/icons-vue'
import type { Component } from 'vue'

defineProps<{
	title: string
	content: string
	path: string
	icon?: Component
}>()
defineModel()
</script>

<template>
	<RouterLink :to="path">
		<div class="relative overflow-hidden rounded-sm border border-gray-200 transition-all duration-150 hover:-translate-y-2 hover:shadow-xl hover:bg-gray-100/70 bg-gray-100/50 p-2 text-start">
			<div class="flex h-[180px] flex-col justify-between rounded-md p-6">
				<el-icon size="48">
					<component v-if="icon" :is="icon"/>
					<Notebook v-else />
				</el-icon>
				<div class="space-y-2">
					<h3 class="font-bold">{{ title }}</h3>
					<p class="text-sm text-muted-foreground">
						{{ content }}
					</p>
				</div>
			</div>
		</div>
	</RouterLink>
</template>

<style scoped></style>
