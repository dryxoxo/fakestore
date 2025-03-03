import { ActivityIndicator, Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { color } from '../../themes/color'
import { typography } from '../../themes/typography'
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../navigations/RootType'
import { logger } from 'react-native-logs'
import DebugButton from '../moleculs/DebugButton'
import { AxiosError, AxiosResponse } from 'axios'
import { getAllProducts, getCategories } from '../../api/Products'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { ProductType } from '../../utils/types/Product'
import { decryptCredential } from '../../utils/function/auth'
import { addCart, fetchCart } from '../../redux/slice/CartSlice';
import Toast from '../moleculs/Toast';
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'


const HomePage = () => {
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation<RootStackNavigationProp>();
    const resultRedux = useSelector((state: RootState) => state.AuthSlice)
    const { user } = decryptCredential(resultRedux.token)
    const dispatch = useAppDispatch()


    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [keyword, setKeyword] = useState<string>('')
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isShown, setIsShown] = useState<boolean>(false);

    const filterProducts = () => {
        if (!keyword) return products;
        return products.filter(product =>
            product.title.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleDetail = (idProduct: number) => {
        navigation.navigate('DetailProduct', { idProduct: idProduct })
    }

    const handleAddToChart = (idProduct: number) => {
        setIsShown(true);

        dispatch(addCart(idProduct));
        setTimeout(() => {
            setIsShown(false);
        }, 2000);
    }

    const getDataCart = async () => {
        setIsLoading(true); 
        try {
            const result = await getAllProducts();
            const data = result.data;
            setProducts(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                Alert.alert(error.response?.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getDataCategories = async () => {
        setIsLoading(true);
        try {
            const result = await getCategories();
            const data = result.data;
            setCategories(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                Alert.alert(error.response?.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategory = (category: string) => {
        navigation.navigate('List', { category })
    }

    useEffect(() => {
        getDataCart()
        getDataCategories()
        dispatch(fetchCart(1))
    }, [])

    useEffect(() => {
        setFilteredProducts(filterProducts());
    }, [products, keyword]);

    return (
        <SafeAreaView style={{ backgroundColor: color.color.Black_06, height: '100%' }}>

            {isShown && <Toast type='success' title={'Success! Added to Cart'} description={'The item has been successfully added to your cart.'} />}
            <View style={{ paddingHorizontal: 10, paddingBottom: 30, paddingTop: 20, backgroundColor: color.systemColor.lightBlue }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.heading03, { color: color.color.Black_06 }]}>Hi, {user}</Text>
                </View>
                <TextInput
                    onChangeText={setKeyword}
                    placeholder='Search Product'
                    placeholderTextColor={color.color.Black_06}
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 10,
                        padding: 20,
                        backgroundColor: color.systemColor.darkBlue,
                        color: color.color.Black_05,
                        textAlignVertical: 'center',
                    }} />
            </View>
            {isLoading ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: color.color.Black_06, paddingHorizontal: 10, paddingTop: 20 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ height: 'auto' }}>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    {categories.map((categorie, index) => (
                                        <TouchableOpacity onPress={() => handleCategory(categorie)} key={index} style={{ padding: 7, backgroundColor: color.systemColor.darkYellow, borderRadius: 7, marginRight: 7 }}>
                                            <Text style={[styles.body01, { color: color.color.Black_01 }]}>{categorie}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                                <Text style={styles.heading03}> Our Products</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleDetail(item.id)}
                                            style={{
                                                height: 'auto',
                                                backgroundColor: color.color.white,
                                                borderRadius: 12,
                                                width: (windowWidth - (20 + 12)) / 2,
                                                marginBottom: 15,
                                                paddingBottom: 10,
                                                paddingHorizontal: 10,
                                            }}
                                        >
                                            <View style={{ width: '100%', aspectRatio: 1 }}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        resizeMode: 'contain',
                                                        borderRadius: 10,
                                                        padding: 10,
                                                    }}
                                                />
                                                <TouchableOpacity
                                                    style={{
                                                        width: 35,
                                                        height: 35,
                                                        position: 'relative',
                                                        backgroundColor: color.systemColor.lightBlue,
                                                        top: -17,
                                                        left: 125,
                                                        borderRadius: 100,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                    onPress={() => handleAddToChart(item.id)}
                                                >
                                                    <Text style={[{ fontSize: 14, color: color.color.Black_06 }]}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ marginTop: 20, gap: 2 }}>
                                                <Text style={styles.heading04} numberOfLines={1} ellipsizeMode="tail">
                                                    {item.title}
                                                </Text>
                                                <Text style={styles.body02}>${item.price}</Text>
                                                <Text>Hallo</Text>
                                                <Text style={styles.label}>⭐️ {item.rating.rate}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
                                            No Product "{keyword}"
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
            <DebugButton />
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Bold,
    heading04: typography.Heading04.Regular,
    body02: typography.Body02.SemiBold,
    body01: typography.Body.Medium,
    label: typography.Label.Regular
})