import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import NetworkLogger from 'react-native-network-logger'
import { RootStackNavigationProp } from '../../navigations/RootType';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../themes/color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { decryptCredential } from '../../utils/function/auth';
import { logOut } from '../../redux/slice/AuthSlice';

const ProfilePage = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const resultRedux = useSelector((state: RootState) => state.AuthSlice)
    const dispatch = useDispatch()
    const { user, sub } = decryptCredential(resultRedux.token)

    const goPersonalInformation = () => {
        navigation.navigate('PersonalInformation')
    }

    const handleLogout = () => {
        dispatch(logOut())
    }

    return (
        <SafeAreaView style={{ width: '100%', flex: 1, backgroundColor: color.color.Black_06 }}>
            <View style={{ paddingHorizontal: 10, width: '100%', alignItems: 'center' }}>
                <View style={{ width: 100, height: 100, backgroundColor: color.color.Black_04, borderRadius: 100, overflow: 'hidden', marginTop: 10 }}>
                    <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <Text style={{marginVertical: 10}}>{user}</Text>
                <View style={{ width: '100%', height: 'auto', backgroundColor: color.color.white, borderRadius: 10, marginTop: 20, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07 }}>
                    <TouchableOpacity onPress={goPersonalInformation} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 10, borderBottomWidth: 0.5, borderColor: color.color.Black_05 }}>
                        <Text>Personal Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20, paddingHorizontal: 10, borderBottomWidth: 0.5, borderColor: color.color.Black_05 }}>
                        <Text style={{color: 'red', textAlign: 'center'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfilePage

const styles = StyleSheet.create({})