
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/app-views/Login/Login";
import Register from "./src/app-views/Register/Register";
import OTPScreen from "./src/app-views/OTP/OTPScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPass from "./src/app-views/ForgotPassword/ForgotPass";

export default function App() {
  const Stack = createStackNavigator();

  return (
 
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="OTPScreen" component={OTPScreen} options={{headerTitleAlign:'center',headerTitle:'Xác thực mã OTP'}}/>
      <Stack.Screen name="ForgotPass" component={ForgotPass} options={{headerTitleAlign:'center',headerTitle:'Quên mật khẩu'}}/>
    </Stack.Navigator>
  </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
