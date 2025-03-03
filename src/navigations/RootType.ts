import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

// export type RootStackParamList = {
//     ConfirmCheckout: undefined;
//     HomeTab: undefined;
//     DetailProduct: undefined;
//     Checkout: undefined;
//     Cart: undefined;
//     Category: undefined;
//     Login: undefined;
//     Register: undefined;
// };

export type RootStackParamList = {
    ConfirmCheckout: undefined;
    HomeTab: NavigatorScreenParams<HomeTabParamList>;
    DetailProduct: {idProduct:number};
    Checkout: undefined;
    Login: undefined;
    Register: undefined;
    Search: undefined;
    Debug: undefined;
    PersonalInformation: undefined;
    List: {category: string};
};

export type HomeTabParamList = {
    Home: undefined;
    Cart: undefined;
    Category: undefined;
    Profile: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type RootStackScreenProps<RouteName extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, RouteName>;