import axios from 'axios';

export const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage?.getItem('token') || '{}'
        return JSON.parse(token)
    }

    return {}
}

export const http = axios.create({
    baseURL: `http://146.190.50.2:8069/highnox`,
    // withCredentials: true,
});

// http.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const response = error.response
//         if (response.status === 401 && response.config.url !== 'login') {
//             window.location.replace('/login')
//         }
//         return Promise.reject(error)
//     }
// )

// http.interceptors.request.use((config) => {
//     const token = getToken()
//     if (token && 'login' !== config.url) {
//         // config.headers.Authorization = `bearer ${profile.accessToken}`
//         config.headers.Authorization = `${token}`
//     }
//     return config
// })