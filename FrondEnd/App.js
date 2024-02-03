import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/app-views/Login/Login';
import Register from './src/app-views/Register/Register';
import OTPScreen from './src/app-views/OTP/OTPScreen';
import ForgotPass from './src/app-views/ForgotPassword/ForgotPass';
import OTPForgotPass from './src/app-views/ForgotPassword/OTPForgotPass';
import ChangeForgotPass from './src/app-views/ForgotPassword/ChangeForgotPass';
import BottomTabBar from './src/app-navigation/BottomTabBar';
import Search from './src/app-views/Search/Search';
import Product_Search from './src/app-views/Product/Search/Product_Search';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerTitleAlign: 'center', headerTitle: 'Xác thực mã OTP' }} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} options={{ headerTitleAlign: 'center', headerTitle: 'Quên mật khẩu' }} />
        <Stack.Screen name="OTPForgotPass" component={OTPForgotPass} options={{ headerTitleAlign: 'center', headerTitle: 'Xác thực mã OTP' }} />
        <Stack.Screen name="ChangeForgotPass" component={ChangeForgotPass} options={{ headerTitleAlign: 'center', headerTitle: 'Đặt lại mật khẩu' }} />
        <Stack.Screen name="BottomTabScreen" component={BottomTabBar} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="Product_Search" component={Product_Search} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


