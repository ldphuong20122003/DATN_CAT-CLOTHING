import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import ChatSvg from "../../../assets/Svg/ChatSvg";
import CartSvg from "../../../assets/Svg/CartSvg";
import BackSvg from "../../../assets/Svg/BackSvg";
import HeaderCart from "../Home/component/HeaderCart";
import ShareSvg from "../../../assets/Svg/ShareSvg";
import Swiper from "react-native-swiper";
import iconStarSvg from "../../../assets/Svg/iconStarSvg";
import BorderFavouriteSvg from "../../../assets/Svg/BorderFavouriteSvg";
import iconShareSvg from "../../../assets/Svg/iconShareSvg";
import iconCartSvg from "../../../assets/Svg/iconCartSvg";
import iconAuthSvg from "../../../assets/Svg/iconAuthSvg";
import CarSvg from "../../../assets/Svg/CarSvg";
import iconDollarSvg from "../../../assets/Svg/iconDollarSvg";
import CareRightSvg from "../../../assets/Svg/CareRightSvg";
import OtherProduct from "./Other/OtherProduct";
import Recommend_Home from "./Recommend/Recommend_Home";
import FourStarSvg from "../../../assets/Svg/FourStarSvg";

const Detail_Product = ({ navigation }) => {
  const gotoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.Container}>
      <ScrollView style={{ marginBottom: 50 }}>
        <View style={styles.Banner}>
          <Swiper style={styles.wrapper} activeDotColor="#FFFFFF">
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
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={BackSvg()} />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
            Chi tiết sản phẩm
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SvgXml style={{ marginRight: 8 }} xml={ShareSvg()} />
            <HeaderCart />
          </View>
        </View>

        <View style={styles.Content}>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 10,
              paddingHorizontal: 16,
              borderBottomColor: "#DADADA",
            }}
          >
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  width: 300,
                  fontSize: 14,
                  color: "#2D2D2D",
                  fontWeight: 500,
                }}
              >
                Bộ quần áo thun phối 3 màu Cotton Việt Nam
              </Text>
              <Text style={{ fontSize: 14, color: "#EF4444", fontWeight: 600 }}>
                145.000đ
              </Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 14, color: "#5A5A5A" }}>
                Thương hiệu : Zara{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={iconStarSvg()} />
                <Text style={{ fontSize: 12, marginLeft: 4 }}>4.6/5</Text>
                <Text style={{ fontSize: 12, marginLeft: 8 }}>Đã bán 12</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={BorderFavouriteSvg()} />
                <SvgXml style={{ marginHorizontal: 8 }} xml={iconShareSvg()} />
                <SvgXml xml={iconCartSvg()} />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={iconAuthSvg()} />
                <Text style={{ fontSize: 10, color: "#5A5A5A", marginLeft: 4 }}>
                  Chính hãng 100%
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={iconDollarSvg()} />
                <Text style={{ fontSize: 10, color: "#5A5A5A", marginLeft: 4 }}>
                  Miễn phí trả hàng
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={CarSvg()} />
                <Text style={{ fontSize: 10, color: "#5A5A5A", marginLeft: 4 }}>
                  Miễn phí vận chuyển
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              borderBottomWidth: 10,
              borderBottomColor: "#DADADA",
              paddingVertical: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: 500 }}>Các sản phẩm khác</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: "#1890ff" }}>Xem thêm</Text>
                <SvgXml xml={CareRightSvg("#1980ff")} />
              </View>
            </View>
            <OtherProduct />
          </View>
          <View
            style={{
              borderBottomWidth: 10,
              borderBottomColor: "#DADADA",
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 0.2,
                paddingHorizontal: 16,
              }}
            >
              <Text style={{ fontWeight: 500 }}>Chi tiết sản phẩm</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: "#1890ff" }}>Xem thêm</Text>
                <SvgXml xml={CareRightSvg("#1980ff")} />
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginVertical: 12 }}>
              <Text style={{ fontSize: 12 }}>CHI TIẾT SẢN PHẨM</Text>
              <Text style={{ fontSize: 12 }}>
                Áo Sơ Mi Họa Tiết Lông Vũ {"\n"} - Được thiết kế bởi Team TOPGU.{" "}
                {"\n"}- Chất liệu: Vải Lụa cao cấp không nhăn, co giãn 4 chiều,
                mặt vải mịn mát và thấm hút tốt. Giúp người mặc thoáng mát,
                không gò bó hay hầm bí. Cam kết không ra màu không nhàu vải, giữ
                bền form áo.{"\n"}- Dáng áo suông vừa form regular, lên form
                thoải mái nhưng vẫn vừa vặn với người mặc.{"\n"}- Thiết kế, trẻ
                trung, dễ dàng kết hợp cùng quần Jeans, Kaki hoặc Short. Đi
                tiệc, du lịch hay dạo phố cùng bạn bè đều phù hợp.
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              borderBottomWidth: 10,
              borderBottomColor: "#DADADA",
              paddingVertical: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: 500 }}>Đánh giá sản phẩm</Text>
                <Text style={{ fontWeight: 600 }}>4.6/5.0</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: "#1890ff" }}>Xem thêm</Text>
                <SvgXml xml={CareRightSvg("#1980ff")} />
              </View>
            </View>
            <View style={{ marginTop: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../assets/anhdaidien.jpg")}
                  style={{ width: 24, height: 24, borderRadius: 12 }}
                />
                <Text style={{ fontSize: 12, marginLeft: 10 }}>
                  Lê Đức Phương
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <SvgXml xml={FourStarSvg()} />
                <Text style={{ fontSize: 12, color: "#707070", marginTop: 8 }}>
                  Phân loại: Đen , M
                </Text>
                <Text style={{ fontSize: 12, marginTop: 8 }}>
                  Ép dẻo, ép dẻo, ép plastic lấy ngayĐể đảm bảo cho tất cả các
                  loại giấy tờ không bị mục nát, chúng tôi chuyên ép dẻo, ép
                  plastic công nghệ cao.
                </Text>
              </View>
              <View style={{ marginTop: 8, flexDirection: "row" }}>
                <Image
                  source={require("../../../assets/anhdaidien.jpg")}
                  style={{ width: 80, height: 80, marginRight: 8 }}
                />
                <Image
                  source={require("../../../assets/anhdaidien.jpg")}
                  style={{ width: 80, height: 80, marginRight: 8 }}
                />
                <Image
                  source={require("../../../assets/anhdaidien.jpg")}
                  style={{ width: 80, height: 80, marginRight: 8 }}
                />
              </View>
              <View style={{marginTop:8}}>
                <Text style={{fontSize:10,color:'#707070'}}>30/12/2003 10:53</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              borderBottomWidth: 10,
              borderBottomColor: "#DADADA",
              paddingVertical: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: 500 }}>Sản phẩm liên quan</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: "#1890ff" }}>Xem thêm</Text>
                <SvgXml xml={CareRightSvg("#1980ff")} />
              </View>
            </View>
            <Recommend_Home />
          </View>
        </View>
      </ScrollView>
      <View style={styles.Footer}>
        <View
          style={{
            alignItems: "center",
            paddingRight: 16,
            borderRightWidth: 1,
          }}
        >
          <SvgXml xml={ChatSvg("#1890FF")} />
          <Text
            style={{
              marginTop: 4,
              fontSize: 12,
              fontWeight: 400,
              color: "#5A5A5A",
            }}
          >
            Chat ngay
          </Text>
        </View>
        <View style={{ alignItems: "center", paddingLeft: 16 }}>
          <SvgXml xml={CartSvg("#1890FF")} />
          <Text
            style={{
              marginTop: 4,
              fontSize: 12,
              fontWeight: 400,
              color: "#5A5A5A",
            }}
          >
            Thêm vào giỏ hàng
          </Text>
        </View>
        <View
          style={{
            marginLeft: 16,
            flex: 1,
            alignItems: "center",
            backgroundColor: "#1890ff",
            height: "100%",
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>
            Mua ngay
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Detail_Product;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    paddingHorizontal: 16,
    paddingVertical: 12,
    top: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  Footer: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  wrapper: {},
  slide: {
    height: 375,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  Banner: {
    width: "100%",
    height: 375,
    alignSelf: "center",
  },
  Content: {},
});
