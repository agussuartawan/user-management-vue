import axios from 'axios'
import { useCookies } from '@vueuse/integrations/useCookies'
import userSession from '@/utils/Session'

const session = userSession
const baseURL = 'http://localhost:8179'
const axiosInstance = axios.create({
    baseURL: baseURL
})
axiosInstance.defaults.headers.common['Authorization'] = ` Bearer ${session.accessToken}`

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const originalRequest = error.config

        if (error.response.data.message != null) {
            if (error.response.data.message.includes('JWT_IS_EXPIRED')) {
                // Coba mendapatkan token baru
                return axios
                    .post(`${baseURL}/api/v1/auth/refresh-token-login`, {
                        refreshToken: session.refreshToken,
                        ipAddress: window.location.hostname
                    })
                    .then((res) => {
                        // Jika berhasil, perbarui token di local storage atau di mana pun Anda menyimpannya
                        const data = res.data
                        const cookies = useCookies()
                        cookies.set('session', {
                            refreshToken: data.refreshToken,
                            accessToken: data.accessToken,
                            fullName: data.fullName,
                            roles: data.roles.join(','),
                            permissions: data.permissions.join(',')
                        })

                        // Perbarui token di header permintaan original
                        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
                        // Lakukan permintaan ulang dengan token yang diperbarui
                        return axiosInstance(originalRequest)
                    })
                    .catch((error) => {
                        console.error(error.response)
                        return Promise.reject(error)
                    })
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
