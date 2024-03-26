import React, { useEffect, useState } from "react";
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
import BackSvg from "../../../assets/Svg/BackSvg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Voucher from "../../../assets/Svg/Voucher";

const AccountVoucher = ({ navigation, item }) => {
  const [userId, setUserId] = useState("");
  const [voucherData, setVoucherData] = useState([]);
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
                <View
                  key={index}
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
                  <View style={{ marginLeft: 22 }}>
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
                </View>
              ))}
            </View>
          ) : (
            <Text>Không có dữ liệu voucher</Text>
          )}
        </View>
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
