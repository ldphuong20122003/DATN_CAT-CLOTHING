import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Svg, SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import AddressSvg from "../../../assets/Svg/AddressSvg";

import iconPaymentMethod from "../../../assets/Svg/iconPaymentMethod";
import CareRightSvg from "../../../assets/Svg/CareRightSvg";
import CarSvg from "../../../assets/Svg/CarSvg";
import OrderSvg from "../../../assets/Svg/OrderSvg";
import ChatSvg from "../../../assets/Svg/ChatSvg";
import iconDollarSvg from "../../../assets/Svg/iconDollarSvg";

const InformationOrder = ({ navigation, route }) => {
  const gotoBack = () => {
    navigation.goBack();
  };
  const item = route.params.item;
  const product = item.product;
  let totalPayment = 0;

 
  for (let i = 0; i < product.length; i++) {
    totalPayment += product[i].tongtien;
  }
  let shippingCost = 0;
  if (item.phuongthucvanchuyen === "Nhanh") {
    shippingCost = 50000;
  } else if (item.phuongthucvanchuyen === "Tiết kiệm") {
    shippingCost = 20000;
  } else if (item.phuongthucvanchuyen === "Hỏa tốc") {
    shippingCost = 70000;
  }
  let VoucherCost = 0;
  if (item.id_voucher === "") {
    VoucherCost = 0;
  } else if (item.id_voucher === "FREESHIP") {
    VoucherCost = 25000;
  } else if (item.id_voucher === "SALE30K") {
    VoucherCost = 30000;
  }else if (item.id_voucher === "SALE50K") {
    VoucherCost = 50000;
  }

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={BackSvg()} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "white",

                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              Thông tin đơn hàng
            </Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.Content}>
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 10,
              borderBottomColor: "#dadada",
            }}
          >
            <SvgXml style={{ marginTop: 4 }} xml={AddressSvg("#1890ff")} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 10 }}>
                  {item.diachinhanhang.fullname}{" "}
                </Text>
                <Text>|</Text>
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  {item.diachinhanhang.phone}
                </Text>
              </View>
              <Text style={{ marginTop: 8, fontSize: 12, color: "#707070" }}>
                {item.diachinhanhang.address}, {item.diachinhanhang.country}
              </Text>
            </View>
          </View>
          {product.map((item) => (
            <View
              key={item.id_product}
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
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
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
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}
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
                    <Text style={{ fontSize: 14, marginLeft: 6 }}>
                      Thành tiền :{" "}
                    </Text>
                    <Text style={{ fontWeight: 600, color: "#EF4444" }}>
                      {(item.price * item.soluong)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View style={{ borderBottomWidth: 10, borderBottomColor: "#DADADA" }}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                paddingHorizontal: 16,
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 0.3,
                borderBottomColor: "#707070",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={iconPaymentMethod()} />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Phương thức thanh toán
                </Text>
              </View>
            </View>
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                {item.phuongthucthanhtoan}
              </Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: 10, borderBottomColor: "#DADADA" }}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                paddingHorizontal: 16,
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 0.3,
                borderBottomColor: "#707070",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={CarSvg()} />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Phương thức vận chuyển
                </Text>
              </View>
            </View>
            <View style={{ padding: 16 }}>
              <Text>{item.phuongthucvanchuyen}</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                paddingHorizontal: 16,
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 0.3,
                borderBottomColor: "#707070",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={OrderSvg()} />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Chi tiết thanh toán
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Mã đơn hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>{item.id}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Thời gian đặt hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                {item.ngaydat}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Tổng tiền hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                {totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  " đ"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Phí vận chuyển
              </Text>

              <Text style={{ fontSize: 12, color: "#707070" }}>
                {shippingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  " đ"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
               Giảm giá
              </Text>

              <Text style={{ fontSize: 12, color: "#707070" }}>
                - {VoucherCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  " đ"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                justifyContent: "space-between",
              }}
            >
              <Text>Tổng thanh toán</Text>
              <Text style={{ color: "#EF4444" }}>
                {item.totalPayment
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.Button}>
          <SvgXml xml={ChatSvg("#1890ff")} />
          <Text style={{ fontSize: 14, fontWeight: 600, marginLeft: 8 }}>
            Liên hệ shop
          </Text>
        </View>
        {item.status ==='Chờ xác nhận'||item.status ==='Chờ lấy hàng'?(<View style={{...styles.Button,marginBottom:16}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginLeft: 8,
              color: "#1890ff",
            }}
          >
            Hủy đơn hàng
          </Text>
        </View>):(<View style={{marginBottom:16}}></View>)}
        
      </ScrollView>
    </View>
  );
};
export default InformationOrder;
const styles = StyleSheet.create({
  Container: { flex: 1 },
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  Content: {},
  Footer: {},
  Button: {
    marginTop: 16,
    marginHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#1890ff",
    borderRadius: 8,
  },
});
