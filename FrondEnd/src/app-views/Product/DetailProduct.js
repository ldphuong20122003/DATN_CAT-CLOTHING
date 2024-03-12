import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import ModalFilter from "../Modal/ModalFilter";
import DeleteSvg from "../../../assets/Svg/DeleteSvg";
import { useRoute } from "@react-navigation/native";
import config from "../../../config";

const Detail_Product = ({ navigation }) => {
  const gotoBack = () => {
    navigation.goBack();
  };
  const route = useRoute();
  const IP = config.IP;
  const { productId } = route.params;
  const [data_Product, setData_Product] = useState([]);
  const [selectedSize, setSelectedSize] = useState(""); // State lưu kích cỡ được chọn
  const [selectedSizeAmount, setSelectedSizeAmount] = useState(0); // State lưu số lượng tương ứng với kích cỡ được chọn
  const [defaultAmount, setDefaultAmount] = useState(0); // State lưu số lượng mặc định
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleSizeSelection = (size, amount) => {
    setSelectedSize(size);
    setSelectedSizeAmount(amount);
  };
  const calculateTotalAmount = () => {
    let total = 0;
    if (data_Product.length > 0 && data_Product[0]?.Size) {
      Object.values(data_Product[0]?.Size).forEach((sizeAmount) => {
        total += parseInt(sizeAmount);
      });
    }
    return total;
  };
  const getAPI = () => {
    return fetch(`http://${IP}:3000/API/product/?id=` + productId)
      .then((res) => res.json())
      .then((data) => setData_Product(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAPI();
  }, [productId]);

  useEffect(() => {
    setDefaultAmount(calculateTotalAmount());
  }, [data_Product]);

  const gotoPayment = () => {
    navigation.navigate("Payment");
  };

  const [visibleAddtoCart, setVisibleAddtoCart] = useState(false);
  const [visibleBuy, setVisibleBuy] = useState(false);

  const PriceSale =
    data_Product.length > 0 && data_Product[0].Price && data_Product[0].Sale
      ? parseInt(data_Product[0].Price) - parseInt(data_Product[0].Sale)
      : 0;
  return (
    <View style={styles.Container}>
      <ScrollView style={{ marginBottom: 50 }}>
        <View style={styles.Banner}>
          <Swiper style={styles.wrapper} activeDotColor="#FFFFFF">
            <View style={styles.slide}>
              <Image
                source={{
                  uri: data_Product.length > 0 ? data_Product[0].Img : "null",
                }}
                style={styles.image}
              />
            </View>
          </Swiper>
        </View>
        <View style={styles.Header}>
          <TouchableOpacity onPress={gotoBack}>
            <View>
              <SvgXml xml={BackSvg("#fff")} />
            </View>
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
                  fontSize: 18,
                  color: "#2D2D2D",
                  fontWeight: 500,
                }}
              >
                {data_Product.length > 0 ? data_Product[0].Name : ""}
              </Text>
              <Text style={{ fontSize: 14, color: "#EF4444", fontWeight: 600 }}>
                {PriceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
              </Text>
            </View>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#5A5A5A" }}>
                Số lượng: {defaultAmount}
              </Text>
              {data_Product.length > 0 && data_Product[0].Sale !== "0" && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#5A5A5A",
                    textDecorationLine: "line-through",
                  }}
                >
                  {data_Product[0].Price.toString().replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )}{" "}
                  đ
                </Text>
              )}
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
                - {data_Product.length > 0 ? data_Product[0].Content : ""}
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
              <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 10, color: "#707070" }}>
                  30/12/2003 10:53
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
      <ModalFilter visible={visibleAddtoCart}>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-between",
            borderBottomWidth: 0.5,
            borderBottomColor: "#E2E2E2",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: data_Product.length > 0 ? data_Product[0].Img : "null",
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ width: 100, marginLeft: 8, marginTop: 40 }}>
              <Text style={{ fontSize: 14 }}>
                {data_Product.length > 0 ? data_Product[0].Name : ""}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#EF4444",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                {PriceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
              </Text>
              <Text style={{ fontSize: 10, marginTop: 2, fontWeight: 400 }}>
                Số lượng: {selectedSize ? selectedSizeAmount : defaultAmount}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setVisibleAddtoCart(false)}>
            <SvgXml xml={DeleteSvg()} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.5,
            borderBottomColor: "#E2E2E2",
          }}
        >
          <Text>Kích cỡ</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            {data_Product.length > 0 &&
              data_Product[0]?.Size &&
              Object.keys(data_Product[0]?.Size).map((size, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleSizeSelection(size, data_Product[0]?.Size[size])
                  }
                  style={{
                    ...styles.itemSize,
                    backgroundColor:
                      selectedSize === size ? "#1890ff" : "#f6f6f6",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: selectedSize === size ? "#fff" : "#000",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <Text>Số lượng</Text>
          <View>
            <View
              style={{ flexDirection: "row", paddingVertical: 4, marginTop: 5 }}
            >
              <TouchableOpacity onPress={handleDecrement}>
                <Text
                  style={{
                    borderWidth: 0.5,
                    paddingHorizontal: 6,
                    borderColor: "#707070",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                placeholder="1"
                value={quantity.toString()}
                style={{
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  width: 40,
                  height: 20,
                  fontSize: 12,
                  textAlign: "center",
                  borderColor: "#707070",
                }}
                keyboardType="numeric"
                onChangeText={(value) => {
                  if (!isNaN(value) && value !== "") {
                    setQuantity(parseInt(value));
                  }
                }}
              />
              <TouchableOpacity onPress={handleIncrement}>
                <Text
                  style={{
                    borderWidth: 0.5,
                    paddingHorizontal: 6,
                    borderColor: "#707070",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: "#1890ff",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: 600 }}>
            Thêm vào giỏ hàng
          </Text>
        </View>
      </ModalFilter>
      <ModalFilter visible={visibleBuy}>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-between",
            borderBottomWidth: 0.5,
            borderBottomColor: "#E2E2E2",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: data_Product.length > 0 ? data_Product[0].Img : "null",
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ width: 100, marginLeft: 8, marginTop: 40 }}>
              <Text style={{ fontSize: 14 }}>
                {data_Product.length > 0 ? data_Product[0].Name : ""}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#EF4444",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                {PriceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
              </Text>
              <Text style={{ fontSize: 10, marginTop: 2, fontWeight: 400 }}>
                Số lượng: {selectedSize ? selectedSizeAmount : defaultAmount}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setVisibleBuy(false)}>
            <SvgXml xml={DeleteSvg()} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.5,
            borderBottomColor: "#E2E2E2",
          }}
        >
          <Text>Kích cỡ</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            {data_Product.length > 0 &&
              data_Product[0]?.Size &&
              Object.keys(data_Product[0]?.Size).map((size, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleSizeSelection(size, data_Product[0]?.Size[size])
                  }
                  style={{
                    ...styles.itemSize,
                    backgroundColor:
                      selectedSize === size ? "#1890ff" : "#f6f6f6",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: selectedSize === size ? "#fff" : "#000",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <Text>Số lượng</Text>
          <View>
            <View
              style={{ flexDirection: "row", paddingVertical: 4, marginTop: 5 }}
            >
              <TouchableOpacity onPress={handleDecrement}>
                <Text
                  style={{
                    borderWidth: 0.5,
                    paddingHorizontal: 6,
                    borderColor: "#707070",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                placeholder="1"
                value={quantity.toString()}
                style={{
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  width: 40,
                  height: 20,
                  fontSize: 12,
                  textAlign: "center",
                  borderColor: "#707070",
                }}
                keyboardType="numeric"
                onChangeText={(value) => {
                  if (!isNaN(value) && value !== "") {
                    setQuantity(parseInt(value));
                  }
                }}
              />
              <TouchableOpacity onPress={handleIncrement}>
                <Text
                  style={{
                    borderWidth: 0.5,
                    paddingHorizontal: 6,
                    borderColor: "#707070",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={gotoPayment}>
          <View
            style={{
              paddingVertical: 10,
              backgroundColor: "#1890ff",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: 600 }}>Mua ngay</Text>
          </View>
        </TouchableOpacity>
      </ModalFilter>
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
        <TouchableOpacity onPress={() => setVisibleAddtoCart(true)}>
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
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setVisibleBuy(true)}
        >
          <View
            style={{
              marginLeft: 16,

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
        </TouchableOpacity>
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
  itemSize: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",

    borderRadius: 6,
    marginRight: 8,
  },
});
