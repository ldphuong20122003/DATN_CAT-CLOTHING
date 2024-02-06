import React from "react";
import { View,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    Text,
    ScrollView,
    TouchableOpacity, } from "react-native";

    import { SvgXml } from "react-native-svg";
    import Swiper from "react-native-swiper/src";
    import SearchSvg from "../../../assets/Svg/SearchSvg";
    import CameraSvg from "../../../assets/Svg/CameraSvg";
    import WalletSvg from "../../../assets/Svg/WalletSvg";
    import CareRightSvg from "../../../assets/Svg/CareRightSvg";
    import Voucher_Home from "../Voucher/Voucher_Home";
    import Category_Home from "../Category/Category_Home";
    import Recommend_Noti from "./Recommend_Noti";    
import BackSvg from "../../../assets/Svg/BackSvg";
import CheckSvg from "../../../assets/Svg/CheckSvg";
import { FlatList } from "react-native-gesture-handler";
    

const NotificationScreen =({})=>{
    return(
        <SafeAreaView >
   
    <View style={{backgroundColor: "#1890FF", alignItems : "center",flexDirection: "row",paddingTop:41,paddingBottom:8,justifyContent:'space-between',paddingHorizontal:16,width: "100%"}}>
       <View style={{flex:1,alignItems:'center'}}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: 400}}>
            Thông báo
          </Text>
          </View>
          <SvgXml xml={CheckSvg("white")}/> 
        </View> 
        <View style={{ marginTop: 10 }}>
          <Recommend_Noti/>
        </View>
    </SafeAreaView>
    )
}
export default NotificationScreen;
const styles = StyleSheet.create({
    
    Hearder: {
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 40,
      },
      Voucher: {
        flexDirection: "row",
        backgroundColor: "#fff",
        top: 50,
        left: 32,
        alignItems: "center",
        padding: 8,
        borderRadius: 4,
      },
      Voucher1: {
        flexDirection: "row",
        marginTop: 30,
      },
  });