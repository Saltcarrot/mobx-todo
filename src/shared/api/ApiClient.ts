import { EMethods, IApiRequestOptions } from '../models'

export class ApiClient {
	static get<Res>(url: string) {
		return this.makeRequest<Res>(url)
	}

	static post<Res>(url: string, body: BodyInit) {
		return this.makeRequest<Res>(url, { method: EMethods.POST, body })
	}

	static put<Res>(url: string, body: BodyInit) {
		return this.makeRequest<Res>(url, { method: EMethods.PUT, body })
	}

	static patch<Res>(url: string, body: BodyInit) {
		return this.makeRequest<Res>(url, { method: EMethods.PATCH, body })
	}

	static update<Res>(url: string, body: BodyInit) {
		return this.makeRequest<Res>(url, { method: EMethods.UPDATE, body })
	}

	static delete<Res>(url: string, body: BodyInit) {
		return this.makeRequest<Res>(url, { method: EMethods.DELETE, body })
	}

	private static makeRequest<Res>(
		url: string,
		options: IApiRequestOptions = { method: 'GET' as EMethods }
	) {
		return fetch(url, options).then(resp => this.handleResponse<Res>(resp))
	}

	private static handleResponse<Res>(response: Response) {
		return this.delayResponse().then(() => {
			return (response.json() as Promise<Res>).then(r => {
				if (response.ok) return r
				else return this.handleErrorResponse(response.statusText)
			})
		})
	}

	private static handleErrorResponse(error: string) {
		return Promise.reject(error)
	}

	private static delayResponse() {
		return new Promise<unknown>(resolve => setTimeout(resolve, 300))
	}
}