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
import config from "../../../../config";

const IP = config.IP;

const PaymentVNPayScreen = ({ navigation, route }) => {
  const totalPayment = route.params.totalPayment;
  const [total, setTotal] = useState(
    totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"
  );

  const gotoBack = () => {
    navigation.goBack();
  };

  const [paymentUrl, setPaymentUrl] = useState("");
  const [order_Des,setOrder_Des] = useState("");

  const createPaymentUrl = async () => {
    try {
      const response = await axios.post(`http://${IP}:3000/API/Order/create_payment_url`, {
        amount: totalPayment,
      });
      const url = response.data.data; // Assuming the URL is in the 'data' field of the response
      setPaymentUrl(url);
      console.log(paymentUrl);
      // Rest of your code
    } catch (error) {
      // Error handling
    }
};
  
  const handlePressPayment = () => {
    createPaymentUrl(); // Gọi hàm tạo URL thanh toán khi người dùng nhấn nút "Thanh toán"
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={BackSvg()} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh toán đơn hàng</Text>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://inkythuatso.com/uploads/thumbnails/800/2021/12/vnpay-logo-inkythuatso-01-13-16-29-51.jpg",
          }}
          style={styles.logo}
        />
      </View>
      <View style={styles.paymentInfoContainer}>
        <Text style={styles.paymentInfoTitle}>Số tiền</Text>
        <View style={styles.paymentInfoInputContainer}>
          <TextInput
            style={styles.paymentInfoInput}
            editable={false}
            value={total}
          />
        </View>
      </View>
      <View style={styles.orderInfoContainer}>
        <Text style={styles.orderInfoTitle}>Thông tin đơn hàng</Text>
        <View style={styles.orderInfoInputContainer}>
          <TextInput
            style={styles.orderInfoInput}
            placeholder="Nhập thông tin đơn hàng"
            onChangeText={setOrder_Des}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handlePressPayment}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thanh toán</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: "75%",
    height: 100,
  },
  paymentInfoContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  paymentInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  paymentInfoInputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentInfoInput: {
    color: "#000",
    flex: 1,
  },
  orderInfoContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  orderInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  orderInfoInputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  orderInfoInput: {},
  footer: {
    marginHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#1890ff",
    borderRadius: 8,
    marginVertical: 16,
  },
  footerText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default PaymentVNPayScreen;
