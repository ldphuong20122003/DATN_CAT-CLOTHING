import {
  Alert,
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
import CarSvg from "../../../assets/Svg/CarSvg";
import OrderSvg from "../../../assets/Svg/OrderSvg";
import ChatSvg from "../../../assets/Svg/ChatSvg";
import iconDollarSvg from "../../../assets/Svg/iconDollarSvg";
import ModalFilter from "../Modal/ModalFilter";
import DeleteSvg from "../../../assets/Svg/DeleteSvg";
import config from "../../../config";
import moment from "moment";
import axios from "axios";
import ModalPopups from "../Modal/ModalPopup";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IP = config.IP;
const InformationOrder = ({ navigation, route }) => {
  const [cancleOrder, setCancleOrder] = useState(false);
  const gotoBack = () => {
    navigation.replace("History_Order");
  };
  const item = route.params.item;
  const products = route.params.item.product;
  const [selectedOption, setSelectedOption] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dataVoucher, setDataVoucher] = useState([]);
  console.log(dataVoucher);
  const getAPI = () => {
    return fetch(`http://${IP}:3000/API/Voucher`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter(
          (item1) => item1.id == item.id_voucher
        );
        setDataVoucher(filteredData);
      })
      .catch((err) => console.log(err));
  };
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
  useEffect(() => {
    getUserId();
  }, [userId]);
  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  const gotoHome = () => {
    navigation.navigate("BottomTabScreen");
    setCancleOrder(false);
    setVisible(false);
  };
  const currentDate = moment();

  const RadioButtonSvg = (option) => {
    const isChecked = selectedOption === option;
    // Thay thế bằng mã SVG của hình ảnh không được chọn
    const uncheckedSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" stroke="#BDBCDB"/>
    </svg>
    `;

    // Thay thế bằng mã SVG của hình ảnh được chọn
    const checkedSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11.5" stroke="#1890FF"/>
    <circle cx="12" cy="12" r="5" fill="#1890FF"/>
    </svg>
    `;

    return isChecked ? checkedSvg : uncheckedSvg;
  };
  const handleCancleOrder = async () => {
    try {
      const response = await fetch(
        `http://${IP}:3000/API/donhang/update/` + item.id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Đã hủy",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setVisible(true);
      for (const product of products) {
        const productId = product.id_product;
        const sizeOrdered = product.size;
        const quantityOrdered = product.soluong;
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
            const newStock = currentStock + quantityOrdered;
            productData.Size[sizeOrdered.toString()] = newStock;
            await axios.put(
              `http://${IP}:3000/API/product/update/${productData.id}`,
              { Size: productData.Size }
            );
          }
        }
      }
      // Nếu hủy thành công, thêm thông báo
      let data = {
        Img: "",
        Time: currentDate.format("HH:mm DD/MM/YYYY"),
        Title: "Đã hủy",
        TypeNotification: `Đơn hàng với mã đơn ${item.id} đã được hủy thành công`,
        id_DonHang: item.id,
        id_user: item.id_user,
      };
      await axios.post(`http://${IP}:3000/API/ntf/add`, data);
    } catch (error) {
      console.error("Error cancelling order:", error.message);
    }

    const existingVouchers = await AsyncStorage.getItem(`Voucher${userId}`);
let newVoucherList = JSON.parse(existingVouchers) || [];

