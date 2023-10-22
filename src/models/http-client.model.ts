import type { AxiosRequestConfig } from 'axios'


export interface HttpRequestParams<D> {
    path: string
    payload?: D
    token?: string
    queryParams?: { [key: string]: any } | null
}

export interface HttpClient {
    get<T, D>(parameters: HttpRequestParams<D>, options?: AxiosRequestConfig): Promise<T>
}

