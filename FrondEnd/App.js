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
import AccountVoucher from './src/app-views/Account/AccountVoucher';
import Option_Account from './src/app-views/Account/settings/Option_Account';
import Update_Account from './src/app-views/Account/settings/Update_Account';
import Update_Pass from './src/app-views/Account/settings/Update_Pass';
import Trans_Account from './src/app-views/Account/settings/Trans_Account';
import CartScreen from './src/app-views/Cart/CartScreen';
import Detail_Product from './src/app-views/Product/DetailProduct';
import TransportMethod from './src/app-views/Payment/component/TransportMethod';
import PaymentMethod from './src/app-views/Payment/component/PaymentMethod';
import Payment from './src/app-views/Payment/Payment';
import ChooseAddress from './src/app-views/Address/ChooseAddress';
import AddAddress from './src/app-views/Address/AddAddress';
import Chat from './src/app-views/Chat/Chat';


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
        <Stack.Screen name='Account_Voucher' component={AccountVoucher}  options={{ headerShown:false }}/>
        <Stack.Screen name='Option_Account' component={Option_Account}  options={{ headerShown:false }}/>
        <Stack.Screen name='Update_Account' component={Update_Account}  options={{ headerShown:false }}/>
        <Stack.Screen name='Update_Password' component={Update_Pass}  options={{ headerShown:false }}/>
        <Stack.Screen name='Translate_Account' component={Trans_Account}  options={{ headerShown:false }}/>
        <Stack.Screen name="Cart" component={CartScreen}  options={{ headerShown:false }}/>
        <Stack.Screen name="Detail_Product" component={Detail_Product}  options={{ headerShown:false }}/>
        <Stack.Screen name="Transport_Method" component={TransportMethod}  options={{ headerShown:false }}/>
        <Stack.Screen name="Payment_Method" component={PaymentMethod}  options={{ headerShown:false }}/>
        <Stack.Screen name="Payment" component={Payment}  options={{ headerShown:false }}/>
        <Stack.Screen name="ChooseAddress" component={ChooseAddress}  options={{ headerShown:false }}/>
        <Stack.Screen name="AddAddress" component={AddAddress}  options={{ headerShown:false }}/>
        <Stack.Screen name="Chat" component={Chat}  options={{ headerShown:false }}/>


         </Stack.Navigator>
    </NavigationContainer>
  );
}


