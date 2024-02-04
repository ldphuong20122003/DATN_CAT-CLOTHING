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
    
   
import BackSvg from "../../../assets/Svg/BackSvg";
import Recommend_Favou from "./Recommend_Favou";
const FavouriteScreen =({})=>{
    return(
        <SafeAreaView  style={{ flex: 0.93 }}>
            <ScrollView style= {{margin: 8}}>
            <View style={{backgroundColor: "#1890FF", alignItems : "center",flexDirection: "row", marginTop: 20 ,position: "relative",
    width: "100%",
    height: 40,
    alignSelf: "center"}}>
        <SvgXml xml={BackSvg("white")} />
          <Text style={{ color: "white", fontSize: 25, fontWeight: 380, marginLeft: 120 }}>
            Yêu Thích
          </Text>
         
        </View> 
        <View style={{ marginTop: 10, paddingHorizontal: 16 }}>
          
          <Recommend_Favou />
        </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default FavouriteScreen;
const styles = StyleSheet.create({
    
    Hearder: {
        marginTop: 20, fontWeight: "bold", fontSize: 40
    },
    Voucher: {   
      flexDirection: "row",
      backgroundColor: "#fff",
      top: 50,
      left: 32,
      alignItems: "center",
      padding: 8,
      borderRadius: 4

      
    },
    Voucher1: {
        flexDirection: "row",
        marginTop: 30
      },
  });