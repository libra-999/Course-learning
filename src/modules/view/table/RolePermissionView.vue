<template>
    <div class="w-full">
        <el-drawer :model-value="modelValue" title="Test"
            size="600px" @update:model-value="handleVisibleDrawer" @close="handleClose">
            <div class="flex-x-between">
                <div class="flex-center ml-5">
                    <ButtonGlobal class="text-white" plain @click="toggleMenuExpand" :value="menuExpanded ? '收缩' : '展开'">
                        <template #icon-right>
                            <el-icon>
                                <Switch />
                            </el-icon>
                        </template>
                    </ButtonGlobal>
                </div>
            </div>
            <el-tree show-checkbox node-key="id" :default-expand-all="true" :data="permissionData" class="mt-5">
                <template #default="{ data }">
                    {{ data.name }}
                </template>
            </el-tree>
            <template #footer>
                <div class="flex text-white place-items-end">
                    <ButtonGlobal value="确定" @click="handleSubmit" />
                    <ButtonGlobal value="取消" @click="handleClose" />
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue';
import { permissionList, rolePermission } from '@/modules/api/role';
import type { PermissionItem, RolePermissionItem } from '@/modules/types/role';
import { Switch } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';


/* variable */
const props = defineProps<{
    modelValue: boolean,
    roleId: string | null
}>()
const menuExpanded = ref(true)
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()
const permissionData = ref<PermissionItem[]>()
const rolePermissionDefault = ref<RolePermissionItem>()


 

/* action event */
const toggleMenuExpand = () => { menuExpanded.value = !menuExpanded.value }
const handleVisibleDrawer = (value: boolean) => emit('update:modelValue', value);
const handleClose = () => emit('update:modelValue', false)
const fetchPermissionData = async () => {
    const data = await permissionList()
    permissionData.value = Array.isArray(data.data) ? data.data : []
}
const fetchRolePermissionData = async () => {
    if (props.roleId !== null) {
        const data = await rolePermission(props.roleId)
        rolePermissionDefault.value = data.data
    }

}

console.log(permissionData.value) 
console.log(rolePermissionDefault.value) 
const handleSubmit = async () => { }

/* watch data */
onMounted(() => {
    fetchPermissionData()
    fetchRolePermissionData()
})

</script>

<style scoped></style>