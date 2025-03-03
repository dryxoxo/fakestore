import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { RootStackParamList } from './RootType';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import CheckoutPage from '../components/pages/CheckoutPage';
import DetailProductPage from '../components/pages/DetailProductPage';
import ConfirmCheckoutPage from '../components/pages/ConfirmCheckoutPage';
import { color } from '../themes/color';
import HomeTab from './HomeTab';
import SearchPage from '../components/pages/SearchPage';
import DebugPage from '../components/pages/DebugPage';
import ListProductPages from '../components/pages/ListProductsPage';
import PersonalInformationPage from '../components/pages/PersonalInformationPage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const RootStack = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { isLogin } = useSelector((state: RootState) => state.AuthSlice)

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLogin ? (
                <>
                    <Stack.Screen name='HomeTab' component={HomeTab} options={{ title: 'Home' }} />
                    <Stack.Screen name="ConfirmCheckout" component={ConfirmCheckoutPage} options={{ headerShown: true, title: 'Confirm Checkout' }} />
                    <Stack.Screen name='DetailProduct' component={DetailProductPage} options={{ headerShown: true, title: 'Detail Product' }} />
                    <Stack.Screen name='Checkout' component={CheckoutPage} />
                    <Stack.Screen name='Register' component={RegisterPage} />
                    <Stack.Screen name='Search' component={SearchPage} options={{headerShown: true}} />
                    <Stack.Screen name='Debug' component={DebugPage} />
                    <Stack.Screen name='List' component={ListProductPages} options={{ headerShown: true, title: 'Category' }} />
                    <Stack.Screen name='PersonalInformation' component={PersonalInformationPage} options={{ headerShown: true, title: 'Personal Information' }} />
                </>
            ) : (
                <Stack.Screen name='Login' component={LoginPage} />
            )}
        </Stack.Navigator>
    )
}

export default RootStack

const styles = StyleSheet.create({})