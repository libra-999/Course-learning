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
                <ButtonGlobal class=" bg-yellow-400 hover:bg-yellow-500 px-5 text-white" value="添加"
                    @click="handleOpenDialog">
                    <template #icon-right>
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </template>
                </ButtonGlobal>
                <ButtonGlobal class=" bg-red-500 hover:bg-red-600 px-5 text-white" value="删除">
                    <template #icon-right>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </template>
                </ButtonGlobal>
            </div>
            <!-- Table Display -->
            <el-table row-key="id" :data="pageData" default-expand-all table-layout="auto" style="width: 100%">
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
                                <ButtonGlobal class="text-white" value="添加">
                                    <template #icon-left>
                                        <el-icon>
                                            <Plus />
                                        </el-icon>
                                    </template>
                                </ButtonGlobal>
                                <ButtonGlobal class="bg-orange-400  text-white hover:bg-orange-500" value="编辑">
                                    <template #icon-left>
                                        <el-icon>
                                            <Edit />
                                        </el-icon>
                                    </template>
                                </ButtonGlobal>
                                <ButtonGlobal class="bg-orange-400 text-white hover:bg-orange-500" value="分配" @click="handleOpenRolePermissionDrawer(scope.row.id)">
                                    <template #icon-left>
                                        <el-icon>
                                            <EditPen />
                                        </el-icon>
                                    </template>
                                </ButtonGlobal>
                                <ButtonGlobal class="bg-red-600 text-white hover:bg-red-700" value="删除">
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
    <RolePermissionView v-model="rolePermissionDrawerVisible" :role-id="getId"/>
    <!-- Dialog Form -->
    <el-dialog v-model="dialogState" width="500" @closed="handleCloseDialog">
        <div>Form</div>
    </el-dialog>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue';
import { rolePage } from '@/modules/api/role';
import type { QueryParams, RoleItem, RoleQueryParam } from '@/modules/types/role';
import RolePermissionView from '@/modules/view/table/RolePermissionView.vue';
import { Delete, Edit, EditPen, Plus, Refresh, Search } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { onMounted, ref, watch } from 'vue';

/* Ref */
const roleQueryFormRef = ref<FormInstance>()
const roleFormRef = ref<FormInstance>()
const getId = ref<RoleItem['id']| null>(null)

/* Model */
const roleQueryParam = ref<RoleQueryParam>({
    keyword: '',
    status: undefined
})

/* Variable */
const pageData = ref<RoleItem[]>()
const rolePermissionDrawerVisible = ref(false)

const loading = ref(false)
const dialogState = ref(false)
const queryParams = ref<QueryParams>({
    page: 1,
    size: 10,
    sort: "desc"
})

/* event manage*/
const handleQuery = async () => {
    queryParams.value.page = 1
    await fetchData()
}
const handleResetQuery = async () => {
    roleQueryFormRef.value?.resetFields();
    await fetchData()
}
const handleOpenDialog = () => {
    dialogState.value = true

}
const handleCloseDialog = () => {
    dialogState.value = false
}
async function fetchData() {
    const getPage = await rolePage(queryParams.value.page, queryParams.value.size, queryParams.value.sort, roleQueryParam.value.keyword, roleQueryParam.value.status)
    if (getPage.data.code === 200) {
        pageData.value = getPage.data.data
    }
    return pageData
}
const handleOpenRolePermissionDrawer = (id: RoleItem['id'])=>{
    getId.value = id
    rolePermissionDrawerVisible.value = true
}

/* watch data change */
onMounted(() => {
    fetchData()
})

</script>

<style scoped>
.table-container .table-section {
    background-color: var(--table-bg-color);
}
</style>