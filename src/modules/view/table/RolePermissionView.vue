<template>
    <div class="w-full">
        <el-drawer :model-value="modelValue"
            :title="'[ ' + rolePermissionDefault?.role.name + ' ] ' + rolePermissionDefault?.role.code" size="600px"
            @update:model-value="handleVisibleDrawer" @close="handleClose">
            <div class="flex-x-between">
                <div class="flex-center ml-5">
                    <ButtonGlobal class="text-white" plain @click="toggleMenuExpand"
                        :value="menuExpanded ? '收缩' : '扩张'">
                        <template #icon-right>
                            <el-icon>
                                <Switch />
                            </el-icon>
                        </template>
                    </ButtonGlobal>
                </div>
            </div>
            <el-tree 
            ref="roleTreeRef" 
            :data="permissionTreeData" 
            :props="{lable:'name', children: 'children'}"
            node-key="id" 
            show-checkbox
            :default-expand-all="true"
            :filter-node-method="handleFilterRolePermission" 
            :check-strictly="!rolePermissionLink" class="mt-5">
                <template #default="{ data }">
                    {{ data.name.toUpperCase() }}
                </template>
            </el-tree>
            <template #footer>
                <div class="flex text-white place-items-end">
                    <ButtonGlobal value="确定" @click="handleToggleAssignPermission" />
                    <ButtonGlobal value="取消" @click="handleClose" />
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue';
import { permissionList, rolePermission } from '@/modules/api/role';
import type { PermissionItem, PermissionTree, RolePermissionItem } from '@/modules/types/role';
import {  Switch } from '@element-plus/icons-vue';
import { nextTick, ref, watch } from 'vue';


const props = defineProps<{
    modelValue: boolean,
    roleId: string | null
}>()
const menuExpanded = ref(true)
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()
const permissionData = ref<PermissionItem[]>([])
const rolePermissionDefault = ref<RolePermissionItem | null>()
const permissionTreeData = ref<PermissionTree[]>([])

const roleTreeRef = ref<any>()
const rolePermissionLink = ref(true)

/* Button Action */
const handleVisibleDrawer = (value: boolean) => emit('update:modelValue', value);
const handleClose = () => emit('update:modelValue', false)

/* List Data */
const fetchPermissionData = async () => {
    const data = await permissionList()
    permissionData.value = Array.isArray(data.data) ? data.data : []
    return data
}
const fetchRolePermissionData = async () => {
    if (props.roleId !== null) {
        const data = await rolePermission(props.roleId)
        rolePermissionDefault.value = data.data
        return data
    }
}

/* TreeMenu */
const setTreeExpand = (expanded: boolean) => {
    const nodesMap = roleTreeRef.value?.store?.nodesMap ?? {}
    for (const node of Object.values(nodesMap) as any[]) {
        node.expanded = expanded
    }
}
const toggleMenuExpand = () => { 
    menuExpanded.value = !menuExpanded.value
    setTreeExpand(menuExpanded.value)
}
const getPermissionPayload = (_payload: any): PermissionItem[] => {
    if (Array.isArray(_payload)) return _payload
    return [];
}
const getRolePermissionPayload = (_payload: any): RolePermissionItem | null => {
    if (_payload?.role && Array.isArray(_payload.permissions)) return _payload
    return null
}
const buildTreePermission = (permissions: PermissionItem[]): PermissionTree[] => {
    const mapTree = new Map<string, PermissionTree>()
    for (const item of permissions) {
        const moduleName = item.module.trim()// specific module name in permission list
        if (!mapTree.has(moduleName)) {
            mapTree.set(moduleName, { id: '', name: moduleName, children: [] })
        }
        // same module name
        mapTree.get(moduleName)!.children!.push({ id: item.id, name: item.name, module: item.module })
    }
    return Array.from(mapTree.values()) // array map.value()
}
const checKTickKey = async (checkKey: string[]) => {
    await nextTick() // build-in of vue to check box tick
    roleTreeRef.value?.setCheckedKeys(checkKey) // setCheckedKeys created by ref from roleTreeRef
}
const syncPermissionAndRoleHasPermission = async () => {
    const [perResp, rolePerResp] = await Promise.all([
        fetchPermissionData(),
        fetchRolePermissionData()
    ]);
    permissionData.value = getPermissionPayload(perResp.data)
    permissionTreeData.value = buildTreePermission(permissionData.value)

    const rolePer = getRolePermissionPayload(rolePerResp.data)
    rolePermissionDefault.value = rolePer
    await checKTickKey(rolePer?.permissions?.map((p) => p.id) ?? [])
}
const handleFilterRolePermission = (value: string, data: PermissionItem) => {
    if (!value) return true
    return data.name.includes(value)
}

/*  Button event  */
const handleRoleAdd = async () => {}
const handleRoleDelete = async () => {}
const handleRoleEdit = async () => {}
const handleRoleDeleteAll = async () => {}
const handleToggleAssignPermission = async () => {}

/* watch data */
watch(
    () => [props.modelValue, props.roleId], // make sure watch this event 
    async ([isOpen, roleId]) => {
        if (!isOpen || !roleId) return 
        await syncPermissionAndRoleHasPermission()
    },
    { immediate: true }
)

</script>

<style scoped></style>
