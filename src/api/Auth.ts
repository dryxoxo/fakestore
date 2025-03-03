import { AxiosError } from "axios";
import axios from "./axios"

export const login = async (username: string, password: string) => {
    try {
        const result = await axios.post('/auth/login', {
            username,
            password
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
        return result
    } catch (e) {
        const error = e as AxiosError;
        throw error
    }
}

export const register = async (username: string, password: string, email: string) => {
    try {
        const result = await axios.post('/users', {
            username,
            email,
            password
        },{
            headers: {'Content-Type': 'application/json'}
        })
        return result
    } catch (e) {
        const error = e as AxiosError;
        throw error
    }
}

export const getUser = async (id: number) => {
    try {
        const result = await axios.get(`/users/${id}`)
        return result
    } catch (e) {
        const error = e as AxiosError;
        throw error
    }
}