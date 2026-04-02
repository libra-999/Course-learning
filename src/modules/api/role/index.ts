import apiRequest from '@/app/utils/request'
import type { RoleReq } from '@/modules/types/role'

/** Role Module */
export async function rolePage(
	page?: number,
	size?: number,
	sort?: string,
	keyword?: string,
	status?: number,
): Promise<any> {
	return await apiRequest.get('api/roles', {
		params: {
			page: page,
			size: size,
			query: keyword,
			sort: sort,
			status: status,
		},
	})
}
export async function rolePermission(id: string): Promise<any> {
	const rolePermission = await apiRequest.get(`api/roles/assign/${id}`)
	return rolePermission.data
}
export async function addPermissionInRole(data: any): Promise<any> {
	return await apiRequest.post('api/roles/assign', data)
}
export async function removePermissionInRole(data: any): Promise<any> {
	return await apiRequest.post('api/roles/assign/remove', data)
}
export async function roleAdd(data: RoleReq): Promise<any> {
	const add = await apiRequest.post('api/roles', data)
	return add.data
}
export async function roleUpdate(
	id: string,
	updateReq: any,
): Promise<any> {
	const update = await apiRequest.put(`api/roles/${id}`, updateReq)
	return update.data
}
export async function roleDelete(id: string): Promise<any> {
	const remove =await apiRequest.delete(`api/roles/${id}`)
	return remove.data
}
export async function roleDeleteAll(roleIds: any) : Promise<any> {
	const removeAll = await apiRequest.delete("api/roles/all", roleIds)
	return removeAll.data
}

/* Permisison Module */
export async function permissionList(): Promise<any> {
	const permissions = await apiRequest.get('api/permissions', {
		params: {
			page: 1,
			size: 10000,
			query: '',
			sort: 'desc',
		},
	})
	return permissions.data
}
