import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../../themes/color'

interface CardImageProps {
    uri: string
}
const CardImage: React.FC<CardImageProps> = ({uri}) => {
    return (
        <View style={{ width: "25%", aspectRatio: 3 / 4, backgroundColor: color.color.white, borderRadius: 10 }}>
            <Image source={{ uri }} style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }} />
        </View>
    )
}

export default CardImage

const styles = StyleSheet.create({})