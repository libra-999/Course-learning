export const httpConstant = {
	CREATED: { code: 201, message: 'Created' },
	SUCCESS: { code: 200, message: 'Succeed' },
	ERROR_BAD_REQUEST: { code: 400, message: 'Bad Request' },
	ERROR_UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
	ERROR_FORBIDDEN: { code: 403, message: 'Forbidden' },
	ERROR_NOT_FOUND: { code: 404, message: 'Not Found' },
	ERROR_REQUEST_MANY: { code: 429, message: 'Request Many times' },
	ERROR_REQUEST_LONG: { code: 431, message: 'Request Header field too large' },
	ERROR_INTERNAL: { code: 500, message: 'Internal Server' },
}
