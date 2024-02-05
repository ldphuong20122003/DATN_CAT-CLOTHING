import HomeScreen from "../app-views/Home/HomeScreen";
import NotificationScreen from "../app-views/Notification/NotificationScreen";
import CartScreen from "../app-views/Cart/CartScreen";
import AccountScreen from "../app-views/Account/AccountScreen";
import FavouriteScreen from "../app-views/Favourite/FavouriteScreen";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Entypo, MaterialIcons, Ionicons ,MaterialCommunityIcons,FontAwesome5} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};
export default function BottomTabBar() {
  return (
  
      <Tab.Navigator screenOptions={screenOptions} >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                 <Ionicons name="home-outline" size={24}  color={focused ? "#1890ff" : "#111"} />
                  <Text style={{ fontSize: 12, color: focused ? "#1890ff" : "#111" }}>
                    Trang chủ
                  </Text>
                </View>
              );
            },
          }}
        />
      
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                 <Ionicons name="notifications-outline" size={24}  color={focused ? "#1890ff" : "#111"} />
                                 <Text style={{ fontSize: 12, color: focused ? "#1890ff" : "#111" }}>

                    Thông báo
                  </Text>
                </View>
              );
            },
          }}
        />
       
        
        <Tab.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  
                  <MaterialIcons name="favorite-outline" size={24}   color={focused ? "#1890ff" : "#111"}/>
                  <Text style={{ fontSize: 12, color: focused ? "#1890ff" : "#111" }}>
                    Yêu thích
                  </Text>
                </View>
              );
            },
          }}
        />
          <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
               <MaterialCommunityIcons name="account-circle-outline" size={24}  color={focused ? "#1890ff" : "#111"}/>
                <Text style={{ fontSize: 12, color: focused ? "#1890ff" : "#111" }}>
                    Tài khoản
                  </Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>

  );
}
