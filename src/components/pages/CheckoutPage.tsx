import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { typography } from '../../themes/typography'
import { color } from '../../themes/color'
import Button from '../atoms/Button'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../navigations/RootType'
import { getCart } from '../../api/Cart'
import { getProduct } from '../../api/Products'
import { AxiosError } from 'axios'
import { getDataCartReducer, getDataCartUtil } from '../../utils/function/data'
import CardProduct from '../organisms/Cart/CardProduct'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

const CheckoutPage = () => {
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

    // useEffect(() => {
    //     getDataCartUtil(setIsLoading, setProducts)
    // }, [])

            useEffect(() => {
                getDataCartReducer(setIsLoading, setProducts, resultRedux)
            }, [resultRedux])

    const goShope = () => {
        navigation.navigate('HomeTab', { screen: 'Home' })
    }

    const goDetail = (idProduct: number) => {
        navigation.navigate('DetailProduct', { idProduct })
    }

    const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <SafeAreaView style={{ backgroundColor: color.color.Black_06, width: '100%', flex: 1 }}>
            {isLoading ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                <ScrollView style={{ paddingHorizontal: 10, marginBottom: 20, flex: 1 }}>
                    <View style={{ gap: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[styles.heading01Medium, { color: color.color.Black_01 }]}>Thank You!</Text>
                            <Text style={[styles.body, { color: color.color.Black_02 }]}>Your order has been </Text>
                        </View>
                        {/* Deliver To */}
                        <View style={{ width: '100%', height: 130, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10, backgroundColor: color.color.white, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, justifyContent: 'space-between' }}>
                            <View style={{ gap: 5 }}>
                                <Text style={[styles.label, { color: color.color.Black_04 }]}>Deliver To</Text>
                                <Text style={[styles.body02Semi, { color: color.color.Black_01 }]}>Ranchview, California</Text>
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
                        {/* Amount*/}
                        <View style={{ width: '100%', height: 50, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10, backgroundColor: color.color.white, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between' }}>
                                <Text style={[styles.body02Semi, { color: color.color.Black_01 }]}>Total Payable Amount</Text>
                                <Text style={[styles.body02Semi, { color: color.color.Black_01 }]}>${totalPrice}</Text>
                            </View>
                        </View>
                        {/* Card */}
                        <View style={{ gap: 10, marginBottom: 10 }}>
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
                    </View>
                </ScrollView>
            )}

            <View style={{ paddingHorizontal: 20 }}>
                <Button text={'Continue Shopping'} onPress={goShope} />
            </View>
        </SafeAreaView>
    )
}

export default CheckoutPage

const styles = StyleSheet.create({
    heading01Medium: typography.Heading01.Medium,
    body: typography.Body.Regular,
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Regular,
    heading04: typography.Heading04.Bold,
    body02: typography.Body.Regular,
    body02Semi: typography.Body.SemiBold,
    label: typography.Label.Medium
})