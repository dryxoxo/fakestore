import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RootStackNavigationProp } from '../../navigations/RootType';
import { useNavigation } from '@react-navigation/native';

const DebugButton = () => {

        const navigation = useNavigation<RootStackNavigationProp>();
        const goDebug = () => {
            navigation.navigate('Debug')
        }

    return (
        <TouchableOpacity style={{ position: 'absolute', backgroundColor: 'red', width: 25, height: 25, borderRadius: 100, justifyContent: 'center', bottom: 10, right: 10 }} onPress={goDebug}>
            <Text style={{ textAlign: 'center' }}>D</Text>
        </TouchableOpacity>
    )
}

export default DebugButton

const styles = StyleSheet.create({})