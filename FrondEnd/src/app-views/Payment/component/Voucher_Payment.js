import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Svg, SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackSvg from "../../../../assets/Svg/BackSvg";
import Voucher from "../../../../assets/Svg/Voucher";

const Voucher_Payment = ({ navigation, route }) => {
  const totalPrice = route.params.totalPrice;
  const voucherApdung = route.params.voucher;
  const [userId, setUserId] = useState("");
  const [voucherData, setVoucherData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const RadioButtonSvg = (voucher) => {
    const uncheckedSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9.5" stroke="#BDBCDB"/>
    </svg>
    `;

    const checkedSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11.5" stroke="#1890FF"/>
      <circle cx="12" cy="12" r="5" fill="#1890FF"/>
    </svg>
    `;

    return selectedItem === voucher ? checkedSvg : uncheckedSvg;
  };

  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vouchers = await AsyncStorage.getItem(`Voucher${userId}`);
        if (vouchers !== null) {
          setVoucherData(JSON.parse(vouchers));
        }
      } catch (error) {
        console.log("Error fetching voucher data:", error);
      }
    };

    fetchData();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [userId, navigation]);
  const goBack = () => {
    navigation.goBack();
  };
  const handleConfirm = async () => {
    if (parseInt(selectedItem && totalPrice) > parseInt(selectedItem.From)) {
      const selectedItemString = JSON.stringify(selectedItem);

      // Lưu lựa chọn vào AsyncStorage
      try {
        await AsyncStorage.setItem("@voucher_order", selectedItemString);
        // Chuyển sang màn hình Payment và truyền giá trị selectedOption qua props
        navigation.navigate("Payment", { voucherorder: selectedItem });
      } catch (error) {
        console.error("Error saving selected shipping method:", error);
      }
    } else {
      Alert.alert("Lỗi", "Đơn hàng của bạn không đủ điều kiện áp dụng voucher");
    }
  };
  useEffect(() => {
    if (voucherApdung) {
      const selectedVoucher = voucherData.find(
        (voucher) =>
          voucher.Discount === voucherApdung.Discount &&
          voucher.id === voucherApdung.id &&
          voucher.From === voucherApdung.From &&
          voucher.Title === voucherApdung.Title
      );
      setSelectedItem(selectedVoucher);
    }
  }, [voucherApdung, voucherData]);

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
        </View>
        <View>
          {voucherData.length > 0 ? (
            <View>
              {voucherData.map((voucher, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedItem(voucher)}
                >
                  <View
                    style={{
                      width: "400",
                      height: "150",
                      flexDirection: "row",
                      marginTop: 10,
                      backgroundColor: "white",
                      paddingVertical: 8,
                      alignItems: "center",
                    }}
                  >
                    <SvgXml style={{}} xml={Voucher()} />
                    <View style={{ marginLeft: 22, flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1890FF",
                        }}
                      >
                        Giảm{" "}
                        {voucher.Discount.toString().replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          "."
                        ) + " đ"}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          color: "#707070",
                        }}
                      >
                        {voucher.Title}
                      </Text>
                    </View>
                    <View style={{ marginRight: 16 }}>
                      <SvgXml xml={RadioButtonSvg(voucher)} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text>Không có dữ liệu voucher</Text>
          )}
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            marginHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: "#1890ff",
            marginBottom: 8,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={handleConfirm}
        >
          <Text style={{ fontWeight: 600, color: "#fff", fontSize: 16 }}>
            Áp dụng
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Voucher_Payment;
