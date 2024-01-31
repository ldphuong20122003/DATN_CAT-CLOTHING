
import React from "react";
import { Text, TouchableOpacity, View ,StyleSheet} from "react-native";
import { SvgXml } from "react-native-svg";
import ChatSvg from "../../../../assets/Svg/ChatSvg";
import CartSvg from "../../../../assets/Svg/CartSvg";

const HeaderCart=()=>{
    return(
        <View
        style={[
          { ...styles.container },
        ]}>
        <View style={{...styles.total_qty}}>
          <Text style={{color: 'white', fontSize: 12}}>
          </Text>
        </View>
        <TouchableOpacity >
          <SvgXml xml={CartSvg()} />
        </TouchableOpacity>
      </View>
    )
}
export default HeaderCart;
const styles = StyleSheet.create({
    container: {
      height: 35,
      width: 35,
      borderRadius: 17.5,
      justifyContent: 'center',
      
      marginTop:10
    },
    total_qty: {
      zIndex: 99,
      position: 'absolute',
      top: -1,
      right: 5,
      backgroundColor: 'red',
      height: 16,
      width: 18,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
    },
  });