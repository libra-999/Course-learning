<template>
    <div>
        <!-- Dialog Add Form -->
        <el-dialog 
            :model-value="prop.dialogState" 
            @update:model-value="handleOpenEmitState" 
            width="500"
            @closed="handleCloseDialog">
            <el-form ref="roleFormInstance" :rules="roleRules" :model="roleRef">
                <el-form-item prop="name">
                    <label class="font-bold">用名</label>
                    <el-input v-model="roleRef.name" name="name" type="text" placeholder="输入角色名称" />
                </el-form-item>
                <el-form-item prop="code">
                    <label class="font-bold">代码</label>
                    <el-input v-model="roleRef.code" type="text" name="code" placeholder="输入角色代码" />
                </el-form-item>
                <ButtonGlobal @click.prevent="handleRoleAdd" class="text-white" plain value="提交" />
            </el-form>
        </el-dialog>

        <!-- Dialog Update Form -->
        <el-dialog 
            :model-value="prop.dialogUpdate" 
            @update:model-value="handleOpenEmitUpdateState"  width="500" @closed="handleCloseUpdateDialog">
            <el-form ref="roleUpdateFormInstance" :model="editRole">
                <el-form-item prop="name">
                    <label class="font-bold">用名</label>
                    <el-input v-model="editRole.name" name="name" type="text" placeholder="输入角色名称" />
                </el-form-item>
                <el-form-item prop="status">
                    <label class="font-bold mr-2">状态</label>
                    <el-radio-group v-model="editRole.status">
                        <el-radio :value="1">正常</el-radio>
                        <el-radio :value="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <ButtonGlobal @click.prevent="handleRoleEdit" class="text-white" value="节省" />
            </el-form>
        </el-dialog>

        <!-- Dialog Delete All Form -->
        <el-dialog 
            :model-value="prop.dialogDeleteAllState" 
            @update:model-value="handleOpenEmitDeleteState"  title="删除所有角色" width="500" :before-close="handleCloseDeleteAllDialog">
            <p class="text-start">您确定删除所有角色吗？ 但要确保所有这些角色都不允许!</p>
            <template #footer>
                <div class="flex justify-end">
                    <ButtonGlobal @click="handleCloseDeleteAllDialog" class="text-white" value="取消" />
                    <ButtonGlobal class="bg-red-500 text-white" @click="handleRoleDeleteAll" value="确认" />
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue';
import { switchStatusCode, useMessage } from '@/app/utils/message';
import { roleAdd, roleDeleteAll, roleUpdate } from '@/modules/api/role';
import { loginStore } from '@/modules/store/auth';
import type { RoleReq, RoleUpdateReq } from '@/modules/types/role';
import type { FormInstance, FormRules } from 'element-plus';
import { ref, watch } from 'vue';


const prop = defineProps<{
    roleUpdateRef: RoleUpdateReq,
    selectedRoleIds: string[],
    dialogState: boolean,
    dialogUpdate: boolean,
    dialogDeleteAllState: boolean
}>()
const emit = defineEmits<{
    (e: 'update:dialogState', v: boolean): void
    (e: 'update:dialogUpdate', v: boolean): void
    (e: 'update:dialogDeleteAllState', v: boolean): void
}>()


const message = useMessage()
const authStore = loginStore()
const roleFormInstance = ref<FormInstance>()
const roleUpdateFormInstance = ref<FormInstance>()
const roleRef = ref<RoleReq>({
    name: '',
    code: '',
    createdBy: authStore.user?.username
})
const editRole = ref<RoleUpdateReq>({
    roleId: "",
    name: "",
    status: 1
})
const roleRules: FormRules<RoleReq> = {
    name: [
        { required: true, message: 'Please Enter Name', trigger: 'blur' },
        {
            min: 5,
            max: 30,
            message: 'Name should be 5 length at least',
            trigger: 'blur',
        },
    ],
    code: [
        { required: true, message: 'Please Enter Code', trigger: 'blur' },
    ]
}


const handleOpenEmitState = (value: boolean) => emit('update:dialogState', value)
const handleOpenEmitUpdateState = (value: boolean) => { emit('update:dialogUpdate', value)}
const handleOpenEmitDeleteState = (value: boolean) => emit('update:dialogDeleteAllState', value)
const handleCloseUpdateDialog = () => emit('update:dialogUpdate', false)
const handleCloseDialog = () => emit('update:dialogState', false)
const handleCloseDeleteAllDialog = () => emit('update:dialogDeleteAllState', false)

const handleRoleAdd = async () => {
    if (!roleFormInstance.value) return
    roleFormInstance.value.validate()

    const resp = await roleAdd(roleRef.value);
    if (resp.code === 201) {
        emit('update:dialogState', false)
        return message.messageBox(resp.message, "success")
    }
    return message.messageBox(resp.message, "error")
}
const handleRoleEdit = async () => {
    if (!roleUpdateFormInstance.value) return
    const resp = await roleUpdate(
        editRole.value.roleId, {
        name:editRole.value.name,
        status: editRole.value.status
    })
    switchStatusCode(resp.code, resp.message)
}
const handleRoleDeleteAll = async () => {
    const roleIds = prop.selectedRoleIds
    const deleteAll = await roleDeleteAll(roleIds)
    switchStatusCode(deleteAll.code, deleteAll.message)
}

/* watch updateRole  */
watch( 
    () => prop.roleUpdateRef,
    (value)=> {
        editRole.value = { ... value}
    },
    {immediate : true} // watch callback
    
)
</script>

<style lang="scss" scoped></style>