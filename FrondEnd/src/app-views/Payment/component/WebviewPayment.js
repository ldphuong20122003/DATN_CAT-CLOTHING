import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import BackSvg from "../../../../assets/Svg/BackSvg";
import { SvgXml } from "react-native-svg";
import config from "../../../../config";
import WebView from "react-native-webview";

import IconTickSvg from "../../../../assets/Svg/IconTickSvg";
import moment from "moment";
import ModalPopups from "../../Modal/ModalPopup";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IP = config.IP;

const WebviewPayment = ({ navigation, route }) => {
  const gotoBack = () => {
    navigation.goBack();
  };
  const gotoHome = () => {
    navigation.navigate("BottomTabScreen");
    setVisible(false);
  };
  const gotoInforOder = () => {
    navigation.navigate("Information_Order", { item: item });
  };
  const currentDate = moment();
  const [item, setItem] = useState(null);

  // Hàm để tạo và lưu item vào state
  const createAndSetItem = (responseData, createdDocumentID) => {
    // Tạo item với createdDocumentID làm giá trị cho trường id
    const newItem = {
      id: createdDocumentID,
      ...responseData,
    };

    // Lưu item vào state
    setItem(newItem);
  };
  const { url } = route.params;
  const [visible, setVisible] = useState(false);

  const userId = route.params.userId;
  const products = route.params.products;
  const addressorder = route.params.addressorder;
  const totalQuantity = route.params.totalQuantity;
  const paymentMethod = route.params.paymentMethod;
  const transportMethod = route.params.transportMethod;
  const voucher = route.params.voucher;
  const totalPayment = route.params.totalPayment;
  const [paymentHandled, setPaymentHandled] = useState(false); // Biến state để kiểm soát việc gọi hàm handlePayment

  const handleWebViewNavigationStateChange = (newState) => {
    if (
      !paymentHandled &&
      newState.url.includes(`http://192.168.1.7:3000/Success`)
    ) {
      // Kiểm tra biến state paymentHandled trước khi gọi hàm handlePayment
      handlePayment();
      setPaymentHandled(true); // Đánh dấu rằng đã xử lý thanh toán
    }
  };
  const removeVoucherById = async (userId, voucherIdToRemove) => {
    try {
      // Lấy dữ liệu của tất cả các voucher của người dùng từ AsyncStorage
      const storedVouchers = await AsyncStorage.getItem(`Voucher${userId}`);

      if (storedVouchers) {
        // Chuyển dữ liệu thành mảng các voucher
        const vouchers = JSON.parse(storedVouchers);

        // Tìm và xóa voucher có id trùng khớp
        const updatedVouchers = vouchers.filter(
          (voucher) => voucher.id !== voucherIdToRemove
        );

        // Lưu lại danh sách voucher sau khi xóa vào AsyncStorage
        await AsyncStorage.setItem(
          `Voucher${userId}`,
          JSON.stringify(updatedVouchers)
        );
      }
    } catch (error) {
      console.error("Lỗi khi xóa voucher:", error);
    }
  };
  const handlePayment = async () => {
    try {
      let paymentMethodValue = {};
      if (paymentMethod === "option1") {
        paymentMethodValue = {
          phuongthucthanhtoan: "Thanh toán khi nhận hàng",
        };
      } else if (paymentMethod === "option2") {
        paymentMethodValue = { phuongthucthanhtoan: "Ví VNPay" };
      }
      let transportMethodValue = {};
      if (transportMethod === "option1") {
        transportMethodValue = { phuongthucvanchuyen: "Tiết kiệm" };
      } else if (transportMethod === "option2") {
        transportMethodValue = { phuongthucvanchuyen: "Nhanh" };
      } else if (transportMethod === "option3") {
        transportMethodValue = { phuongthucvanchuyen: "Hỏa tốc" };
      }
      let voucherId = "";
      const storedVoucher = await AsyncStorage.getItem("@voucher_order");
      if (storedVoucher) {
        const voucherData = JSON.parse(storedVoucher);
        voucherId = voucherData.id;
        // Xóa voucher khỏi AsyncStorage
        await AsyncStorage.removeItem("@voucher_order");
      }

      let formData = {
        id_user: userId,
        product: products.map((product) => ({
          id_product: product.id,
          image: product.ImgProduct,
          name: product.NameProduct,
          size: product.sizeInCart,
          price: product.PriceProduct - product.SaleProduct,
          soluong: product.quantityInCart,
          tongtien:
            product.quantityInCart *
            (product.PriceProduct - product.SaleProduct),
        })),
        diachinhanhang: addressorder,
        tongsanpham: totalQuantity,
        ...paymentMethodValue,
        ...transportMethodValue,
        status: "Chờ xác nhận",
        id_voucher: voucherId,
        ngaydat: currentDate.format("DD MMM YYYY"),
        totalPayment: totalPayment,
      };
      const response = await axios.post(
        `http://${IP}:3000/API/donhang/add`,
        formData
      );
      const createdDocumentID = response.data.split(": ")[1];
      createAndSetItem(formData, createdDocumentID);
      removeVoucherById(userId, voucherId);
      setVisible(true);

      // Lặp qua từng sản phẩm để cập nhật số lượng tồn kho
      for (const product of products) {
        const productId = product.id;
        const sizeOrdered = product.sizeInCart;
        const quantityOrdered = product.quantityInCart;
        const responseProduct = await axios.get(
          `http://${IP}:3000/API/product/?id=${productId}`
        );
        const productData = responseProduct.data[0];
        if (
          productData &&
          productData.Size &&
          productData.Size[sizeOrdered.toString()]
        ) {
          const currentStock = productData.Size[sizeOrdered.toString()];
          if (currentStock >= quantityOrdered) {
            const newStock = currentStock - quantityOrdered;
            productData.Size[sizeOrdered.toString()] = newStock;
            await axios.put(
              `http://${IP}:3000/API/product/update/${productData.id}`,
              { Size: productData.Size }
            );
          }
        }
      }

      // Thêm thông báo khi đơn hàng được đặt thành công
      let data = {
        Img: "",
        Time: currentDate.format("HH:mm DD/MM/YYYY"),
        Title: "Đã đặt",
        TypeNotification: `Đơn hàng với mã đơn ${createdDocumentID} đã được đặt thành công`,
        id_DonHang: createdDocumentID,
        id_user: userId,
      };
      await axios.post(`http://${IP}:3000/API/ntf/add`, data);
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={BackSvg()} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh toán đơn hàng</Text>
        </View>
      </View>

      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />

      <ModalPopups visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: 50, height: 70 }}>
            <LottieView
              source={require("../../../../assets/Animation - 1711695455244.json")}
              style={{ width: "100%" }}
              autoPlay
              loop={false}
            />
          </View>
          <Text style={{ color: "#6AC259", fontSize: 16, fontWeight: 600 }}>
            Đặt hàng thành công
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
            Quay trở lại trang chủ để tiếp tục mua hàng
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <TouchableOpacity onPress={gotoHome}>
              <View
                style={{
                  width: 120,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  borderColor: "#1890FF",
                  alignItems: "center",
                  marginTop: 30,
                  borderRadius: 6,
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{ color: "#1890ff", fontSize: 14, fontWeight: 600 }}
                >
                  Trang chủ
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoInforOder}>
              <View
                style={{
                  width: 130,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  backgroundColor: "#1890FF",
                  alignItems: "center",
                  marginTop: 30,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: "#1890ff",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                  Xem đơn hàng
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopups>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
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

  footer: {
    marginHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#1890ff",
    borderRadius: 8,
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default WebviewPayment;
