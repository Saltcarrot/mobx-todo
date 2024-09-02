import { EMethods, IApiRequestOptions } from '../models'

export class ApiClient {
	static get<Res>(url: string, options?: Omit<IApiRequestOptions, 'method' | 'body'>) {
		return this.makeRequest<Res>(url, { ...options, method: EMethods.GET })
	}

	static post<Res>(url: string, options: Omit<IApiRequestOptions, 'method'>) {
		return this.makeRequest<Res>(url, { ...options, method: EMethods.POST })
	}

	static put<Res>(url: string, options: Omit<IApiRequestOptions, 'method'>) {
		return this.makeRequest<Res>(url, { ...options, method: EMethods.PUT })
	}

	static patch<Res>(url: string, options: Omit<IApiRequestOptions, 'method'>) {
		return this.makeRequest<Res>(url, { ...options, method: EMethods.PATCH })
	}

	static update<Res>(url: string, options: Omit<IApiRequestOptions, 'method'>) {
		return this.makeRequest<Res>(url, { ...options, method: EMethods.UPDATE })
	}

	static delete<Res>(url: string, options?: Omit<IApiRequestOptions, 'method'>) {
		return this.makeRequest<Res>(url, { ...options, method: EMethods.DELETE })
	}

	private static makeRequest<Res>(
		url: string,
		options: IApiRequestOptions = { method: EMethods.GET, body: {} }
	) {
		switch (options.method) {
			case EMethods.GET: {
				const { body: _, ...rest } = options

				return fetch(url, rest)
					.then(resp => this.handleResponse<Res>(resp))
			}
			default: return fetch(url, {
				...options,
				body: JSON.stringify(options.body)
			}).then(resp => this.handleResponse<Res>(resp))
		}
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