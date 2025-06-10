// To do user-oriented activities

import axios from 'axios'

const API_URL = process.env.API_URL + '/user'
axios.defaults.withCredentials = true


class UserService {
    async updateName (user) {
        const formData = new FormData()
        formData.append('id', user.id)
        formData.append('firstName', user.fname)
        formData.append('lastName', user.lname)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/changeName',
            data: formData,
            headers: { 'Content-Type' : 'multipart/form-data' }
        })
        if (response.status === 200){
            return { isError: response.data.error, message: response.data.message }
        } else if (response.status === 401) {
            localStorage.removeItem('user')
            return false
        }
    }

    async updateEmail (user) {
        const formData = new FormData()
        formData.append('id', user.id)
        formData.append('email', user.email)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/changeEmail',
            data: formData,
            headers: { 'Content-Type' : 'multipart/form-data' }
        })
        if (response.status === 200){
            return { isError: response.data.error, message: response.data.message }
        } else if (response.status === 401) {
            localStorage.removeItem('user')
            return false
        }
    }

    async updatePassword (user) {
        const formData = new FormData()
        formData.append('id', user.id)
        formData.append('oldPassword', user.oldPass)
        formData.append('newPassword', user.newPass)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/changePassword',
            data: formData,
            headers: { 'Content-Type' : 'multipart/form-data' }
        })
        if (response.status === 200){
            return { isError: response.data.error, message: response.data.message }
        } else if (response.status === '401') {
            localStorage.removeItem('user')
            return false
        }
    }

    async updateUser (id) {
        const formData = new FormData()
        formData.append('id', id)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/updateUser',
            data: formData,
            headers: { 'Content-Type' : 'multipart/form-data' }
        })
        if (response.status === 200){
            if (response.data.isError) {
                return { isError: response.data.error, message: response.data.message }
            } else {
                await localStorage.setItem('user', response.data.user)
                return { isError: response.data.error, user: response.data.user }
            }
        } else if (response.status === 401) {
            localStorage.removeItem('user')
            return false
        }
    }

    async promoteUser (user) {
        const formData = new FormData()
        formData.append('id', user.id)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/upgradeUser',
            data: formData,
            headers: { 'Content-Type' : 'multipart/form-data' }
        })
        if (response.status === 200) { 
            return { isError: response.data.error, message: response.data.message }
        } else { return false }
    }

    async demoteUser (user) {
        const formData = new FormData()
        formData.append('id', user.id)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/downgradeUser',
            data: formData,
            headers: { 'Content-Type' : 'multipart/form-data' }
        })
        if (response.status !== 200) { return false } else {
            return { isError: response.data.error, message: response.data.message }
        }
    }

    async getAllUsers () {
        const response = await axios({
            method: 'GET',
            url: API_URL + '/getAllUsers'
        })
        if (response.status !== 200) { return false } else {
            if (response.data.error) {
                return { isError: response.data.error, message: response.data.message }
            }
            return { isError: response.data.error, users: response.data.users }
        }
    }

    async deleteUser (user) {
        const formData = new FormData()
        formData.append('id', user.id)
        const response = await axios({
            method: 'POST',
            url: API_URL + '/removeUser',
            data: formData,
            headers: { 'Content-Type' : 'multipart/form-data' }
        })
        if (response.status === 200){
            return { isError: response.data.error, message: response.data.message }
        } else if (response.status === 401) {
            localStorage.removeItem('user')
            return false
        } else {
            return false
        }
    }
}

export default new UserService()