import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'
import axios from 'axios'
import { merge } from 'lodash'

import type { HttpClient } from '@/models/http-client.model'
import type { HttpRequestParams } from '@/models/http-client.model'
import appConfigs from '@/configs'

interface ErrorResponseData {
  message: string
}

class Http implements HttpClient {
  options: {
    baseURL: string
    headers: AxiosRequestHeaders
    params: { key: string }
  }

  axiosInstance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.options = {
      baseURL: config.baseURL || '',
      headers: {
        ...config.headers,
        'Content-Type': 'application/json'
      } as AxiosRequestHeaders,
      params: { key: appConfigs.apiKey }
    }

    this.axiosInstance = axios.create(this.options)
  }

  get<T, D>(parameters: HttpRequestParams<D>, options?: AxiosRequestConfig): Promise<T> {
    // Set extral config options
    const mergedOptions = options ? merge({}, this.options, options) : this.options
    return new Promise<T>((resolve, reject) => {
      const { path, token } = parameters

      if (token) {
        mergedOptions.headers.Authorization = `Bearer ${token}`
      }
      this.axiosInstance
        .get(path, mergedOptions)
        .then((response: AxiosResponse) => {
          resolve(response.data)
        })
        .catch((error: AxiosError<ErrorResponseData>) => {
          const message = error.response?.data?.message || error.message
          reject(message)
        })
    })
  }
}


export const http = new Http(appConfigs)