import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { typography } from '../../../themes/typography'

interface CardBottomActionProps {
    text: string
    onPress: () => void
}

const CardBottomAction: React.FC<CardBottomActionProps> = ({text, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ height: 50, justifyContent: 'center', paddingHorizontal: 20 }}>
            <Text style={[styles.label, { color: 'red' }]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CardBottomAction

const styles = StyleSheet.create({
    label: typography.Label.Medium
})