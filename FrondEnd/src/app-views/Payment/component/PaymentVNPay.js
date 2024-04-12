import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import BackSvg from "../../../../assets/Svg/BackSvg";
import { SvgXml } from "react-native-svg";

const PaymentVNPayScreen = ({ navigation, route }) => {
  const totalPayment = route.params.totalPayment;
  const [total, setTotal] = useState(
    totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"
  );
  const gotoBack = () => {
    navigation.goBack();
  };
  const [paymentUrl, setPaymentUrl] = useState("");



  const handlePressPayment = () => {
    handlePayment();
    // You can add navigation logic here to navigate to the payment page
    // Example: navigation.navigate("PaymentWebView", { paymentUrl: paymentUrl });
  };

  return (
    <View>
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
              Thanh toán đơn hàng
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={{
            uri: "https://inkythuatso.com/uploads/thumbnails/800/2021/12/vnpay-logo-inkythuatso-01-13-16-29-51.jpg",
          }}
          style={{ width: "75%", height: 100 }}
        />
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Số tiền</Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginTop: 7,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <TextInput color={"#000"} editable={false} value={total}></TextInput>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Thông tin đơn hàng
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginTop: 7,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{}}
            placeholder="Nhập thông tin đơn hàng"
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity onPress={handlePressPayment}>
        <View style={styles.Footer}>
          <Text style={{ color: "#fff", fontWeight: 600 }}>Thanh toán</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default PaymentVNPayScreen;

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
  Footer: {
    marginHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#1890ff",
    borderRadius: 8,
    marginVertical: 16,
  },
});
