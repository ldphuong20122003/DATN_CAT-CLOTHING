import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import config from "../../../config";
import iconDollarSvg from "../../../assets/Svg/iconDollarSvg";


const Review = ({ navigation, route }) => {
  // Tạo một state cho vị trí muốn hiển thị
  const { item } = route.params;
  const products = item.product;
  const gotoBack = () => {
    navigation.goBack();
  };
  const handleProductPress = (product, itemId) => {
    navigation.navigate("ProductReview", { product, itemId });
  };
  const renderProduct = () => {
    return products.map((item) => (
      <TouchableOpacity
      onPress={() => handleProductPress(item, route.params.item.id)}
        key={`${item.id_product}-${item.size}`} // Sử dụng kết hợp của id_product và size làm khóa duy nhất
        style={{ borderBottomWidth: 0.3, borderBottomColor: "#707070" }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                borderBottomWidth: 0.5,
                borderColor: "#D4D4D4",
              }}
            >
              <View style={{ marginLeft: 12 }}>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: 100,
                    }}
                  />
                )}
              </View>
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#2d2d2d",
                  }}
                >
                  {item.name}
                </Text>

                <View
                  style={{
                    width: 100,
                    flexDirection: "row",
                    paddingVertical: 4,
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 10 }}>Phân loại: {""}</Text>
                    <Text style={{ fontSize: 10 }}>{item.size}</Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#EF4444",
                    marginTop: 5,
                  }}
                >
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                    " đ"}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              paddingBottom: 16,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 12, color: "#707070" }}>
              Số lượng : {item.soluong} sản phẩm
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={iconDollarSvg()} />
              <Text style={{ fontSize: 14, marginLeft: 6 }}>Thành tiền : </Text>
              <Text style={{ fontWeight: 600, color: "#EF4444" }}>
                {(item.price * item.soluong)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={gotoBack}>
          <SvgXml xml={BackSvg()} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá</Text>
      </View>
      <View style={{}}>
        <Text style={{ fontSize: 16, fontWeight: "600", padding: 16 }}>
          Chọn sản phẩm bạn muốn đánh giá
        </Text>
        {renderProduct()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    marginBottom: 24,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productSize: {
    fontSize: 14,
    color: "#707070",
  },
  
});

export default Review;
