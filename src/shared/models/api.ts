export interface IApiResponse<T> {
	success: boolean
	error: string
	data: T
}

export enum EMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE'
}

export interface IApiRequestOptions extends Omit<RequestInit, 'body'>{
	method?: EMethods
	body?: object
}