import { Alert } from "react-native";
import { getCart } from "../../api/Cart";
import { getProduct } from "../../api/Products";
import { AxiosError } from "axios";
import { ProductType } from "../types/Product";
import { CartState } from "../../redux/slice/CartSlice";

export const getDataCartUtil = async (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
    setIsLoading(true);
    try {
        const result = await getCart(2);
        const cartData = result.data.products;
        const productIds = cartData.map((p: { productId: number; quantity: number }) => p.productId);

        const productRequests = productIds.map((id: number) => getProduct(id));
        const productResponses = await Promise.allSettled(productRequests);

        const detailedProducts = productResponses
            .filter((res): res is PromiseFulfilledResult<any> => res.status === "fulfilled")
            .map((res, index) => ({
                ...res.value.data,
                quantity: cartData[index].quantity,
            }));

        setProducts(detailedProducts);

    } catch (error) {
        if (error instanceof AxiosError) {
            Alert.alert("Error fetching cart data", error.response?.data || "Unknown error");
            console.log("Dari komponen ========>", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
    } finally {
        setIsLoading(false); 
    }
};

export const getDataCartReducer = async (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
    cartData: CartState[]=[]
) => {
    setIsLoading(true); 
    try {
        const productIds = cartData.map((p: { productId: number; quantity: number }) => p.productId);

        const productRequests = productIds.map((id: number) => getProduct(id));
        const productResponses = await Promise.allSettled(productRequests);

        const detailedProducts = productResponses
            .filter((res): res is PromiseFulfilledResult<any> => res.status === "fulfilled")
            .map((res, index) => ({
                ...res.value.data,
                quantity: cartData[index].quantity,
            }));

        setProducts(detailedProducts);

    } catch (error) {
        if (error instanceof AxiosError) {
            Alert.alert("Error fetching cart data", error.response?.data || "Unknown error");
            console.log("Dari komponen ========>", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
    } finally {
        setIsLoading(false);
    }
}

export const calculateTotalPrice = (products: { price: number; quantity: number }[]): number => {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
};

