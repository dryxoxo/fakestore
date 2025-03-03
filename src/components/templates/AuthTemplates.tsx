import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../themes/color'
import AuthBanner from '../organisms/AuthBanner'
import AuthForm from '../organisms/AuthForm'

interface AuthTemplatesProps {
    type: 'register' | 'login'
}
const AuthTemplates: React.FC<AuthTemplatesProps> = ({ type }) => {
    const authText = type === 'register' ? {
        heading: 'Get Started Now',
        body: 'Create an account to continue!'
    } : {
        heading: 'Sign in to your Account',
        body: 'Enter your email and password to log in'
    }

    return (
        <SafeAreaView style={{backgroundColor: color.color.white}}>
            <View style={{ height: '100%', paddingHorizontal: 24, backgroundColor: color.backgroundColor.white }}>
                <AuthBanner heading={authText.heading} body={authText.body} />
                <AuthForm type={'login'} />
            </View>
        </SafeAreaView>
    )
}

export default AuthTemplates

const styles = StyleSheet.create({})