import { Alert, KeyboardAvoidingView, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../../themes/color'
import InputGroup from '../moleculs/InputGroup'
import { typography } from '../../themes/typography'
import Button from '../atoms/Button'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../navigations/RootType'
import { login, register } from '../../api/Auth'
import { AxiosError } from 'axios'
import { logger } from "react-native-logs";
import { useAppDispatch } from '../../redux/store'
import { storeCredensial } from '../../redux/slice/AuthSlice'


interface AuthFormProps {
    type: 'register' | 'login'
}

const AuthForm: React.FC<AuthFormProps> = ({ type = 'login' }) => {
    const log = logger.createLogger();
    const navigation = useNavigation<RootStackNavigationProp>();
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(true)

    const goDebug = () => {
        navigation.navigate('HomeTab', { screen: 'Profile' })
    }

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const result = await login(username, password)
            dispatch(storeCredensial({ token: result.data.token }))
            navigation.navigate('HomeTab', { screen: 'Home' })
        } catch (error) {
            if (error instanceof AxiosError) {
                setIsSuccess(false)
                Alert.alert(error.response?.data)
                console.log("Dari komponen ========>", error.response?.data)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async () => {
        console.log('Payload ======>')
        log.info("Payload Information", { email, username, password });

        setIsLoading(true)
        try {
            const result = await register(username, email, password)
            log.info("Result from API '/register'", result)
            Alert.alert('Data has been sent, but FakeStore did not save a new record.')
        } catch (error) {
            if (error instanceof AxiosError) {
                setIsSuccess(false)
                Alert.alert(error.response?.data)
                log.info("Result error from API '/register'", error.response?.data)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setIsSuccess(true)
    }, [username, password])
    
    useEffect(() => {
        setUsername('johnd')
        setPassword('m38rmF$')
    }, [])

    return (
        <>
            {type == 'login' && (
                <KeyboardAvoidingView behavior='height' style={{ flex: 1 }} keyboardVerticalOffset={10}>
                    <View style={{ gap: 16, flex: 1 }}>
                        <InputGroup label={'Username'} placeHolder={'John Doe'} onChangeText={setUsername} isSuccess={isSuccess} />
                        <InputGroup label={'Password'} placeHolder={'******'} secure={true} onChangeText={setPassword} isSuccess={isSuccess} />
                        <TouchableOpacity onPress={() => { }} style={{ width: '100%', alignItems: 'flex-end' }}>
                            <Text style={[styles.bodyRegular02, { color: color.systemColor.darkBlue }]}>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Button text={'login'} onPress={handleLogin} textAlign='center' isLoading={isLoading} />
                </KeyboardAvoidingView>
            )}
            {type == 'register' && (
                <KeyboardAvoidingView behavior='height' style={{ flex: 1, marginTop: 32, }}>
                    <View style={{ gap: 16, flex: 1 }}>
                        <InputGroup label={'Username'} placeHolder={'John Doe'} onChangeText={setUsername} isSuccess={isSuccess} />
                        <InputGroup label={'Email'} placeHolder={'johndoe@gmail.com'} onChangeText={setEmail} isSuccess={isSuccess} />
                        <InputGroup label={'Password'} placeHolder={'******'} secure={true} onChangeText={setPassword} isSuccess={isSuccess} />
                        <TouchableOpacity onPress={() => { }} style={{ width: '100%', alignItems: 'flex-end' }}>
                            <Text style={[styles.bodyRegular02, { color: color.systemColor.darkBlue }]}>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Button text={'login'} onPress={handleRegister} textAlign='center' isLoading={isLoading} />
                </KeyboardAvoidingView>
            )}
        </>
    )
}

export default AuthForm

const styles = StyleSheet.create({
    heading1Bold: typography.Heading01.Bold,
    bodyRegular02: typography.Body02.Regular,
    buttonText: typography.Body02.SemiBold,
})