import { AxiosError } from "axios";
import axios from "./axios"

export const getAllProducts = async () => {
    try {
        const result = await axios.get('/products')
        return result
    } catch (e) {
        const error = e as AxiosError;
        throw error
    }
}

export const getProduct = async (idProduct: number) => {
    try {
        const result = await axios.get(`/products/${idProduct}`)
        return result
    } catch (e) {
        const error = e as AxiosError;
        throw error
    }
}

export const getCategories = async () => {
    try {
        const result = await axios.get(`/products/categories`)
        return result
    } catch (e) {
        const error = e as AxiosError;
        throw error
    }
}

export const getProductCategories = async (category: string) => {
    try {
        const result = await axios.get(`/products/category/${category}`)
        return result
    } catch (e) {
        const error = e as AxiosError;
        throw error
    }
}