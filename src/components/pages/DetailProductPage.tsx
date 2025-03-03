import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../../themes/color'
import { typography } from '../../themes/typography'
import Button from '../atoms/Button'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp, RootStackParamList } from '../../navigations/RootType'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { getProduct } from '../../api/Products'
import { AxiosError } from 'axios'
import { useAppDispatch } from '../../redux/store'
import { addCart } from '../../redux/slice/CartSlice'
import Toast from '../moleculs/Toast'

type Props = NativeStackScreenProps<RootStackParamList, 'DetailProduct'>

const DetailProductPage = ({ route, navigation }: Props) => {

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
    };

    const { idProduct } = route.params
    const dispatch = useAppDispatch()
    const [dataProduct, setDataProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);
    const [isShown, setIsShown] = useState<boolean>(false);

    const getDataProduct = async () => {
        setIsLoading(true);
        try {
            const result = await getProduct(idProduct);
            const data = result.data;
            setDataProduct(data);
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

    const handleAddToChart = (idProduct: number) => {
        setIsShown(true);

        dispatch(addCart(idProduct));
        setTimeout(() => {
            setIsShown(false);
        }, 2000);
    }

    useEffect(() => {
        getDataProduct()
    }, [idProduct])

    useEffect(() => {
        console.log(route)
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: color.color.Black_06, width: '100%', flex: 1, marginBottom:20 }}>
            {isShown && <Toast type='success' title={'Success! Added to Cart'} description={'The item has been successfully added to your cart.'} />}
            {isLoading ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    {/* Image */}
                    {dataProduct && (
                        <>
                            <View style={{ width: '100%', aspectRatio: 1, padding:20, backgroundColor: color.color.white }}>
                                <Image source={{ uri: dataProduct.image }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'contain'}}
                                />
                            </View>
                            {/* Title */}
                            <View style={{ paddingHorizontal: 10, gap: 10, }}>
                                <View style={{ flexDirection: 'column', backgroundColor: color.color.white, paddingHorizontal: 20, paddingVertical: 10, gap: 10, marginTop: 10, borderRadius: 10, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1 }}>
                                    <Text style={[styles.heading03, { color: color.color.Black_01 }]}>
                                        {dataProduct.title}
                                    </Text>
                                    <Text style={[styles.label, { color: color.color.Black_03 }]}>
                                        ⭐️ {dataProduct.rating.rate} Reviews
                                    </Text>
                                    <Text style={[styles.body02Semi, { color: color.color.Black_01 }]}>
                                        ${dataProduct.price}
                                    </Text>
                                </View>
                                {/* Description */}
                                <View style={{ width: '100%', height: 'auto', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, borderRadius: 10, gap: 10, backgroundColor: color.color.white, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1 }}>
                                    <Text style={[styles.heading04, { color: color.color.Black_01 }]}>
                                        Description
                                    </Text>
                                    <Text style={[styles.body02, { color: color.color.Black_01 }]}>
                                        {dataProduct.description}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                </ScrollView>
            )}
            {/* Buttons */}
            <View style={{ paddingTop: 20, width: '100%', flexDirection: 'row', flexWrap: 'nowrap', gap: 10, paddingHorizontal: 20 }}>
                    {dataProduct && <Button text={'Add To Cart'} onPress={() => handleAddToChart(dataProduct?.id)} />}
            </View>
        </SafeAreaView>
    )
}

export default DetailProductPage

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

