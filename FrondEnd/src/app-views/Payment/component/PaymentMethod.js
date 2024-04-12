import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Svg, SvgXml } from "react-native-svg";
import BackSvg from "../../../../assets/Svg/BackSvg";
import iconDollarSvg from "../../../../assets/Svg/iconDollarSvg";
import iconWalletSvg from "../../../../assets/Svg/iconWalletSvg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentMethod = ({ navigation, route }) => {
  const { paymentMethod } = route.params;
  const gotoBack = () => {
    navigation.goBack();
  };
  const [selectedOption, setSelectedOption] = useState(paymentMethod);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  const RadioButtonSvg = (option) => {
    const isChecked = selectedOption === option;
    // Thay thế bằng mã SVG của hình ảnh không được chọn
    const uncheckedSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" stroke="#BDBCDB"/>
    </svg>
    `;

    // Thay thế bằng mã SVG của hình ảnh được chọn
    const checkedSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11.5" stroke="#1890FF"/>
    <circle cx="12" cy="12" r="5" fill="#1890FF"/>
    </svg>
    `;

    return isChecked ? checkedSvg : uncheckedSvg;
  };
  const handleConfirm = async () => {
    if (!selectedOption) {
      Alert.alert("Error", "Vui lòng chọn phương thức thanh toán");
      return;
    }
    // Lưu lựa chọn vào AsyncStorage
    try {
      await AsyncStorage.setItem("@payment_method", selectedOption);
      // Chuyển sang màn hình Payment và truyền giá trị selectedOption qua props
      navigation.navigate("Payment", { paymentMethod: selectedOption });
    } catch (error) {
      console.error("Error saving payment method:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
              Phương thức thanh toán
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.Content}>
        <TouchableOpacity onPress={() => handleSelect("option1")}>
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              alignItems: "center",
              borderBottomWidth: 0.3,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={iconDollarSvg()} />
              <Text style={{ marginLeft: 12, fontSize: 14 }}>
                Thanh toán khi nhận hàng
              </Text>
            </View>
            <SvgXml xml={RadioButtonSvg("option1")} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelect("option2")}>
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              alignItems: "center",
              borderBottomWidth: 0.3,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={iconWalletSvg()} />
              <Text style={{ marginLeft: 12, fontSize: 14 }}>Ví VNPay</Text>
            </View>
            <SvgXml xml={RadioButtonSvg("option2")} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleConfirm}>
          <View
            style={{
              marginTop: 16,
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: "#1890ff",
              marginHorizontal: 16,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
              Xác nhận
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PaymentMethod;
const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  Content: {},
});
