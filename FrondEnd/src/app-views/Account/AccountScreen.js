import React from "react";
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
import FlashSale_Home from "../Product/FlashSale/FlashSale_Home";
import Shop from "../Product/FlashSale/Shop";

import ShopSvg from "../../../assets/Svg/ShopSvg";
import EditSvg from "../../../assets/Svg/EditSvg";
import OrderSvg from "../../../assets/Svg/OrderSvg";
import LockSvg from "../../../assets/Svg/LockSvg";
import UnlockSvg from "../../../assets/Svg/UnlockSvg";
import CarSvg from "../../../assets/Svg/CarSvg";
import DoneSvg from "../../../assets/Svg/DoneSvg";
import CancelSvg from "../../../assets/Svg/CancelSvg";
import UserSvg from "../../../assets/Svg/UserSvg";

const AccountScreen = ({ navigation }) => {
  const gotoLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={{ flex: 0.93}}>
      <ScrollView>
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
                  Lê Hồng Nghinh
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
            <View
              style={{ backgroundColor: "#fff", padding: 6, borderRadius: 50 }}
            >
              <SvgXml xml={EditSvg()} />
            </View>
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
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                Xem lịch sử
              </Text>
              <SvgXml xml={CareRightSvg("#707070")} />
            </View>
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
              paddingVertical:12,borderBottomWidth:1,
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
          <FlashSale_Home />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#D4D4D4",
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
            <View style={{ marginLeft: 300 }}>
              <SvgXml xml={CareRightSvg("black")} />
            </View>
          </View>

          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#D4D4D4",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../../assets/Star.png")}
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
                Đánh giá của tôi
              </Text>
            </View>

            <View style={{ marginLeft: 300 }}>
              <SvgXml xml={CareRightSvg("black")} />
            </View>
          </View>

          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#D4D4D4",
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
            <View style={{ marginLeft: 300 }}>
              <SvgXml xml={CareRightSvg("black")} />
            </View>
          </View>
          <TouchableOpacity onPress={gotoLogin}>
            <View style={{ padding: 16 }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#FF1826",
                    marginLeft: 10,
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
    //   shadowColor: "#000",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 5,
  },
  Category: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "black",
    height: 200,
    width: "100%",
  },
});
