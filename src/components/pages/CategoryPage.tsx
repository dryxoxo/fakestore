import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { typography } from '../../themes/typography'
import DebugButton from '../moleculs/DebugButton'
import { color } from '../../themes/color'
import { getCategories } from '../../api/Products'
import { AxiosError } from 'axios'

const CategoryPage = () => {

    const [categories, setCategories] = useState<string[]>([])

    const getDataCategories = async () => {
        try {
            const result = await getCategories()
            const data = result.data
            setCategories(data)
        } catch (error) {
            if (error instanceof AxiosError) {
                Alert.alert(error.response?.data)
                console.log("Dari komponen ========>", error.response?.data)
            }
        }
    }

    useEffect(() => {
        getDataCategories()
    }, [])


    return (
        // <SafeAreaView style={{ backgroundColor: color.color.Black_06, height: '100%' }}>
        //         </SafeAreaView>
        <>
            <View style={{height: 'auto' }}>
                <ScrollView showsHorizontalScrollIndicator= {false} horizontal style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                    {categories.map((categorie, index) => (
                        <TouchableOpacity key={index} style={{ padding: 7, backgroundColor: color.systemColor.darkYellow, borderRadius: 7, marginRight: 7 }}>
                            <Text style={[styles.body01, { color: color.color.Black_01 }]}>{categorie}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

export default CategoryPage

const styles = StyleSheet.create({
    heading01: typography.Heading01.Medium,
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Bold,
    heading04: typography.Heading04.Bold,
    body01: typography.Body.Regular,
    body02: typography.Body02.SemiBold,
    label: typography.Label.Regular
})