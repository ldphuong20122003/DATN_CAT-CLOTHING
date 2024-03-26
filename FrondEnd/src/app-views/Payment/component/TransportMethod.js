import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Svg, SvgXml } from "react-native-svg";
import BackSvg from "../../../../assets/Svg/BackSvg";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransportMethod = ({ navigation, route }) => {
  const { transportMethod } = route.params;
  const gotoBack = () => {
    navigation.goBack();
  };

  const currentDate = moment();
  const [selectedOption, setSelectedOption] = useState(transportMethod);
  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  const getEstimatedDeliveryDate = (option) => {
    const clonedDate = moment(currentDate);

    // Calculate estimated delivery date based on selected shipping method
    switch (option) {
      case "option1": // Tiết kiệm (3 - 5 ngày)
        return (
          clonedDate.add(3, "days").format("DD MMM YYYY") +
          " - " +
          clonedDate.add(5, "days").format("DD MMM YYYY")
        );
      case "option2": // Nhanh (1 - 2 ngày)
        return (
          clonedDate.add(1, "days").format("DD MMM YYYY") +
          " - " +
          clonedDate.add(2, "days").format("DD MMM YYYY")
        );
      case "option3": // Hỏa tốc (ngày hôm nay)
        return clonedDate.format("DD MMM YYYY");
      default:
        return "Ngày dự kiến không xác định";
    }
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
      Alert.alert("Thông báo", "Vui lòng chọn phương thức vận chuyển.");
      return;
    }

    // Lưu lựa chọn vào AsyncStorage
    try {
      await AsyncStorage.setItem("@transport_method", selectedOption);
      // Chuyển sang màn hình Payment và truyền giá trị selectedOption qua props
      navigation.navigate("Payment", { transportMethod: selectedOption });
    } catch (error) {
      console.error("Error saving selected shipping method:", error);
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
              Phương thức vận chuyển
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
            }}
          >
            <SvgXml xml={RadioButtonSvg("option1")} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 14 }}>Tiết kiệm</Text>
              <Text style={{ marginTop: 8, fontSize: 12, color: "#707070" }}>
                Nhận hàng dự kiến vào {getEstimatedDeliveryDate("option1")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelect("option2")}>
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              alignItems: "center",
              borderBottomWidth: 0.3,
            }}
          >
            <SvgXml xml={RadioButtonSvg("option2")} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 14 }}>Nhanh</Text>
              <Text style={{ marginTop: 8, fontSize: 12, color: "#707070" }}>
                Nhận hàng dự kiến vào {getEstimatedDeliveryDate("option2")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelect("option3")}>
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              alignItems: "center",
              borderBottomWidth: 0.3,
            }}
          >
            <SvgXml xml={RadioButtonSvg("option3")} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 14 }}>Hỏa tốc</Text>
              <Text style={{ marginTop: 8, fontSize: 12, color: "#707070" }}>
                Nhận hàng dự kiến vào {getEstimatedDeliveryDate("option3")}
              </Text>
            </View>
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
export default TransportMethod;
const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
});
