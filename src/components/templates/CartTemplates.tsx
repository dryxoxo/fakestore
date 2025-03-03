import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../navigations/RootType';
import { ProductType } from '../../utils/types/Product';
import { calculateTotalPrice, getDataCartReducer, getDataCartUtil } from '../../utils/function/data';
import { color } from '../../themes/color';
import CardProduct from '../organisms/Cart/CardProduct';
import BottomAction from '../moleculs/Cart/BottomAction';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { addCart, decCart, removeCart } from '../../redux/slice/CartSlice';
import Toast from '../moleculs/Toast';

const CartTemplates = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const totalPrice = calculateTotalPrice(products)
    const [isShown, setIsShown] = useState<boolean>(false);
    const resultRedux = useSelector((state: RootState) => state.CartSlice)
    const dispatch = useAppDispatch()

    const handleAddToChart = (idProduct: number) => {
        dispatch(addCart(idProduct));
    }

    const handleDeccToChart = (id: number) => {
        dispatch(decCart(id))
    }

    const handleRemoveToChart = (id: number) => {
        setIsShown(true);
        dispatch(removeCart(id))
        setTimeout(() => {
            setIsShown(false);
        }, 2000);
    }

    const goCheckout = () => {
        navigation.navigate('ConfirmCheckout')
    }

    useEffect(() => {
        getDataCartReducer(setIsLoading, setProducts, resultRedux)
    }, [resultRedux])

    useEffect(() => {
        console.log(resultRedux)
    }, [handleAddToChart])

    return (
        <SafeAreaView style={{ backgroundColor: color.color.Black_06, height: '100%' }}>
            {isShown && <Toast type={'delete'} title={'Success! Deleted From Cart'} description={'The item has been successfully deleted from your cart.'} />}
            {isLoading ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: 10, gap: 10, marginVertical: 10 }}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <CardProduct
                                    key={product.id}
                                    product={product}
                                    onIncrement={(id) => handleAddToChart(id)}
                                    onDecrement={(id) => handleDeccToChart(id)}
                                    onRemove={(id) => handleRemoveToChart(id)}
                                />
                            ))
                        ) : (
                            <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
                                No products available in your cart.
                            </Text>
                        )}

                    </View>
                </ScrollView>
            )}
            <BottomAction
                text={'Total Amount: '}
                onPressCheckout={goCheckout}
                totalPrice={totalPrice}
                isDisabled={products.length < 1}
            />
        </SafeAreaView>
    )
}

export default CartTemplates

const styles = StyleSheet.create({})