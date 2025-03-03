import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthTemplates from '../templates/AuthTemplates'
import DebugButton from '../moleculs/DebugButton'

const LoginPage = () => {
  return (
    <>
      <AuthTemplates type='login' />
      <DebugButton />
    </>
  )
}

export default LoginPage

const styles = StyleSheet.create({})