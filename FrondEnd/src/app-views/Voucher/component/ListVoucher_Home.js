import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackgroundVoucherSvg from "../../../../assets/Svg/BackgroundVoucherSvg";
import VoucherSvg from "../../../../assets/Svg/VoucherSvg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../../config";

const ListVoucher_Home = ({ data, onPress }) => {
  const IP = config.IP;
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
  const saveVoucher = async (voucher) => {
    try {
      // Lấy userID từ state hoặc props

      // Lấy danh sách voucher hiện tại từ AsyncStorage
      const existingVouchers = await AsyncStorage.getItem(`Voucher${userId}`);
      let newVoucherList = JSON.parse(existingVouchers);
      if (!newVoucherList) {
        // Nếu không tồn tại, tạo mới một mảng
        newVoucherList = [voucher];
        // Lưu lại vào AsyncStorage
        await AsyncStorage.setItem(
          `Voucher${userId}`,
          JSON.stringify(newVoucherList)
        );
        Alert.alert("Success", "Voucher được lưu thành công");
      } else {
        // Kiểm tra xem voucher này đã tồn tại trong danh sách chưa
        const voucherExists = newVoucherList.some(
          (item) => item.id === voucher.id
        ); // Thay 'id' bằng cách bạn định danh voucher
        if (voucherExists) {
          Alert.alert("Lỗi", "Tài khoản bạn đã có Voucher này.");
        } else {
          // Thêm voucher mới vào danh sách
          newVoucherList.push(voucher);
          // Lưu lại vào AsyncStorage
          await AsyncStorage.setItem(
            `Voucher${userId}`,
            JSON.stringify(newVoucherList)
          );
          Alert.alert("Success", "Voucher được lưu thành công");
        }
      }
    } catch (error) {
      console.log("Error saving voucher:", error);
    }
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={{ marginRight: 8 }}>
        <SvgXml xml={BackgroundVoucherSvg()} />
        <View
          style={{
            width: "100%",
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
          }}
        >
          <SvgXml style={{}} xml={VoucherSvg()} />
          <View style={{ marginLeft: 22, paddingVertical: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: 600, color: "#707070" }}>
              Giảm{" "}
              {item.Discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                " đ"}
            </Text>
            <Text
              style={{
                width: 120,
                fontSize: 10,
                fontWeight: 400,
                color: "#707070",
              }}
            >
              {item.Title}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              marginLeft: "auto",
              borderWidth: 1,
              padding: 4,
              borderRadius: 4,
              borderColor: "#1890ff",
            }}
          >
            <TouchableOpacity onPress={() => saveVoucher(item)}>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#1890FF" }}>
                Lưu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      horizontal={true}
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{}}
    />
  );
};
export default ListVoucher_Home;
