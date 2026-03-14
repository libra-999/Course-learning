import { httpConstant } from '@/domain/constant/httpConstant.js'

export interface SuccessResp<T = any> {
	code: number
	message?: string
	data: T
	pagination?: Pagination
}

export interface ErrorResp {
	code: number
	message?: string
	errorType?: string
}

export interface Pagination {
	totalPage: number
	total: number
	page: number
	size: number
	sort?: string | 'desc'
}

// created resp
export const createdResp = <T>(
	data: T,
	code =  httpConstant.CREATED.code,
	message = httpConstant.CREATED.message,

): SuccessResp<T> => {
	return {
		code,
		message,
		data,
	}
}
// success resp
export const successResp = <T>(
	data: T,
	code=  httpConstant.SUCCESS.code,
	message = httpConstant.SUCCESS.message,
): SuccessResp<T> => {
	return {
		code,
		message,
		data,
	}
}
// paging resp
export const pagingResp = <T>(
	data: T[],
	pagination: Pagination,
	code = httpConstant.SUCCESS.code,
	message = httpConstant.SUCCESS.message,
): SuccessResp<T[]> => {
	return {
		code,
		message,
		data,
		pagination,
	}
}
export const errorResp = (
	code: number,
	message: string,
	errorType: string,
): ErrorResp => {
	return {
		code,
		message,
		errorType,
	}
}
