import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Svg, SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import AddressSvg from "../../../assets/Svg/AddressSvg";
import Payment_Product from "../Product/Payment/Payment_Product";

import iconPaymentMethod from "../../../assets/Svg/iconPaymentMethod";
import CareRightSvg from "../../../assets/Svg/CareRightSvg";
import CarSvg from "../../../assets/Svg/CarSvg";
import OrderSvg from "../../../assets/Svg/OrderSvg";
import ChatSvg from "../../../assets/Svg/ChatSvg";

const InformationOder = ({ navigation }) => {
  const gotoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.Container}>
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
              Thông tin đơn hàng
            </Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.Content}>
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 10,
              borderBottomColor: "#dadada",
            }}
          >
            <SvgXml style={{ marginTop: 4 }} xml={AddressSvg("#1890ff")} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 10 }}>Hồng Nghinh </Text>
                <Text>|</Text>
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  0974014265
                </Text>
              </View>
              <Text style={{ marginTop: 8, fontSize: 12, color: "#707070" }}>
                123 Sông Hồng , Hai Bà Trưng , Hà Nội
              </Text>
            </View>
          </View>
          <Payment_Product />
          <View style={{ borderBottomWidth: 10, borderBottomColor: "#DADADA" }}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                paddingHorizontal: 16,
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 0.3,
                borderBottomColor: "#707070",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={iconPaymentMethod()} />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Phương thức thanh toán
                </Text>
              </View>
            </View>
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Thanh toán khi nhận hàng
              </Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: 10, borderBottomColor: "#DADADA" }}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                paddingHorizontal: 16,
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 0.3,
                borderBottomColor: "#707070",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={CarSvg()} />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Phương thức vận chuyển
                </Text>
              </View>
            </View>
            <View style={{ padding: 16 }}>
              <Text>Hỏa tốc</Text>
              <Text style={{ fontSize: 12, color: "#707070", marginTop: 8 }}>
                Nhận hàng dự kiến vào 25 Th12 - 27 Th12
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                paddingHorizontal: 16,
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 0.3,
                borderBottomColor: "#707070",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={OrderSvg()} />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Chi tiết thanh toán
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Mã đơn hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                234JDKFJELJ
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Thời gian đặt hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>27-12-2023</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Tổng tiền hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                3.200.000 đ
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Phí vận chuyển
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>20.000 đ</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text>Tổng thanh toán</Text>
              <Text style={{ color: "#EF4444" }}>3.220.000 đ</Text>
            </View>
          </View>
        </View>
        <View style={styles.Button}>
          <SvgXml xml={ChatSvg("#1890ff")} />
          <Text style={{ fontSize: 14, fontWeight: 600, marginLeft: 8 }}>
            Liên hệ shop
          </Text>
        </View>
        <View style={styles.Button}>
        
          <Text style={{ fontSize: 14, fontWeight: 600, marginLeft: 8 ,color:"#1890ff"}}>
          Hủy đơn hàng
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default InformationOder;
const styles = StyleSheet.create({
  Container: { flex: 1 },
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  Content: {},
  Footer: {},
  Button: {
    marginTop: 16,
    marginHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#1890ff",
    borderRadius: 8,
  },
});
