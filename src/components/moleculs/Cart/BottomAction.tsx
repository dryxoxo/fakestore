import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { typography } from '../../../themes/typography'
import Button from '../../atoms/Button'
import { color } from '../../../themes/color'


interface BottomActionProps {
    text: string,
    totalPrice: number,
    onPressCheckout: () => void,
    isDisabled?: boolean
}
const BottomAction: React.FC<BottomActionProps> = ({text, totalPrice, onPressCheckout, isDisabled}) => {
    return (
        <View style={{ width: '100%', backgroundColor: color.color.white, height: 'auto', borderTopWidth: 0.5, borderColor: color.color.Black_05, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <View>
                <Text style={[styles.label, { color: color.color.Black_04 }]}>{text}</Text>
                <Text style={[styles.body02Semi, { color: color.color.Black_01 }]}>${totalPrice}</Text>
            </View>
            <View style={{ width: 150 }}>
                <Button text={'Checkout'} onPress={onPressCheckout} isDisabled = {isDisabled}/>
            </View>
        </View>
    )
}

export default BottomAction

const styles = StyleSheet.create({
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Regular,
    heading04: typography.Heading04.Bold,
    body02: typography.Body.Regular,
    body02Semi: typography.Body.SemiBold,
    label: typography.Label.Medium
})