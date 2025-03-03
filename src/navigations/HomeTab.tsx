import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../components/pages/HomePage';
import CartPage from '../components/pages/CartPage';
import ProfilePage from '../components/pages/ProfilePage';
import ListProductPages from '../components/pages/ListProductsPage';
import CategoryPage from '../components/pages/CategoryPage';
import { Cart, Home, Profile } from '../assets/svg';
import { SvgProps } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();
const ICONS: Record<string, React.FC<SvgProps>> = {
  Home,
  Cart,
  Profile,
};


function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          const IconComponent = ICONS[route.name];
          return IconComponent ? <IconComponent width={size} height={size} fill={color} /> : null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Cart" component={CartPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  activeIndicator: {
    width: 30,
    height: 3,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: -2,
    borderRadius: 5,
  },
});
export default HomeTab