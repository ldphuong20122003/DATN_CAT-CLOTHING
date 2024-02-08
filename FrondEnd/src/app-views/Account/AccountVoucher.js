import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Svg, SvgXml } from "react-native-svg";
import Voucher_Account from "../Voucher/Voucher_Account";
import BackSvg from "../../../assets/Svg/BackSvg";

const AccountVoucher = ({ navigation, item }) => {
  const gotoVoucher = () => {
    navigation.navigate("BottomTabScreen");
  };
  const goBack=()=>{
    navigation.goBack();
  }
    return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#1890FF",
          paddingTop: 30,
          paddingBottom: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={goBack}>
          <SvgXml xml={BackSvg()} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Voucher của tôi
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
        <View>
          <Text style={{ fontSize: 14 }}>Mã giảm giá của bạn</Text>
          <Text
            style={{
              marginTop: 5,

              fontSize: 12,
              color: "#707070",
            }}
          >
            Có thể chọn 1 Voucher
          </Text>
        </View>

        <Voucher_Account />
      </View>

      <View style={{ height: 100, backgroundColor: "white" }}>
        <TouchableOpacity onPress={gotoVoucher}>
          <View
            style={{
              marginTop: 10,
              backgroundColor: "#1890FF",
              alignItems: "center",
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginHorizontal: 8,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
              Áp dụng
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 5,
            marginLeft: 15,
            fontSize: 14,
            color: "#707070",
          }}
        >
          01 mã Voucher đã được áp dụng
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default AccountVoucher;
const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    height: 110,
    width: 100,
  },
});
