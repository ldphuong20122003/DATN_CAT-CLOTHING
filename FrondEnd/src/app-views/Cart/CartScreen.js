import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import ProductCart from "../Product/Cart/ProductCart";
import Checkbox from "expo-checkbox";

const CartScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.Header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={goBack}>
            <SvgXml xml={BackSvg()} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                marginLeft: 10,
                fontWeight: "bold",
              }}
            >
              Giỏ hàng
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.Content}>
        <ProductCart />
      </View>
      <View style={styles.Footer}>
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#6AC259" : undefined}
          />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 14,
              fontWeight: 400,
              color: "#5A5A5A",
            }}
          >
            Tất cả
          </Text>
        </View>
        <View
          style={{ height: "100%", flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Text>Tổng thanh toán: {""}</Text>
            <Text style={{ fontWeight: 600, color: "#EF4444" }}>
              1.000.000 đ
            </Text>
          </View>
          <TouchableOpacity>
            <View
              style={{
                height: "100%",
                backgroundColor: "#1890FF",
                justifyContent: "center",
                paddingHorizontal: 12,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: 600 }}>Mua hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default CartScreen;
const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  Content: {},
  Footer: {
    position: "absolute",
    bottom: 0,
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    borderTopWidth: 0.2,
  },
});
