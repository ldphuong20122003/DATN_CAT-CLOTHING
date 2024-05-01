import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Swiper from "react-native-swiper/src";
import SearchSvg from "../../../assets/Svg/SearchSvg";
import CameraSvg from "../../../assets/Svg/CameraSvg";
import HeaderCart from "./component/HeaderCart";
import HeaderChat from "./component/HeaderChat";
import WalletSvg from "../../../assets/Svg/WalletSvg";
import CareRightSvg from "../../../assets/Svg/CareRightSvg";
import Voucher_Home from "../Voucher/Voucher_Home";
import Category_Home from "../Category/Category_Home";
import FlashSale_Home from "../Product/FlashSale/FlashSale_Home";
import Recommend_Home from "../Product/Recommend/Recommend_Home";

const HomeScreen = ({ navigation }) => {
  const gotoSearch = () => {
    navigation.navigate("Search");
  };
  const gotoChat = () => {
    navigation.navigate("Chat");
  };
  const gotoAllFlashSale = () => {
    navigation.navigate("AllFlashSale");
  };
  const gotoAllVoucher = () => {
    navigation.navigate("AllVoucher");
  };

  return (
    <SafeAreaView style={{ flex: 0.93 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Banner}>
          <Swiper
            style={styles.wrapper}
            autoplay={true}
            showsPagination={false}
          >
            <View style={styles.slide}>
              <Image
                source={require("../../../assets/Banner1.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../../assets/Banner2.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../../assets/Banner3.png")}
                style={styles.image}
              />
            </View>
          </Swiper>
        </View>
        <View style={styles.Header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={gotoSearch}>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 8,
                  marginTop: 7,
                  width: 310,
                  borderRadius: 8,
                  height: 32,
                  alignItems: "center",
                  backgroundColor: "#fff",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SvgXml xml={SearchSvg()} />
                  <TextInput
                    style={{ marginLeft: 8 }}
                    placeholder="Tìm kiếm sản phẩm"
                    editable={false}
                  />
                </View>
                <SvgXml xml={CameraSvg()} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoChat}>
              <HeaderChat />
            </TouchableOpacity>
            <HeaderCart />
          </View>
        </View>
        <View style={styles.Voucher}>
          <SvgXml xml={WalletSvg()} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 400, color: "black" }}>
              Liên kết thanh toán
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
              Voucher 50,000Đ khi liên kết Momo
            </Text>
          </View>
        </View>
        <View style={styles.Content}>
          <View style={{ marginTop: 48 }}>
            <Text style={{ color: "#1890ff", fontSize: 14, fontWeight: 600 }}>
              Danh sách thể loại
            </Text>
            <Category_Home />
          </View>
          <View style={{ marginTop: 12 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 500, color: "#5A5A5A" }}>
                Mã giảm giá & khuyến mại
              </Text>
              <TouchableOpacity onPress={gotoAllVoucher}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 12, fontWeight: 400, color: "#1890ff" }}
                  >
                    Xem thêm
                  </Text>
                  <SvgXml xml={CareRightSvg("#1890ff")} />
                </View>
              </TouchableOpacity>
            </View>
            <Voucher_Home />
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 14, fontWeight: 500, color: "#1890ff" }}>
                Flash Sale
              </Text>
              <TouchableOpacity
                onPress={gotoAllFlashSale}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "#1890ff" }}
                >
                  Xem thêm
                </Text>
                <SvgXml xml={CareRightSvg("#1890ff")} />
              </TouchableOpacity>
            </View>
            <FlashSale_Home />
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 14, fontWeight: 500, color: "#1890ff" }}>
                Gợi ý cho bạn
              </Text>
            </View>
            <Recommend_Home />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  Banner: {
    position: "relative",
    width: "100%",
    height: 178,
    alignSelf: "center",
  },
  wrapper: {},
  slide: {
    height: 178,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  Header: {
    position: "absolute",
    top: 30,
    paddingHorizontal: 16,
  },
  Voucher: {
    width: "85%",
    flexDirection: "row",
    backgroundColor: "#fff",
    position: "absolute",
    top: 155,
    left: 32,
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Category: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "black",
    height: 200,
    width: "100%",
  },
  Content: {
    paddingHorizontal: 16,
  },
});
