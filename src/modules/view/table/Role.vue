<template>
    <div class="table-container">
        <div class="table-filter-select">
            <el-form :ref="roleQueryFormRef" :model="roleQueryParam" :inline="true">
                <!-- Search  -->
                <el-form-item class="search-item" label="搜索" prop="keyword">
                    <el-input v-model="roleQueryParam.keyword" placeholder="按名称搜索角色" @keyup.enter="handleQuery"
                        class="search-input" />
                </el-form-item>
                <!-- Status -->
                <el-form-item class="search-item" label="地位" prop="status">
                    <el-select v-model="roleQueryParam.status" class="search-input" placeholder="空状态" clearable
                        style="width: 100px;">
                        <el-option :value="1" label="积极的" />
                        <el-option :value="0" label="不活跃" />
                    </el-select>
                </el-form-item>
                <!-- button action -->
                <el-form-item>
                    <ButtonGlobal class="text-white px-5" value="寻找" @click.prevent="handleQuery">
                        <template #icon-left>
                            <el-icon>
                                <Search />
                            </el-icon>
                        </template>
                    </ButtonGlobal>
                    <ButtonGlobal class="text-white bg-gray-500 px-5 hover:bg-gray-600" value="重置"
                        @click.prevent="handleResetQuery">
                        <template #icon-left>
                            <el-icon>
                                <Refresh />
                            </el-icon>
                        </template>
                    </ButtonGlobal>
                </el-form-item>
            </el-form>
        </div>
        <el-card shadow="hover" class="table-section">
            <div class="flex mb-5">
                <!-- Form Action  -->
                <ButtonGlobal class=" bg-blue-400 hover:bg-blue-500 px-5 text-white" value="添加"
                    @click="handleOpenDialog">
                    <template #icon-right>
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </template>
                </ButtonGlobal>
                <ButtonGlobal class=" bg-red-500 hover:bg-red-600 px-5 text-white" value="删除"
                    @click="handleOpenDeleteAllDialog">
                    <template #icon-right>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </template>
                </ButtonGlobal>
            </div>
            <!-- Table Display -->
            <el-table row-key="id" :data="pageData" default-expand-all table-layout="auto" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column>
                    <el-table-column type="selection" align="center" />
                    <el-table-column prop="name" label="用户名" align="center" />
                    <el-table-column prop="code" label="代码键" align="center" />
                    <el-table-column prop="status" label="地位" align="center">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status == 1" type="success" align="center">正常</el-tag>
                            <el-tag v-else type="info">禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建时间" align="center" />
                    <el-table-column min-width="260" label="操作" align="center" class-name="action-table">
                        <template #default="scope">
                            <div class="flex gap-1.5">
                                <ButtonGlobal class="bg-orange-400  text-white hover:bg-orange-500" value="编辑"
                                    @click="handleOpenUpdateDialog(scope.row.id)">
                                    <template #icon-left>
                                        <el-icon>
                                            <Edit />
                                        </el-icon>
                                    </template>
                                </ButtonGlobal>
                                <ButtonGlobal class="bg-yellow-400 text-white hover:bg-yellow-500" value="分配"
                                    @click="handleOpenRolePermissionDrawer(scope.row.id)">
                                    <template #icon-left>
                                        <el-icon>
                                            <EditPen />
                                        </el-icon>
                                    </template>
                                </ButtonGlobal>
                                <ButtonGlobal class="bg-red-600 text-white hover:bg-red-700" value="删除"
                                    @click="handleRoleDelete(scope.row.id)">
                                    <template #icon-left>
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </template>
                                </ButtonGlobal>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </el-card>
    </div>

    <!-- RolePermission Page -->
    <RolePermissionView v-model="rolePermissionDrawerVisible" :role-id="getId" />

    <!-- Dialog Form -->
    <el-dialog v-model="dialogState" width="500" @closed="handleCloseDialog">
        <el-form ref="roleFormInstance" :rules="roleRules" :model="roleRef">
            <el-form-item prop="name">
                <label class="font-bold">用名</label>
                <el-input v-model="roleRef.name" name="name" type="text" placeholder="输入角色名称" />
            </el-form-item>
            <el-form-item prop="code">
                <label class="font-bold">代码</label>
                <el-input v-model="roleRef.code" type="text" name="code" placeholder="输入角色代码" />
            </el-form-item>
            <ButtonGlobal @click.prevent="handleRoleAdd" class="text-white" value="提交" />
        </el-form>
    </el-dialog>

    <!-- Dialog Update Form -->
    <el-dialog v-model="dialogUpdate" width="500" @closed="handleCloseUpdateDialog">
        <el-form ref="roleUpdateFormInstance" :model="roleUpdateRef">
            <el-form-item prop="name">
                <label class="font-bold">用名</label>
                <el-input v-model="roleUpdateRef.name" name="name" type="text" placeholder="输入角色名称" />
            </el-form-item>
            <el-form-item prop="status">
                <label class="font-bold mr-2">状态</label>
                <el-radio-group v-model="roleUpdateRef.status">
                    <el-radio :value="1">正常</el-radio>
                    <el-radio :value="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <ButtonGlobal @click.prevent="handleRoleEdit" class="text-white" value="节省" />
        </el-form>
    </el-dialog>

    <!-- Dialog Delete All Form -->
    <el-dialog v-model="dialogDeleteAllState" title="删除所有角色" width="500" :before-close="handleCloseDeleteAllDialog">
        <p class="text-start">您确定删除所有角色吗？ 但要确保所有这些角色都不允许!</p>
        <template #footer>
            <div class="flex justify-end">
                <ButtonGlobal @click="handleCloseDeleteAllDialog" class="text-white" value="取消" />
                <ButtonGlobal class="bg-red-500 text-white" @click="handleRoleDeleteAll" value="确认" />
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue';
import { useMessage } from '@/app/utils/message';
import { roleAdd, roleDelete, roleDeleteAll, rolePage, roleUpdate } from '@/modules/api/role';
import { loginStore } from '@/modules/store/auth';
import { type RoleUpdateReq, type QueryParams, type RoleItem, type RoleQueryParam, type RoleReq } from '@/modules/types/role';
import RolePermissionView from '@/modules/view/table/RolePermissionView.vue';
import { Delete, Edit, EditPen, Plus, Refresh, Search } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, ref } from 'vue';

