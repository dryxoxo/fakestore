import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NetworkLogger from 'react-native-network-logger'
import { RootStackNavigationProp } from '../../navigations/RootType';
import { useNavigation } from '@react-navigation/native';

const DebugPage = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const goDebug = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={{width: '100%', flex:1,}}>
            <Text onPress={goDebug}>Go Back</Text>
            <NetworkLogger />
        </SafeAreaView>
    )
}

export default DebugPage

const styles = StyleSheet.create({})