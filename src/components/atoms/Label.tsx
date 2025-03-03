import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../themes/color'
import { typography } from '../../themes/typography'

interface LabelProps {
    text: string
}

const Label: React.FC<LabelProps> = ({text}) => {
    return (
        <Text style={[styles.labelRegular, { color: color.color.Black_03 }]}>{text}</Text>
    )
}

export default Label

const styles = StyleSheet.create({
    bodyRegular: typography.Body.Regular,
    labelRegular: typography.Label.Regular
})