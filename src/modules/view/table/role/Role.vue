<template>
    <div class="table-container">
        <div class="table-filter-select flex justify-start">
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
            <Loading class="m-auto" v-if="loading" />
            <el-table v-else row-key="id" :data="pageData" default-expand-all table-layout="auto" style="width: 100%"
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
                    <el-table-column prop="createdAt" width="200" label="创建时间" align="center">
                        <template #default="scope">
                            {{ dayMonthFormat(scope.row.createdAt) }}
                        </template>
                    </el-table-column>
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
    <DialogForm :role-update-ref="roleUpdateRef" :selected-role-ids="selectedRoleIds" v-model:dialog-state="dialogState"
        v-model:dialog-update="dialogUpdate" v-model:dialog-delete-all-state="dialogDeleteAllState" />
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue';
import Loading from '@/app/components/Loading.vue';
import { dayMonthFormat } from '@/app/utils/dateFormat';
import { switchStatusCode, useMessage } from '@/app/utils/message';
import { roleDelete, rolePage } from '@/modules/api/role';
import { type RoleUpdateReq, type QueryParams, type RoleItem, type RoleQueryParam } from '@/modules/types/role';
import DialogForm from '@/modules/view/table/role/DialogForm.vue';
import RolePermissionView from '@/modules/view/table/role/RolePermissionView.vue';
import { Delete, Edit, EditPen, Plus, Refresh, Search } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';

/* Ref */
const roleQueryFormRef = ref<FormInstance>()
const getId = ref<RoleItem['id'] | null>(null)

/* Model */
const roleQueryParam = ref<RoleQueryParam>({
    keyword: '',
    status: 1
})
const roleUpdateRef = ref<RoleUpdateReq>({
    roleId: "",
    name: "",
    status: 1
})


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
    loading.value = true
    await handleFetchData().finally(() => loading.value = false)
}
const handleResetQuery = async () => {
    roleQueryFormRef.value?.resetFields();
    await handleFetchData()
}
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
const handleSelectionChange = (rows: RoleItem[]) => { selectedRoleIds.value = rows.map((item) => item.id) } // check ids selected
const handleFetchData = async () => {
    loading.value = true
    const getPage = await rolePage(queryParams.value.page, queryParams.value.size, queryParams.value.sort, roleQueryParam.value.keyword, roleQueryParam.value.status)
    if (getPage.data.code === 200) {
        pageData.value = getPage.data.data
        selectedRoleIds.value = []
        loading.value = false
    }
    return pageData
}
const handleRoleDelete = async (id: string) => {
    const remove = await roleDelete(id);
    switchStatusCode(remove.code, remove.message)
}

/* watch data change */
onMounted(() => {
    handleFetchData()
})

</script>

<style lang="scss" scoped>
.table-container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin: auto;
    padding: 0.1rem 0.2rem;

    & .table-filter-select {
        width: 100%;
        padding: 20px 0 5px 30px;
        background-color: var(--table-bg-color);
        border: 1px whitesmoke;

        & .search-input .el-form-item__wrapper {
            margin-right: 0;
            background-color: gray;
        }

        & .search-item .el-form-item__label {
            color: white;
        }
    }
}

.table-filter-select .table-filter-select .table-container .table-section {
    background-color: var(--table-bg-color);
}

@media (max-width: $screen-sm) {
    .table-container {
        @include mobile-responsive(100%, 100%, null, null);
        gap: 0;

        .table-filter-select {
            padding: 10px 0 0 0;
            width: 100%;
            flex-wrap: nowrap;

            .search-item {
                min-width: 0;
                margin-right: 0 !important;

                :deep(.el-form-item__label) {
                    color: white;
                    font-weight: 600;
                    padding: 0 10px;
                }
            }

            :deep(.el-form-item:last-child, .el-form-item__content) {
                width: 100%;
                margin: 0;
                padding: 0.2rem 0 0.5rem 0;
            }
        }
    }
}
</style>
