import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../../themes/color'
import Input from '../atoms/Input'
import InputGroup from '../moleculs/InputGroup'
import { typography } from '../../themes/typography'
import Button from '../atoms/Button'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { decryptCredential } from '../../utils/function/auth'
import { getUser } from '../../api/Auth'
import { UserData } from '../../utils/types/User'
import { AxiosResponse } from 'axios'

const PersonalInformationPage = () => {
    const [dataPerson, setDataPerson] = useState<UserData>()
    const resultRedux = useSelector((state: RootState) => state.AuthSlice)
    const { user, sub } = decryptCredential(resultRedux.token)

    const getDataUser = async () => {
        const result: AxiosResponse<UserData> = await getUser(sub)
        setDataPerson(result.data)
    }

    useEffect(() => {
        getDataUser()
    }, [])

    const handleSubmitEdit = () => {
        Alert.alert("This data will be sent to the API, but FakeStore doesn't actually save it.");
    }
    

    return (
        <SafeAreaView style={{ width: '100%', flex: 1, backgroundColor: color.color.Black_06 }}>
            <KeyboardAvoidingView behavior='height' style={{ flex: 1 }} keyboardVerticalOffset={100}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ marginVertical: 10, paddingHorizontal: 10, gap: 10 }}>
                        {/* Personal Information */}
                        <View style={{ width: '100%', paddingHorizontal: 20, paddingBottom: 20, paddingVertical: 10, backgroundColor: color.color.white, borderRadius: 10, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07 }}>
                            <Text style={[styles.bodymed, { color: color.color.Black_01 }]}>Personal Information</Text>
                            <View style={{ marginTop: 10, gap: 10, width: '100%' }}>
                                <View style={{ flexDirection: 'row', width: '100%', gap: 10, paddingRight: 10 }}>
                                    <View style={{ width: '50%' }}>
                                        <InputGroup label={'First Name'} onChangeText={() => { }} placeHolder={dataPerson?.name.firstname} />
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <InputGroup label={'Last Name'} onChangeText={() => { }} placeHolder={dataPerson?.name.lastname} />
                                    </View>
                                </View>
                                <InputGroup label={'Username'} onChangeText={() => { }} placeHolder={dataPerson?.username} />
                                <InputGroup label={'Email'} onChangeText={() => { }} placeHolder={dataPerson?.email} />
                                <InputGroup label={'Phone'} onChangeText={() => { }} placeHolder={dataPerson?.phone} />
                            </View>
                        </View>
                        {/* Address Information */}
                        <View style={{ width: '100%', paddingHorizontal: 20, paddingBottom: 20, backgroundColor: color.color.white, borderRadius: 10, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07 }}>
                            <Text style={[styles.bodymed, { color: color.color.Black_01, marginTop: 10 }]}>Address Information</Text>
                            <View style={{ marginTop: 10, gap: 10, width: '100%' }}>
                                <InputGroup label={'City'} onChangeText={() => { }} placeHolder={dataPerson?.address.city} />
                                <InputGroup label={'Street'} onChangeText={() => { }} placeHolder={dataPerson?.address.street} />
                                <InputGroup label={'Number'} onChangeText={() => { }} placeHolder={dataPerson?.address?.number?.toString()}/>
                                <InputGroup label={'Zip Code'} onChangeText={() => { }} placeHolder={dataPerson?.address.zipcode} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/* Button */}
                <View style={{ paddingVertical: 10, paddingHorizontal: 10, backgroundColor: color.color.white }}>
                    <Button text={'Edit Profile'} onPress={handleSubmitEdit} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default PersonalInformationPage

const styles = StyleSheet.create({
    bodymed: typography.Body.Medium
})