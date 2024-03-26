import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Svg, SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import AddressSvg from "../../../assets/Svg/AddressSvg";
import iconPaymentMethod from "../../../assets/Svg/iconPaymentMethod";
import CareRightSvg from "../../../assets/Svg/CareRightSvg";
import CarSvg from "../../../assets/Svg/CarSvg";
import OrderSvg from "../../../assets/Svg/OrderSvg";
import ModalPopups from "../Modal/ModalPopup";
import TickSvg from "../../../assets/Svg/TickSvg";
import ListPayment_Product from "../Product/Payment/component/ListPayment_Product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VoucherSvg from "../../../assets/Svg/VoucherSvg";
import moment from "moment";
import Voucher from "../../../assets/Svg/Voucher";
import axios from "axios";
import config from "../../../config";

const Payment = ({ navigation, route }) => {
  const IP = config.IP;
  const gotoBack = () => {
    navigation.goBack();
  };
  const gotoPaymentMethod = () => {
    navigation.navigate("Payment_Method", { paymentMethod: paymentMethod });
  };
  const gotoTransportMethod = () => {
    navigation.navigate("Transport_Method", {
      transportMethod: transportMethod,
    });
  };
  const gotoChooseAddress = () => {
    navigation.navigate("ChooseAddress", { addressorder: addressorder });
  };
  const gotoHome = () => {
    navigation.navigate("BottomTabScreen");
  };
  const gotoInforOder = () => {
    navigation.navigate("Information_Order");
  };
  const gotoVoucher_Payment = () => {
    navigation.navigate("Voucher_Payment", {
      totalPrice: totalPrice,
      voucher: voucher,
    });
  };
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [transportMethod, setTransportMethod] = useState(null);
  const [addressorder, setAddressorder] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const currentDate = moment();
  const getEstimatedDeliveryDate = (option) => {
    const clonedDate = moment(currentDate);

    // Calculate estimated delivery date based on selected shipping method
    switch (option) {
      case "option1": // Tiết kiệm (3 - 5 ngày)
        return (
          clonedDate.add(3, "days").format("DD MMM YYYY") +
          " - " +
          clonedDate.add(5, "days").format("DD MMM YYYY")
        );
      case "option2": // Nhanh (1 - 2 ngày)
        return (
          clonedDate.add(1, "days").format("DD MMM YYYY") +
          " - " +
          clonedDate.add(2, "days").format("DD MMM YYYY")
        );
      case "option3": // Hỏa tốc (ngày hôm nay)
        return clonedDate.format("DD MMM YYYY");
      default:
        return "Ngày dự kiến không xác định";
    }
  };
  const calculateTotalPrice = (products) => {
    let totalPrice = 0;

    // Duyệt qua mỗi sản phẩm trong danh sách
    products.forEach((product) => {
      // Tính giá bán sau khi áp dụng giảm giá (nếu có)
      const salePrice =
        parseInt(product.PriceProduct) - parseInt(product.SaleProduct);

      // Tính tổng tiền hàng của sản phẩm này và cộng vào tổng tiền hàng
      totalPrice += salePrice * product.quantityInCart;
    });

    return totalPrice;
  };
  const totalPrice = calculateTotalPrice(products);
  const calculateTotalPayment = (totalPrice, transportMethod) => {
    let totalPayment = totalPrice;

    // Xử lý phí vận chuyển
    if (transportMethod) {
      switch (transportMethod) {
        case "option1":
          totalPayment += 25000; // Phí vận chuyển khi chọn option1
          break;
        case "option2":
          totalPayment += 35000; // Phí vận chuyển khi chọn option2
          break;
        case "option3":
          totalPayment += 70000; // Phí vận chuyển khi chọn option3
          break;
        default:
          break;
      }
    }
    if (voucher) {
      totalPayment -= voucher.Discount;
    }

    return totalPayment;
  };
  const totalPayment = calculateTotalPayment(totalPrice, transportMethod);

  const handlePayment = () => {
    const docId = generateId();
    let paymentMethodValue = {};
    if (paymentMethod === "option1") {
      paymentMethodValue = { phuongthucthanhtoan: "Thanh toán khi nhận hàng" };
    } else if (paymentMethod === "option2") {
      paymentMethodValue = { phuongthucthanhtoan: "Ví MoMo" };
    }
    let transportMethodValue = {};
    if (transportMethod === "option1") {
      transportMethodValue = { phuongthucvanchuyen: "Tiết kiệm" };
    } else if (transportMethod === "option2") {
      transportMethodValue = { phuongthucvanchuyen: "Nhanh" };
    } else if (transportMethod === "option3") {
      transportMethodValue = { phuongthucvanchuyen: "Hỏa tốc" };
    }
    let formData = {
      id_user: userId,
      product: products.map((product) => ({
        id_product: product.id,
        image: product.ImgProduct,
        size: product.sizeInCart,
        price: product.PriceProduct - product.SaleProduct,
        soluong: product.quantityInCart,
        tongtien:
          product.quantityInCart * (product.PriceProduct - product.SaleProduct),
      })),
      diachinhanhang: addressorder,
      ...paymentMethodValue,
      ...transportMethodValue,
      status: "Chờ xác nhận",
      id_voucher: voucher.id,
      ngaydat: currentDate.format("DD MMM YYYY"),
      totalPayment: totalPayment,
    };
    axios
      .post(`http://${IP}:3000/API/donhang/add`, formData)
      .then((res) => {
        console.log(res);
        setVisible(true);
      })
      .catch((err) => console.log(err));
  };
  console.log();
  useEffect(() => {
    getUserId();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@selected_products");
        const retrievedProducts =
          jsonValue != null ? JSON.parse(jsonValue) : [];
        setProducts(retrievedProducts);
      } catch (error) {
        console.error("Error reading data", error);
      }
    };

    const fetchPaymentMethod = async () => {
      try {
        const storedPaymentMethod = await AsyncStorage.getItem(
          "@payment_method"
        );
        setPaymentMethod(storedPaymentMethod);
      } catch (error) {
        console.error("Error retrieving payment method:", error);
      }
    };

    const fetchTransportMethod = async () => {
      try {
        const storedTransportMethod = await AsyncStorage.getItem(
          "@transport_method"
        );
        setTransportMethod(storedTransportMethod);
      } catch (error) {
        console.error("Error retrieving transport method:", error);
      }
    };
    const fetchAddressOrder = async () => {
      try {
        const storedAddressOrder = await AsyncStorage.getItem("@address_order");
        // Kiểm tra xem storedAddressOrder có tồn tại hay không
        if (storedAddressOrder !== null) {
          // Nếu tồn tại, parse chuỗi JSON thành đối tượng JavaScript và cập nhật giá trị cho state addressOrder
          const addressObject = JSON.parse(storedAddressOrder);
          setAddressorder(addressObject);
        } else {
          // Nếu không tồn tại, xử lý theo logic của bạn
          console.log("Không có địa chỉ đặt hàng được lưu trữ");
        }
      } catch (error) {
        console.error("Error retrieving payment method:", error);
      }
    };
    const fetchVoucher = async () => {
      try {
        const storedVoucher = await AsyncStorage.getItem("@voucher_order");
        if (storedVoucher !== null) {
          // Nếu tồn tại, parse chuỗi JSON thành đối tượng JavaScript và cập nhật giá trị cho state addressOrder
          const voucherObject = JSON.parse(storedVoucher);
          setVoucher(voucherObject);
        } else {
          // Nếu không tồn tại, xử lý theo logic của bạn
          console.log("Không có địa chỉ đặt hàng được lưu trữ");
        }
      } catch (error) {
        console.error("Error retrieving voucher:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchPaymentMethod();
      fetchTransportMethod();
      fetchAddressOrder();
      fetchVoucher();
    });

    fetchProducts();

    return unsubscribe; // Cleanup function
  }, [navigation]);
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
              Thanh toán
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
                  {addressorder && addressorder.fullname}{" "}
                </Text>
                <Text>|</Text>
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  {addressorder && addressorder.phone}
                </Text>
              </View>
              <Text style={{ marginTop: 8, fontSize: 12, color: "#707070" }}>
                {addressorder && addressorder.address},{" "}
                {addressorder && addressorder.country}
              </Text>
            </View>
            <TouchableOpacity onPress={gotoChooseAddress}>
              <Text style={{ fontSize: 12, color: "#1890ff", marginTop: 4 }}>
                Thay đổi
              </Text>
            </TouchableOpacity>
          </View>
          <ListPayment_Product data={products} />
          <View style={{ borderBottomWidth: 10, borderBottomColor: "#DADADA" }}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                paddingHorizontal: 16,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../assets/Voucher.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Voucher
                </Text>
              </View>
              <TouchableOpacity onPress={gotoVoucher_Payment}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {voucher ? (
                    <View
                      style={{
                        borderColor: "#1890ff",
                        borderWidth: 0.5,
                        paddingHorizontal: 4,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "#1890ff" }}>
                        -{" "}
                        {voucher.Discount.toString().replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          "."
                        ) + " đ"}
                      </Text>
                    </View>
                  ) : (
                    <Text>Chọn Voucher</Text>
                  )}
                  <SvgXml xml={CareRightSvg("#1890ff")} />
                </View>
              </TouchableOpacity>
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
                <SvgXml xml={iconPaymentMethod()} />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Phương thức thanh toán
                </Text>
              </View>
              <TouchableOpacity onPress={gotoPaymentMethod}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 12, color: "#1890ff" }}>
                    Thay đổi
                  </Text>
                  <SvgXml xml={CareRightSvg("#1890ff")} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 16 }}>
              {paymentMethod ? (
                <View>
                  {paymentMethod === "option1" && (
                    <Text style={{ fontSize: 12, color: "#707070" }}>
                      Thanh toán khi nhận hàng
                    </Text>
                  )}
                  {paymentMethod === "option2" && (
                    <Text style={{ fontSize: 12, color: "#707070" }}>
                      Ví MoMo
                    </Text>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 12, color: "#707070" }}>
                    Chọn phương thức thanh toán
                  </Text>
                </View>
              )}
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
              <TouchableOpacity onPress={gotoTransportMethod}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 12, color: "#1890ff" }}>
                    Thay đổi
                  </Text>
                  <SvgXml xml={CareRightSvg("#1890ff")} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 16 }}>
              {transportMethod ? (
                <View>
                  {transportMethod === "option1" && (
                    <View>
                      <Text
                        style={{ fontSize: 12, color: "#000", fontWeight: 600 }}
                      >
                        Tiết kiệm
                      </Text>
                      <Text style={{ fontSize: 12, color: "#00C5C1" }}>
                        Nhận hàng dự kiến vào{" "}
                        {getEstimatedDeliveryDate("option1")}{" "}
                      </Text>
                    </View>
                  )}
                  {transportMethod === "option2" && (
                    <View>
                      <Text
                        style={{ fontSize: 12, color: "#000", fontWeight: 600 }}
                      >
                        Nhanh
                      </Text>
                      <Text style={{ fontSize: 12, color: "#00C5C1" }}>
                        Nhận hàng dự kiến vào{" "}
                        {getEstimatedDeliveryDate("option2")}{" "}
                      </Text>
                    </View>
                  )}
                  {transportMethod === "option3" && (
                    <View>
                      <Text
                        style={{ fontSize: 12, color: "#000", fontWeight: 600 }}
                      >
                        Hỏa tốc
                      </Text>
                      <Text style={{ fontSize: 12, color: "#00C5C1" }}>
                        Nhận hàng dự kiến vào{" "}
                        {getEstimatedDeliveryDate("option3")}{" "}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 12, color: "#707070" }}>
                    Chọn phương thức vận chuyển
                  </Text>
                </View>
              )}
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
                Tổng tiền hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
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
              {transportMethod ? (
                <View>
                  {transportMethod === "option1" && (
                    <View>
                      <Text style={{ fontSize: 12, color: "#707070" }}>
                        25.000 đ
                      </Text>
                    </View>
                  )}
                  {transportMethod === "option2" && (
                    <View>
                      <Text style={{ fontSize: 12, color: "#707070" }}>
                        35.000 đ
                      </Text>
                    </View>
                  )}
                  {transportMethod === "option3" && (
                    <View>
                      <Text style={{ fontSize: 12, color: "#707070" }}>
                        70.000 đ
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 12, color: "#707070" }}>
                    Chọn phương thức vận chuyển
                  </Text>
                </View>
              )}
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
              <Text style={{ fontSize: 12, color: "#707070" }}>Giảm giá</Text>
              {voucher ? (
                <View>
                  <Text style={{ fontSize: 12, color: "#707070" }}>
                    -{" "}
                    {voucher.Discount.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    ) + " đ"}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 12, color: "#707070" }}>
                    Chọn phương thức vận chuyển
                  </Text>
                </View>
              )}
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
                {totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  " đ"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={()=>{
        if (paymentMethod === 'option1') {
          handlePayment();
        } else if (paymentMethod === 'option2') {
          console.log('Thanh toán bằng MoMo');
        } else {
          console.log('No payment method selected');
        }
      }}>
        <View style={styles.Footer}>
          <Text style={{ color: "#fff", fontWeight: 600 }}>Thanh toán</Text>
        </View>
      </TouchableOpacity>
      <ModalPopups visible={visible}>
        <View style={{ alignItems: "center" }}>
          <SvgXml xml={TickSvg()} />
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
export default Payment;
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
  Footer: {
    marginHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",

    backgroundColor: "#1890ff",
    borderRadius: 8,
    marginVertical: 16,
  },
});
