import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import AddSvg from "../../../assets/Svg/AddSvg";
import Address from "./Address";

const ChooseAddress = ({navigation}) => {
  const gotoBack = () => {
    navigation.goBack();
  };
  const gotoPayment=()=>{
    navigation.navigate('Payment')
  };
  const gotoAddAddress=()=>{
    navigation.navigate('AddAddress')
  }
  return (
    <View style={StyleSheet.Container}>
      <View style={styles.Header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={BackSvg()} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              Chọn địa chỉ nhận hàng
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.Content}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#DADADA",
          }}
        >
          <Text style={{ color: "#5A5A5A" }}>Địa chỉ</Text>
        </View>
        <Address/>
        <TouchableOpacity onPress={gotoAddAddress}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 16,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: "#1890ff",
              borderStyle: "dotted",
            }}
          >
            <SvgXml xml={AddSvg()} />
            <Text style={{ fontSize: 12, color: "#5a5a5a", marginLeft: 8 }}>
              Thêm địa chỉ mới
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoPayment}>
            <View style={{backgroundColor:'#1890ff',marginTop:16,paddingVertical:10,marginHorizontal:16,borderRadius:8,alignItems:'center'}}>
                <Text style={{fontWeight:600,color:'#fff'}}>Xác nhận</Text>
            </View>
        </TouchableOpacity>
      </View> 
    </View>
  );
};
export default ChooseAddress;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
});
