import axios from 'axios'
import { LOCAL_HOST } from './consts'
import { getJwtToken } from './auth/lib/jwt'

export const API_BASE_URL = `${LOCAL_HOST}/api`

export const $api = axios.create({ baseURL: API_BASE_URL })
export const $authApi = axios.create({ baseURL: API_BASE_URL })

$authApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getJwtToken()}`
    return config
})