// Kiểm tra xem dataVoucher có dữ liệu không
if (dataVoucher && dataVoucher.length > 0) {
  // Kiểm tra xem voucher này đã tồn tại trong danh sách chưa
  let voucherExists = false;
  for (const item of newVoucherList) {
    if (item.id === dataVoucher[0].id) {
      voucherExists = true;
      break;
    }
  }
  if (voucherExists) {
    console.log("Tài khoản bạn đã có Voucher này.");
    return;
  }

  // Thêm voucher mới vào danh sách
  newVoucherList.push(dataVoucher[0]);

  // Lưu danh sách voucher mới vào AsyncStorage
  await AsyncStorage.setItem(
    `Voucher${userId}`,
    JSON.stringify(newVoucherList)
  );

  console.log("ok");
} else {
  console.log("Không có dữ liệu voucher.");
}
  };
  // const clearVoucherData = async (userId) => {
  //   try {
  //     await AsyncStorage.removeItem(`Voucher${userId}`);
  //     console.log('Voucher data cleared successfully');
  //   } catch (error) {
  //     console.error('Error clearing voucher data:', error);
  //   }
  // };
  const product = item.product;
  let totalPayment = 0;

  for (let i = 0; i < product.length; i++) {
    totalPayment += product[i].tongtien;
  }
  let shippingCost = 0;
  if (item.phuongthucvanchuyen === "Nhanh") {
    shippingCost = 50000;
  } else if (item.phuongthucvanchuyen === "Tiết kiệm") {
    shippingCost = 25000;
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
  } else if (item.id_voucher === "SALE50K") {
    VoucherCost = 50000;
  }
  useEffect(() => {
    getAPI();
  }, []);
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
                {item.diachinhanhang.address}, {item.diachinhanhang.ward},{" "}
                {item.diachinhanhang.district}, {item.diachinhanhang.city}
              </Text>
            </View>
          </View>
          {product.map((item) => (
            <View
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
            <View style={{ ...styles.title }}>
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
            <View style={{ ...styles.title }}>
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
            <View style={{ ...styles.title }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={OrderSvg()} />
                <Text style={{ marginLeft: 10, color: "#707070" }}>
                  Chi tiết thanh toán
                </Text>
              </View>
            </View>
            <View style={{ ...styles.item }}>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Mã đơn hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>{item.id}</Text>
            </View>
            <View style={{ ...styles.item }}>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Thời gian đặt hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                {item.ngaydat}
              </Text>
            </View>
            <View style={{ ...styles.item }}>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Tổng tiền hàng
              </Text>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                {totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  " đ"}
              </Text>
            </View>
            <View style={{ ...styles.item }}>
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Phí vận chuyển
              </Text>

              <Text style={{ fontSize: 12, color: "#707070" }}>
                {shippingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  " đ"}
              </Text>
            </View>
            <View style={{ ...styles.item }}>
              <Text style={{ fontSize: 12, color: "#707070" }}>Giảm giá</Text>

              <Text style={{ fontSize: 12, color: "#707070" }}>
                -{" "}
                {VoucherCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  " đ"}
              </Text>
            </View>
            <View style={{ ...styles.item }}>
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
        {item.status === "Chờ xác nhận" || item.status === "Chờ lấy hàng" ? (
          <TouchableOpacity
            onPress={() => setCancleOrder(true)}
            style={{ ...styles.Button, marginBottom: 16 }}
          >
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
          </TouchableOpacity>
        ) : (
          <View style={{ marginBottom: 16 }}></View>
        )}
      </ScrollView>
      <ModalFilter visible={cancleOrder}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 0.3,
            paddingBottom: 8,
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Lý do hủy</Text>
          </View>
          <TouchableOpacity onPress={() => setCancleOrder(false)}>
            <SvgXml xml={DeleteSvg()} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleSelect("option1")}
          style={{ ...styles.itemCancle }}
        >
          <SvgXml xml={RadioButtonSvg("option1")} />
          <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 8 }}>
            Tôi không muốn mua nữa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect("option2")}
          style={{ ...styles.itemCancle }}
        >
          <SvgXml xml={RadioButtonSvg("option2")} />
          <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 8 }}>
            Tôi muốn thêm, thay đổi mã giảm giá
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect("option3")}
          style={{ ...styles.itemCancle }}
        >
          <SvgXml xml={RadioButtonSvg("option3")} />
          <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 8 }}>
            Tôi muốn thay đổi sản phẩm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect("option4")}
          style={{ ...styles.itemCancle }}
        >
          <SvgXml xml={RadioButtonSvg("option4")} />
          <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 8 }}>
            Tôi không tìm được lý do hủy phù hợp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancleOrder}
          style={{
            marginTop: 16,
            padding: 16,
            backgroundColor: "#1890ff",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </ModalFilter>
      <ModalPopups visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: 50, height: 70 }}>
            <LottieView
              source={require("../../../assets/Animation - 1711695455244.json")}
              style={{ width: "100%" }}
              autoPlay
              loop={false}
            />
          </View>
          <Text style={{ color: "#6AC259", fontSize: 16, fontWeight: 600 }}>
            Hủy đơn hàng thành công
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
            Quay trở lại trang chủ để tiếp tục mua hàng
          </Text>

          <TouchableOpacity onPress={gotoHome}>
            <View
              style={{
                width: 180,
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderColor: "#1890FF",
                alignItems: "center",
                marginTop: 30,
                borderRadius: 6,
                borderWidth: 1,
              }}
            >
              <Text style={{ color: "#1890ff", fontSize: 14, fontWeight: 600 }}>
                Trang chủ
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ModalPopups>
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  itemCancle: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "#707070",
  },
});