/* Ref */
const roleQueryFormRef = ref<FormInstance>()
const roleFormInstance = ref<FormInstance>()
const roleUpdateFormInstance = ref<FormInstance>()
const authStore = loginStore()
const getId = ref<RoleItem['id'] | null>(null)

/* Model */
const roleQueryParam = ref<RoleQueryParam>({
    keyword: '',
    status: 1
})
const roleRef = ref<RoleReq>({
    name: '',
    code: '',
    createdBy: authStore.user?.username
})
const roleUpdateRef = ref<RoleUpdateReq>({
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

/* Variable */
const pageData = ref<RoleItem[]>()
const rolePermissionDrawerVisible = ref(false)
const loading = ref(false)
const message = useMessage()
const dialogState = ref(false)
const dialogDeleteAllState = ref(false)
const dialogUpdate = ref(false)
const selectedRoleIds = ref<string[]>([])
const queryParams = ref<QueryParams>({
    page: 1,
    size: 10,
    sort: "desc"
})

/* action event*/
const handleQuery = async () => {
    queryParams.value.page = 1
    await handleFetchData()
}
const handleResetQuery = async () => {
    roleQueryFormRef.value?.resetFields();
    await handleFetchData()
}
const handleCloseUpdateDialog = () => { dialogUpdate.value = false }
const handleOpenUpdateDialog = (id: string) => {
    const row = pageData.value?.find((i) => i.id === id)
    if (!row) return;
    roleUpdateRef.value = {
        roleId: id,
        name: row.name,
        status: row.status,
    }
    dialogUpdate.value = true
}
const handleOpenDialog = () => { dialogState.value = true }
const handleOpenDeleteAllDialog = () => {
    if (!selectedRoleIds.value.length) {
        return message.notificationBox("Empty ids selected!", "warning")
    }
    dialogDeleteAllState.value = true
}
const handleOpenRolePermissionDrawer = (id: RoleItem['id']) => {
    getId.value = id
    rolePermissionDrawerVisible.value = true
}
const handleCloseDialog = () => { dialogState.value = false }
const handleCloseDeleteAllDialog = () => { dialogDeleteAllState.value = false }
const handleSelectionChange = (rows: RoleItem[]) => { selectedRoleIds.value = rows.map((item) => item.id) } // check ids selected
const handleFetchData = async () => {
    const getPage = await rolePage(queryParams.value.page, queryParams.value.size, queryParams.value.sort, roleQueryParam.value.keyword, roleQueryParam.value.status)
    if (getPage.data.code === 200) {
        pageData.value = getPage.data.data
        selectedRoleIds.value = []
    }
    return pageData
}
const handleRoleAdd = async () => {
    if (!roleFormInstance.value) return
    roleFormInstance.value.validate()

    const resp = await roleAdd(roleRef.value);
    if (resp.code === 201) {
        handleFetchData()
        dialogState.value = false
        return message.messageBox(resp.message, "success")
    }
    return message.messageBox(resp.message, "error")
}
const handleRoleDelete = async (id: string) => {
    const remove = await roleDelete(id);
    switch (remove.code) {
        case 200:
            {
                message.messageBox("Deleted !", "success")
                break;
            }
        case 32:
            {
                message.messageBox(remove.message, "error")
                break;
            }
        default:
            message.messageBox("Something wrong!", "error")
            break
    }

}
const handleRoleEdit = async () => {
    if (!roleUpdateFormInstance.value) return

    const resp = await roleUpdate(
        roleUpdateRef.value.roleId, {
        name: roleUpdateRef.value.name,
        status: roleUpdateRef.value.status
    })

    if (resp.code === 200) {
        return message.messageBox(resp.message, "success")
    } else {
        return message.messageBox(resp.message, "error")
    }
}
const handleRoleDeleteAll = async () => {
    const roleIds = selectedRoleIds.value
    const deleteAll = await roleDeleteAll(roleIds)
    if (deleteAll.code === 200) {
        await handleFetchData()
        handleCloseDeleteAllDialog()
        message.messageBox(deleteAll.message, "success")
    } else {
        message.messageBox(deleteAll.message, "error")

    }
}

/* watch data change */
onMounted(() => {
    handleFetchData()
})

</script>

<style scoped>
.table-container .table-section {
    background-color: var(--table-bg-color);
}
</style>
