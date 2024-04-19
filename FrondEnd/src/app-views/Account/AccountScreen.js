import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import CareRightSvg from "../../../assets/Svg/CareRightSvg";
import Shop from "../Product/FlashSale/Shop";
import ShopSvg from "../../../assets/Svg/ShopSvg";
import EditSvg from "../../../assets/Svg/EditSvg";
import OrderSvg from "../../../assets/Svg/OrderSvg";
import UnlockSvg from "../../../assets/Svg/UnlockSvg";
import CarSvg from "../../../assets/Svg/CarSvg";
import DoneSvg from "../../../assets/Svg/DoneSvg";
import CancelSvg from "../../../assets/Svg/CancelSvg";
import UserSvg from "../../../assets/Svg/UserSvg";
import ReOrder from "../Product/ReOrder/ReOder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import config from "../../../config";
import iconMapSvg from "../../../assets/Svg/iconMapSvg";
const IP = config.IP;
const AccountScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState("");
  const [data_User, setData_User] = useState([]);
  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
        return fetch(`http://${IP}:3000/API/users/`)
          .then((res) => res.json())
          .then((data) => {
            const filteredUser = data.filter((user) => user.id === userIdValue);
            setData_User(filteredUser);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const reloadUserData = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
        return fetch(`http://${IP}:3000/API/users/`)
          .then((res) => res.json())
          .then((data) => {
            const filteredUser = data.filter((user) => user.id === userIdValue);
            setData_User(filteredUser);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserId();
  }, [userId]);
  useEffect(() => {
    if (isFocused) {
      reloadUserData();
    }
  }, [isFocused]);
  const gotoLogin = () => {
    navigation.navigate("Login");
  };
  const gotoVoucher = () => {
    navigation.navigate("Account_Voucher");
  };
  const gotoOptionAccount = () => {
    navigation.navigate("Option_Account");
  };
  const gotoChangeAccount = () => {
    navigation.navigate("Update_Account");
  };
  const gotoMapView = () => {
    navigation.navigate("MapViewScreen");
  };
  const gotoHisOrder = () => {
    navigation.navigate("History_Order");
  };
  return (
    <SafeAreaView style={{ flex: 0.93 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.slide}>
            <Image
              source={require("../../../assets/banner.jpg")}
              style={styles.image}
            />
          </View>
          <View style={styles.Voucher}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../../assets/anhdaidien.jpg")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                }}
              />
              <View style={{ justifyContent: "center", marginLeft: 8 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  {data_User.length > 0 ? data_User[0].FullName : ""}
                </Text>
                <View
                  style={{
                    backgroundColor: "#D1E9FF",
                    alignItems: "center",
                    padding: 4,
                    marginTop: 4,
                    borderRadius: 50,
                  }}
                >
                  <Text
                    style={{
                      color: "#1890FF",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    Quản trị viên
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={gotoChangeAccount}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 6,
                  borderRadius: 50,
                }}
              >
                <SvgXml xml={EditSvg()} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Order}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#D4D4D4",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={OrderSvg()} />
              <Text style={{ fontSize: 12, fontWeight: 600, marginLeft: 4 }}>
                Đơn mua
              </Text>
            </View>
            <TouchableOpacity onPress={gotoHisOrder}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}
                >
                  Xem lịch sử
                </Text>
                <SvgXml xml={CareRightSvg("#707070")} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <SvgXml xml={UnlockSvg()} />
              <Text style={{ fontSize: 12, fontWeight: 400, marginTop: 8 }}>
                Chờ xác nhận
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <SvgXml xml={CarSvg()} />
              <Text style={{ fontSize: 12, fontWeight: 400, marginTop: 8 }}>
                Chờ giao hàng
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <SvgXml xml={DoneSvg()} />
              <Text style={{ fontSize: 12, fontWeight: 400, marginTop: 8 }}>
                Đã giao
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <SvgXml xml={CancelSvg()} />
              <Text style={{ fontSize: 12, fontWeight: 400, marginTop: 8 }}>
                Đã hủy
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.Shop}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#D4D4D4",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={ShopSvg()} />

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "black",
                  marginLeft: 4,
                }}
              >
                Shop liên kết
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                Xem thêm
              </Text>
              <SvgXml xml={CareRightSvg("#707070")} />
            </View>
          </View>
          <Shop />
        </View>

        <View style={styles.ReOrder}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 14, fontWeight: 600, color: "black" }}>
              Mua lại
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                Xem thêm
              </Text>
              <SvgXml xml={CareRightSvg("#707070")} />
            </View>
          </View>
          <ReOrder />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={gotoVoucher}>
            <View
              style={{
                paddingVertical: 16,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#D4D4D4",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../assets/Voucher.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "black",
                    marginLeft: 10,
                  }}
                >
                  Voucher của tôi
                </Text>
              </View>
              <View>
                <SvgXml xml={CareRightSvg("black")} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={gotoMapView}>
            <View
              style={{
                paddingVertical: 16,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#D4D4D4",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <SvgXml xml={iconMapSvg()} />

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "black",
                    marginLeft: 10,
                  }}
                >
                  Địa chỉ cửa hàng
                </Text>
              </View>

              <View>
                <SvgXml xml={CareRightSvg("black")} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={gotoOptionAccount}>
            <View
              style={{
                paddingVertical: 16,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#D4D4D4",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <SvgXml xml={UserSvg()} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "black",
                    marginLeft: 10,
                  }}
                >
                  Thiết lập tài khoản
                </Text>
              </View>
              <View>
                <SvgXml xml={CareRightSvg("black")} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={gotoLogin}>
            <View
              style={{
                marginTop: 15,
                paddingVertical: 12,
                backgroundColor: "#FF1826",
                borderRadius: 10,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Đăng xuất
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AccountScreen;
const styles = StyleSheet.create({
  Banner: {
    position: "relative",
    width: "100%",
    height: 178,
    alignSelf: "center",
  },
  wrapper: {},
  slide: {},
  image: {
    width: "100%",
    height: 137,
  },
  Header: {
    position: "absolute",
    top: 30,
    paddingHorizontal: 16,
  },
  QuanTri: {
    padding: 4,
    fontWeight: "bold",
    color: "#1890FF",
    backgroundColor: "#D1E9FF",
    borderRadius: 5,
  },
  Shop: {
    paddingHorizontal: 16,
  },
  Voucher: {
    width: "90%",
    flexDirection: "row",
    position: "absolute",
    top: 59,
    left: 18,
    alignItems: "center",
    borderRadius: 4,
    justifyContent: "space-between",
  },
  Order: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ReOrder: {
    marginTop: 10,
    paddingHorizontal: 16,
  },

  Voucher2: {
    flexDirection: "row",

    position: "absolute",
    top: 260,
    left: 20,
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
  },
  Category: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "black",
    height: 200,
    width: "100%",
  },
});
