import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { typography } from '../../../themes/typography'
import { color } from '../../../themes/color'


interface CardHeaderProps {
    title: string,
    price: number
}
const CardHeader: React.FC<CardHeaderProps> = ({title, price}) => {
    return (
        <>
            <Text style={[styles.body02, { color: color.color.Black_02 }]}>{title}</Text>
            <Text style={[styles.body02Semi, { color: color.color.Black_01 }]}>${price}</Text>
        </>
    )
}

export default CardHeader

const styles = StyleSheet.create({
    body02: typography.Body.Regular,
    body02Semi: typography.Body.SemiBold,
})