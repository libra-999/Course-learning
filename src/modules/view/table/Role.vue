<template>
    <div class="table-container">
        <div class="table-filter-select">
            <el-form :ref="roleQueryFormRef" :model="roleQueryParam" :inline="true">
                <!-- Search  -->
                <el-form-item class="search-item" label="Search" prop="keyword">
                    <el-input v-model="roleQueryParam.keyword" placeholder="search role by name"
                        @keyup.enter="handleQuery" class="search-input" />
                </el-form-item>
                <!-- Status -->
                <el-form-item class="search-item" label="Status" prop="status">
                    <el-select v-model="roleQueryParam.status" class="search-input" placeholder="status" clearable
                        style="width: 100px;">
                        <el-option :value="1" label="Active" />
                        <el-option :value="0" label="Inactive" />
                    </el-select>
                </el-form-item>
                <!-- button action -->
                <el-form-item>
                    <ButtonGlobal class="text-white px-5" value="Find" @click.prevent="handleQuery">
                        <template #icon-left>
                            <el-icon>
                                <Search />
                            </el-icon>
                        </template>
                    </ButtonGlobal>
                    <ButtonGlobal class="text-white bg-gray-500 px-5 hover:bg-gray-600" value="Reset"
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
                <ButtonGlobal class=" bg-yellow-400 hover:bg-yellow-500 px-5 text-white" value="Add"
                    @click="handleOpenDialog">
                    <template #icon-right>
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </template>
                </ButtonGlobal>
                <ButtonGlobal class=" bg-red-500 hover:bg-red-600 px-5 text-white" value="Delete">
                    <template #icon-right>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </template>
                </ButtonGlobal>
            </div>
            <!-- Table Display -->
            <el-table row-key="id" default-expand-all>
                <el-table-column>
                    <el-table-column type="selection" align="center"/>
                    <el-table-column prop="name" label="Name" align="center"/>
                    <el-table-column prop="code" label="Code" align="center"/>
                    <el-table-column prop="status" label="Status" align="center">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status == 1" type="success" align="center">正常</el-tag>
                            <el-tag v-else type="info">禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Action" align="center">
                        <template>
                            <el-button type="primary" link size="small" icon="plus">
                                Add
                            </el-button>
                            <el-button  type="primary" link size="small" icon="edit">
                                Edit
                            </el-button>
                            <el-button  type="primary" link size="small" icon="edit">
                                Assign Permission
                            </el-button>
                            <el-button v-hasPerm="['sys:dept:delete']" type="danger" link size="small" icon="delete">
                                Delete 
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
    <!-- Dialog Form -->
    <el-dialog v-model="dialogState" width="500" @closed="handleCloseDialog">
        <div>Form</div>
    </el-dialog>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue';
import type { RoleQueryParam } from '@/modules/types/role';
import { Delete, Plus, Refresh, Search } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { ref } from 'vue';

/* Ref */
const roleQueryFormRef = ref<FormInstance>()
const roleFormRef = ref<FormInstance>()

/* Model */
const roleQueryParam = ref<RoleQueryParam>({
    keyword: '',
    status: undefined
})

/* Variable */
const roles = ref()
const roleWithPermission = ref();
const loading = ref(false)
const dialogState = ref(false)

/* event manage*/
const handleQuery = () => {
    console.log(roleQueryParam.value)
}
const handleResetQuery = () => {
    roleQueryFormRef.value?.resetFields();
    console.log(roleQueryParam.value)
}
const handleOpenDialog = () => {
    dialogState.value = true

}
const handleCloseDialog = () => {
    dialogState.value = false
}
</script>

<style scoped>
.table-container .table-section {
    background-color: var(--table-bg-color);
}
</style>