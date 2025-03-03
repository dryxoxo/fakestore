import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../../themes/color'
import { typography } from '../../../themes/typography'


interface CounterProps {
    onIncrement?: () => void
    onDecrement?: () => void
    quantity: number
    price: number
}

const Counter: React.FC<CounterProps> = ({ onIncrement, onDecrement, quantity, price }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
                <Text onPress={onDecrement} style={{ backgroundColor: color.color.Black_05, paddingHorizontal: 10, paddingVertical: 5, color: color.color.Black_02, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>-</Text>
                <Text style={{ backgroundColor: color.color.Black_05, paddingHorizontal: 15, paddingVertical: 5, color: color.color.Black_02 }}>{quantity}</Text>
                <Text onPress={onIncrement} style={{ backgroundColor: color.color.Black_05, paddingHorizontal: 10, paddingVertical: 5, color: color.color.Black_02, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>+</Text>
            </View>
            <View>
                <Text style={styles.body02Semi}>${price * quantity}</Text>
            </View>
        </View>
    )
}

export default Counter

const styles = StyleSheet.create({
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Regular,
    heading04: typography.Heading04.Bold,
    body02: typography.Body.Regular,
    body02Semi: typography.Body.SemiBold,
    label: typography.Label.Medium
})