import { AxiosError } from "axios";
import axios from "./axios"

export const getCart = async (idUser: number) => {
    try {
        const result = await axios.get(`carts/${idUser}`)
        return result
    } catch (e) {
        const error = e as AxiosError;
        throw error
    }
}