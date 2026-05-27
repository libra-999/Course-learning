<template>
	<div class="test-container">
		<ButtonGlobal class=" absolute top-1 left-1 p-4" value="" @click="back">
			<template #icon-right>
				<el-icon>
					<ArrowLeftBold/>
				</el-icon>
			</template>
		</ButtonGlobal>
		<div class="number-show-mobile">
			<KeepAlive>
				<span v-for="(key, index) in boxValue" :key="index"
					class="bg-center bg-blue-500 w-8 p-2 mx-2 rounded-xl text">
					{{ key }}</span>
			</KeepAlive>
		</div>
		<br />
		<div>
			<ButtonGlobal value="Reset" v-if="count == 20" class="border-2 rounded-md" @click="handleReset" />
			<ButtonGlobal value="Click" v-else class="border-2 rounded-md" @click="handleClickAdd" />
		</div>
	</div>
</template>
<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const boxValue = ref<number[]>([0])
const count = ref<number>(0)
const router = useRouter()

const back = ()=> {
	router.back()
}

const handleReset = () => {
	count.value = 0
	boxValue.value = [0]
}

const handleClickAdd = () => {
	if (boxValue.value.length > 20) {
		boxValue.value = []
	}
	count.value++
	boxValue.value.push(count.value)
}
</script>

<style lang="scss" scoped>
.test-container {
	min-height: 100vh;
	width: 100%;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
@media (max-width: $screen-xs){
	.test-container {
		.number-show-mobile{
			width: 80%;
			overflow: hidden;
			display: flex;
			flex-wrap:wrap;
			gap: .2rem;
		}
	}
}


</style>
