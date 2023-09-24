import axios, { AxiosError } from 'axios'
import { BASE_URL } from '../utils/config'


export default function requestApi(endpoint: string, method: string, body: unknown, responseType: 'json' | 'text' = 'json') {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    const instance = axios.create({ headers });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token')
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config;
        },
        (error) => {
            return Promise.reject(error)
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {
            const originalConfig = error.config;
            if (error.response && error.response.status === 401) {
                try {
                    const result = await instance.post(`${BASE_URL}auth/refresh-token`, {
                        refresh_token: localStorage.getItem('refresh_token')
                    })
                    console.log(result);
                    const { accessToken, refreshToken } = result.data;
                    localStorage.setItem('access_token', accessToken)
                    localStorage.setItem('refresh_token', refreshToken)
                    originalConfig.headers['Authorization'] = `Bearer ${accessToken}`

                    return instance(originalConfig)

                } catch (error) {
                    const err = error as Error | AxiosError;
                    if (axios.isAxiosError(err)) {
                        if (err.response && err.response.status === 400) {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('refresh_token')
                            localStorage.removeItem('inforUser')
                            window.location.href = '/login'
                        }
                        return Promise.reject(err)
                    }
                }
            }
            return Promise.reject(error)
        }
    )

    return instance.request({
        method: method,
        url: `${BASE_URL}${endpoint}`,
        data: body,
        responseType: responseType
    })
}