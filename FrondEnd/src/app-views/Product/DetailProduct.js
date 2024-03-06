import React, { useEffect, useState } from "react";
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
import ModalFilter from "../Modal/ModalFilter";
import DeleteSvg from "../../../assets/Svg/DeleteSvg";
import { useRoute } from "@react-navigation/native";

const Detail_Product = ({ navigation }) => {
  const gotoBack = () => {
    navigation.goBack();
  };
  const route = useRoute();
  const IP = "192.168.0.103";
  const { productId } = route.params;
  const [data_Product, setData_Product] = useState([]);
  const getAPI = () => {
    return fetch(`http://${IP}:3000/API/product/getbyid?id=` + productId)
      .then((res) => res.json())
      .then((data) => setData_Product(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAPI();
  }, [productId]);

  useEffect(() => {}, [data_Product]); // data_Product là dependency

  const gotoPayment = () => {
    navigation.navigate("Payment");
  };
  const [visibleAddtoCart, setVisibleAddtoCart] = React.useState(false);
  const [visibleBuy, setVisibleBuy] = React.useState(false);
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
                Số lượng:{" "}
                {data_Product.length > 0 ? data_Product[0].Amount : ""}
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
              source={require("../../../assets/anhdaidien.jpg")}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ width: 100, marginLeft: 8, marginTop: 40 }}>
              <Text style={{ fontSize: 10 }}>
                Bộ quần áo thun 3 màu chất cotton
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#EF4444",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                160.000đ
              </Text>
              <Text style={{ fontSize: 10, marginTop: 2, fontWeight: 400 }}>
                Đã bán 172
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
          <Text>Màu sắc</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Image
                source={{
                  uri: "data:image/webp;base64,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",
                }}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>Đen</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Image
                source={{
                  uri: "data:image/webp;base64,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",
                }}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>Đen</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
              }}
            >
              <Image
                source={{
                  uri: "data:image/webp;base64,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",
                }}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>Đen</Text>
            </View>
          </View>
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
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 12, marginLeft: 4 }}>XS</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 12, marginLeft: 4 }}>S</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
              }}
            >
              <Text style={{ fontSize: 12, marginLeft: 4 }}>M</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
              }}
            >
              <Text style={{ fontSize: 12, marginLeft: 4 }}>L</Text>
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
              source={require("../../../assets/anhdaidien.jpg")}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ width: 100, marginLeft: 8, marginTop: 40 }}>
              <Text style={{ fontSize: 10 }}>
                Bộ quần áo thun 3 màu chất cotton
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#EF4444",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                160.000đ
              </Text>
              <Text style={{ fontSize: 10, marginTop: 2, fontWeight: 400 }}>
                Đã bán 172
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
          <Text>Màu sắc</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Image
                source={{
                  uri: "data:image/webp;base64,UklGRooHAABXRUJQVlA4WAoAAAAQAAAArwAArwAAQUxQSCcAAAABFyAQSFKffI2ICAczAZPcBKCZeFvK0itARP8n4ALWkLykT/3f3QIAVlA4IDwHAABwMwCdASqwALAAPt1iqk2opaQjKdU8wRAbiWUAz4YP/0PrMBi7mZtnD/ULTzna+rQIJwbPeTJrK+vMb0R8nL7HFlQ6MfdpYJV2YSr0ElQK7U4vXa55OJzg5yrdWQdEQU311eSAWu+g5J2fUVy6SVpKMR7+YxwR9QFa9k2Nij/GEpLU/7Sz3OjeecoANZw3hS6rC0Wn+i4mN5Z9LY9bMOhoqaficsRtZvcjc08opDzelNIvtAp03M5TtLjR9Qlsj2OS9JimosZ3W3rzp5aiv+V2E7ts0p6cuX3xn5xKMBaO7zuJenAlvCmhedaQzOVMWEwlf/bjEVZVRo6rye5IfH2qTPFlAxi3MLo86A0DXPOo6TxtZ0WW+1jTjwXsradDH9eSA1ZlZjnzBF8Owts3wbKyyWwUOp1qE9nRuQh/B4h0q4ir15nyQ1m+wUEPr7hLukdbmJ+E52x6UhKhXsmElqaStgF507nNKaaMldx18ofGWErUqXHSGYRQOLqlTfurX3gg89gtW1R/NGQnVJEtv/XCl2E6x5G/SU3vMxchnp0g+F8QPQAA/ud2mVuVbv8JchwTDXiDG1QuzT9iEeNRlOqnCgeDcOfEI3upNUp+yo7B63eYzRQw5dKIeAsu+ug/Oq3QVG8MSIHPq+oLVHgQ5ztHDm9Gjxrg/ElkzcajBTGsnv9NuhbYshj/U4HxPB9S0c0PMHSOxnTjbKNmfCkhTcu98EP+XrzaSbwfhTcSzVaVnkggOSPcPdk9pbLcbw/jt3pnMCF0YeFi9MBPuG1Xd6Wh4NiomWBaul2ljw7JIBjQ0bXvvjOnzsaogwgwdS8/Aia2wDap8dTwveQJtihyjpTDPh3+D+UTfbfnvINP4GJBtAGNOMdZsm5N5xo0MsFzY6KJbfsNzn5JEbkCR4PiXp8hfe405akhD8Do3lOChrU8VswDLziATlroxZnZrmp/CAQiTADpjyL33MSqqOgYMHso1Xiy+bIKiUA9V9vEdGJc2puFrS/f1HwoH8l9mH5yGMrCf1u4vzsE1qlRM5acL7YHDH+g9j8lT1OGRqlfFRhX8VsC30p6TR8gkvcc8e9RkzQeiEo22v74Aq2OnqBwNQ2KHYSfNFUkaCmhDkrj+kubnLKtYCCVqBCkXWFA5WhoWbSqopwZHe9yVcAQPNygSxRVQFkdaSKWhieGi1vIYKXIeLklA/N8HskbbAbqVZBaS5y4I1ziRz+KxPToBrpoLxz2FbhwAKGgP3Xe1xgd0xRgEWPxx2Yauk4Ul8TAAzWjpJifQrO7eAddnQ0OvHLhsi6MLD2euylv7FSaf3yT6Gmb71eJHFUwF1xJT/jU79tscVQE5jGX0bj6iVXkdPHLgGWFucYq1TN/iM38r/NtR1iHQ8bnlkx7Kjpb+MuUPqr6RLQeughwRpKSv6NKBKlbsti5W5ncc7Wclsn7ADpWU3qZbDZ3yTXA0hz7KQ8Zd01ovHAHdNsam6ysUz50cu64qD2s0YmsQmbP4TRGfUyjZTwEUdNVYw7lpc4k/tZHoE5pTXAi+1yO4XH0zQ1hY+J2yNfARo5OUZ19ZYD63QLpeHrXtYf9DwjYjhHviwSQeOVHwe7jOHTaprQjOplnY0duExrtByBa7eNzyKGsBuxBGeaV33WZyMZRKYarTruM3JVG2rlwMHkaEd0LATm3sAioMXMTS/PFZnL4+0IEyFpSB6DZ3s+m8zVGdbntEgTNbVvCCLHF/kmXZ4FEpoiPLUaPUEo5QkBFrmn+rWu7Am5B7KVRGOa+se7Ew3476yTJb1lwbkg1/PDOggBMDZY4jxPv59nKsOIM1OB5B9+hx9KL1s+pU/M0Y+FlrGtq8A82cCEH0UKgTLyWuuCxilCPMG0vGeufATUCME20Qgk8i190wdO+Ag6f9h6iGgyollpYQzcr7QeehINEcUxcRVPvygsQbyMbj+966hnL75enwTyNj7f+3SAtp6PIG1PHw4vsnTxaxzxY3F4q3s8o3v1rtUmvthe52L0ovL/YgF85OkrEySLll0ZLM7KC9vFXtyMgYP3oIAbLMKsbNAKGzH0LvJc7tHCXezODQJrBxhArla6pJkxiZcMKELfAnCLwIFhRqZ2ARYfD7VCY4cds0mJmHOSA166OsiEyrzT8wVOdXLPMgVBXVZP+8zIaLuPK5+ITgt5zb7lak4/UEBKCLqFKJdt5F2RM1GvoZlC+3oM+bik9OOIesQjzFw+R6D781UhdCRpJUEUn84WW7mMpyOJrasrzuvs5UlNH9Z6zYy0kDqj4s05KlJKm3uwNVnjGtbzBuicvzJEnk8opnfla6PFJEI+bocVSZ9X5XhQiPPy9SvXmC8Hm8kMPDaYbIf4TqLbwQ6Hcamf1SPF3E/JXBQ5usF0KO0q81Gsa8ih68T+ycKI4ULD5ORsjPkcjssg1b+BkBQsMEQGY9H1J6ApjHGGuzlrUACoIIxJPnlkoI/wAAAAA",
                }}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>Đen</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Image
                source={{
                  uri: "data:image/webp;base64,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",
                }}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>Đen</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
              }}
            >
              <Image
                source={{
                  uri: "data:image/webp;base64,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",
                }}
                style={{ width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>Đen</Text>
            </View>
          </View>
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
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 12, marginLeft: 4 }}>XS</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 12, marginLeft: 4 }}>S</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
              }}
            >
              <Text style={{ fontSize: 12, marginLeft: 4 }}>M</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 6,
              }}
            >
              <Text style={{ fontSize: 12, marginLeft: 4 }}>L</Text>
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
});
