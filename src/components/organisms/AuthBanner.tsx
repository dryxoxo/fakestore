import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../themes/color'
import { typography } from '../../themes/typography'

interface AuthBannerProps {
    heading: string,
    body: string
}

const AuthBanner: React.FC<AuthBannerProps> = ({heading, body}) => {
    return (
        <View style={{ gap: 12 }}>
            <Text style={[styles.heading1Bold, { color: color.color.Black }]}>{heading}</Text>
            <Text style={[styles.bodyRegular02, { color: color.color.Black_02 }]}>{body}</Text>
        </View>
    )
}

export default AuthBanner

const styles = StyleSheet.create({
    heading1Bold: typography.Heading01.Bold,
    bodyRegular02: typography.Body02.Regular,
    buttonText: typography.Body02.SemiBold,
})