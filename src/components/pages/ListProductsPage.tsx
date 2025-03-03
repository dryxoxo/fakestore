


import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../../themes/color'
import { typography } from '../../themes/typography'
import Button from '../atoms/Button'
import { Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigations/RootType'
import { getProductCategories } from '../../api/Products'
import { AxiosError } from 'axios'
import DebugButton from '../moleculs/DebugButton'
import { useAppDispatch } from '../../redux/store'
import { addCart } from '../../redux/slice/CartSlice'
import Toast from '../moleculs/Toast'

type Props = NativeStackScreenProps<RootStackParamList, 'List'>

const ListProductPages = ({ route, navigation }: Props) => {

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

    const { category } = route.params
    const dispatch = useAppDispatch()
    const windowWidth = Dimensions.get('window').width;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isShown, setIsShown] = useState<boolean>(false);

    const handleAddToChart = (idProduct: number) => {
        setIsShown(true);

        dispatch(addCart(idProduct));
        setTimeout(() => {
            setIsShown(false);
        }, 2000);
    }


    const getDataProduct = async () => {
        setIsLoading(true);
        try {
            const result = await getProductCategories(category);
            const data = result.data;
            setProducts(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                Alert.alert(error.response?.data);
                console.log("Dari komponen ========>", error.response?.data);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleDetail = (idProduct: number) => {
        navigation.navigate('DetailProduct', { idProduct: idProduct })
    }

    useEffect(() => {
        getDataProduct()
    }, [category])

    return (
        <SafeAreaView style={{ backgroundColor: color.color.Black_06, height: '100%' }}>
            {isShown && <Toast type='success' title={'Success! Added to Cart'} description={'The item has been successfully added to your cart.'} />}
            <View style={{ flex: 1, backgroundColor: color.color.white }}>
                <View style={{ flex: 1, backgroundColor: color.color.Black_06 }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20, paddingHorizontal: 10 }}>
                        <Text style={styles.heading03Medium}>{category}</Text>
                    </View>
                    {isLoading ? (
                        <ActivityIndicator style={{ flex: 1 }} />
                    ) : (
                        <ScrollView>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingHorizontal: 10, paddingBottom: 10 }}>
                                {products.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleDetail(item.id)}
                                        style={{ height: 'auto', backgroundColor: color.color.white, borderRadius: 12, width: (windowWidth - (20 + 12)) / 2, marginBottom: 15, paddingBottom: 10, paddingHorizontal: 10, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07 }}
                                    >
                                        <View style={{ width: '100%', aspectRatio: 1 }}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10, padding: 10 }}
                                            />
                                            <TouchableOpacity
                                                style={{ width: 35, height: 35, position: 'relative', backgroundColor: color.systemColor.lightBlue, top: -17, left: 125, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
                                                onPress={()=>handleAddToChart(item.id)}
                                            >
                                                <Text style={[{ fontSize: 14, color: color.color.Black_06 }]}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginTop: 20, gap: 2 }}>
                                            <Text style={styles.heading04} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                                            <Text style={styles.body02}>${item.price}</Text>
                                            <Text style={styles.label}>⭐️ {item.rating.rate}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    )}
                </View>
            </View>
            {/* <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                <View style={{width: '100%', height:300, backgroundColor: color.color.white, position: 'absolute', bottom: 0, padding:20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={styles.heading03Medium}>Sort By</Text>
                        <Text>X</Text>
                    </View>
                    <View style={{gap:15}}>
                        <Text style={styles.body01Regular}>Price - High To Low</Text>
                        <Text style={styles.body01Regular}>Price - Low To High</Text>
                        <Text style={styles.body01Regular}>Popularity</Text>
                        <Text style={styles.body01Regular}>Discount</Text>
                        <Text style={styles.body01Regular}>Customer Rating</Text>
                    </View>
                </View>
            </View> */}
            <DebugButton />
        </SafeAreaView>
    )
}

export default ListProductPages

const styles = StyleSheet.create({
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Bold,
    heading03Medium: typography.Heading03.Medium,
    heading04: typography.Heading04.Regular,
    body02: typography.Body02.SemiBold,
    body01Regular: typography.Body.Regular,
    label: typography.Label.Regular
})