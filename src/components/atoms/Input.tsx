import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { color } from '../../themes/color'
import { typography } from '../../themes/typography'

interface InputProps {
    placeHolder?: string,
    secure?: boolean,
    onChange: (teks: string) => void
    isSuccess?: boolean
}
const Input: React.FC<InputProps> = ({placeHolder, onChange, secure, isSuccess=true}) => {
    return (
        <>
            <TextInput
                placeholder={placeHolder}
                onChangeText={onChange}
                secureTextEntry={secure}
                placeholderTextColor={color.color.Black_04}
                style={[styles.bodyRegular, { borderBottomWidth: 1, borderColor: isSuccess? color.color.Black_05:'red', paddingVertical: 11, color: color.color.Black_01 }]}
            />
        </>
    )
}

export default Input

const styles = StyleSheet.create({
    bodyRegular: typography.Body.Regular,
    labelRegular: typography.Label.Regular
})