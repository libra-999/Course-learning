<template>
    <div>
        <ButtonGlobal class=" absolute top-2 right-1 text-white" value="" @click="back">
			<template #icon-right>
				<el-icon>
					<CloseBold/>
				</el-icon>
			</template>
		</ButtonGlobal>
       <Role/>
    </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import Role from '@/modules/view/Table/Role/Role.vue';
import { ArrowLeftBold, CloseBold } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';


const route = useRouter()
const back = () => route.back()
</script>

<style lang="scss" scoped>

</style>