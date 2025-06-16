// Authentication handler

import axios from 'axios'

const API_URL = process.env.API_URL + '/auth'
axios.defaults.withCredentials = true

class AuthService {
    async authenticate () {
        const response = await axios.post(API_URL + '/authenticate')
        if (response.status === 401) {
            localStorage.removeItem('user')
        } else if (response.status !== 200 && response.data.error) {
            localStorage.removeItem('user')
            return { isError: response.data.error, message: response.data.message }
        } else {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return { isError: response.data.error, user: response.data.user }
        }
    }

    async login (user) {
        const formData = new FormData()
        formData.append('email', user.email)
        formData.append('password', user.password)
        formData.append('remember', user.remember)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/login',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (response.data.error) {
            return { isError: response.data.error,  message: response.data.message }
        } else {
            return { isError: false,  user: response.data.user }
        }
    }

    async logout () {
        const response = await axios.get(API_URL + '/logout')
        if (!response.data.error) {
            localStorage.removeItem('user')
        } 
        return { isError: response.data.error,  message: response.data.message }
    }

    async register (user) {
        const formData = new FormData()
        formData.append('first_name', user.firstName)
        formData.append('last_name', user.lastName)
        formData.append('email', user.email)
        formData.append('password', user.password)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/register',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return { isError: response.data.error,  message: response.data.message }
    }
}

export default new AuthService()