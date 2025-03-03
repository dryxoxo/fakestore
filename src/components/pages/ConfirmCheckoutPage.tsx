import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../../themes/color'
import { typography } from '../../themes/typography'
import Button from '../atoms/Button'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../navigations/RootType'
import { AxiosError } from 'axios'
import { getCart } from '../../api/Cart'
import { getProduct } from '../../api/Products'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getDataCartReducer } from '../../utils/function/data'

const ConfirmCheckoutPage = () => {

    type Product = {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        rating: {
            rate: number;
            count: number;
        };
        quantity: number;
    };

    const resultRedux = useSelector((state: RootState) => state.CartSlice)
    const navigation = useNavigation<RootStackNavigationProp>();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const goCheckout = () => {
        navigation.navigate('Checkout')
    }

    const goDetail = (idProduct: number) => {
        navigation.navigate('DetailProduct', { idProduct })
    }

    // const getDataCart = async () => {
    //     setIsLoading(true); // Mulai loading
    //     try {
    //         const result = await getCart(2);
    //         const cartData = result.data.products;
    //         const productIds = cartData.map((p: { productId: number; quantity: number }) => p.productId);

    //         const productRequests = productIds.map((id: number) => getProduct(id));
    //         const productResponses = await Promise.allSettled(productRequests);

    //         const detailedProducts = productResponses
    //             .filter((res): res is PromiseFulfilledResult<any> => res.status === "fulfilled") // Pastikan hanya ambil yang sukses
    //             .map((res, index) => ({
    //                 ...res.value.data,
    //                 quantity: cartData[index].quantity,
    //             }));

    //         setProducts(detailedProducts);

    //         console.log('detail');
    //         console.log({ detailedProducts });
    //     } catch (error) {
    //         if (error instanceof AxiosError) {
    //             Alert.alert("Error fetching cart data", error.response?.data || "Unknown error");
    //             console.log("Dari komponen ========>", error.response?.data);
    //         } else {
    //             console.error("Unexpected error:", error);
    //         }
    //     } finally {
    //         setIsLoading(false); // Selesai loading
    //     }
    // };

    // useEffect(() => {
    //     getDataCart()
    // }, [])

        useEffect(() => {
            getDataCartReducer(setIsLoading, setProducts, resultRedux)
        }, [resultRedux])

    const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <SafeAreaView style={{ width: '100%', flex: 1, backgroundColor: color.color.white }}>
            {isLoading ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                <ScrollView style={{ padding: 10, backgroundColor: color.color.Black_06, flex: 1 }}>
                    <View style={{ width: '100%', height: 130, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10, backgroundColor: color.color.white, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, justifyContent: 'space-between' }}>
                        <View style={{ gap: 5 }}>
                            <Text style={[styles.label, { color: color.color.Black_04 }]}>Deliver To</Text>
                            <Text style={[styles.body02, { color: color.color.Black_01 }]}>Ranchview, California</Text>
                        </View>
                        <View style={{ gap: 10 }}>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text>📦</Text>
                                <Text style={[styles.label, { color: color.color.Black_02 }]}>Delivery by wed, Feb 2 - Fri 4, 2022</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text>⏎</Text>
                                <Text style={[styles.label, { color: color.color.Black_02 }]}>30 Days Exchange Return</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ gap: 10, marginVertical: 10, }}>
                        {products.map((product) => (
                            <View key={product.id} style={{ width: '100%', height: 'auto', backgroundColor: color.color.white, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, borderRadius: 10 }}>
                                <View style={{ width: '100%', height: 'auto', backgroundColor: color.color.white, borderRadius: 10, padding: 20, flexDirection: 'row', borderBottomWidth: 0.5, borderColor: color.color.Black_05 }}>
                                    {/* Gambar Produk */}
                                    <View style={{ width: "25%", aspectRatio: 3 / 4, backgroundColor: color.color.white, borderRadius: 10 }}>
                                        <Image source={{ uri: product.image }} style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }} />
                                    </View>

                                    {/* Detail Produk */}
                                    <View style={{ gap: 10, marginLeft: 15, width: '75%', justifyContent: 'space-around', paddingRight: 10 }}>
                                        <Text style={[styles.body02, { color: color.color.Black_02 }]}>{product.title}</Text>
                                        <Text style={[styles.body02Semi, { color: color.color.Black_01 }]}>${product.price}</Text>

                                        {/* Counter */}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: color.color.Black_01 }}>Qty: {product.quantity}</Text>
                                            <View>
                                                <Text style={styles.body02Semi}>${product.price * product.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => goDetail(product.id)} style={{ height: 50, justifyContent: 'space-between', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.label, { color: color.systemColor.darkBlue }]}>View Detail</Text>
                                    <Text style={[styles.label, { color: color.systemColor.darkBlue }]}>{'>'}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {/* Payment Detail */}
                    <View style={{ width: '100%', height: 'auto', marginBottom: 10, paddingVertical: 15, borderRadius: 10, backgroundColor: color.color.white, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07 }}>
                        <View style={{ gap: 5, paddingHorizontal: 20 }}>
                            <Text style={[styles.label, { color: color.color.Black_04 }]}>Payment Detail</Text>
                        </View>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: color.color.Black_05, paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.label, { color: color.color.Black_02 }]}>Subtotal</Text>
                                <Text style={[styles.label, { color: color.color.Black_01 }]}>{totalPrice}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.label, { color: color.color.Black_02 }]}>Ship Payment</Text>
                                <Text style={[styles.label, { color: color.color.Black_01 }]}>Free</Text>
                            </View>
                        </View>
                        <View style={{ paddingTop: 5, paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.label, { color: color.color.Black_02 }]}>Total</Text>
                                <Text style={[styles.label, { color: color.color.Black_01 }]}>${totalPrice}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', padding: 10, gap: 10 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={[styles.label, { color: color.color.Black_02 }]}>Total Amount</Text>
                    <Text style={[styles.labelMed, { color: color.color.Black_01, textAlign: 'right' }]}>${totalPrice}</Text>
                </View>
                <View style={{ width: '40%' }}>
                    <Button text={'Checkout'} onPress={goCheckout} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ConfirmCheckoutPage

const styles = StyleSheet.create({
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Bold,
    heading03Medium: typography.Heading03.Medium,
    heading04: typography.Heading04.Regular,
    body02Semi: typography.Body02.SemiBold,
    body02: typography.Body02.Regular,
    body01Regular: typography.Body.Regular,
    label: typography.Label.Regular,
    labelMed: typography.Label.Medium
})