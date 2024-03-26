import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import ToggleSwitch from "toggle-switch-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateAddress = ({ navigation, route }) => {
  const { index, address } = route.params;
  const [isToggled, setIsToggled] = useState(address.isDefault); // State để theo dõi trạng thái bật/tắt
  const { item } = route.params;
  const [fullname_update, setFullName] = useState(address.fullname); // State
  const [phone_update, setPhone] = useState(address.phone);
  const [country_update, setCountry] = useState(address.country);
  const [address_update, setAddress] = useState(address.address);

  const onToggle = (isOn) => {
    setIsToggled(isOn); // Cập nhật trạng thái dựa vào giá trị isOn
  };
  const gotoBack = () => {
    navigation.goBack();
  };

  const handleDeleteAddress = async () => {
    Alert.alert(
      "Xóa địa chỉ",
      "Bạn có chắc chắn muốn xóa địa chỉ này?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: async () => {
            try {
              const userId = await AsyncStorage.getItem("UserId");
              const addressesString = await AsyncStorage.getItem(
                `address_${userId}`
              );
              if (addressesString !== null) {
                let addressesArray = JSON.parse(addressesString);
                addressesArray = addressesArray.filter(
                  (item, idx) => idx !== index
                );
                await AsyncStorage.setItem(
                  `address_${userId}`,
                  JSON.stringify(addressesArray)
                );
                navigation.goBack();
                Alert.alert("Success", "Đã xóa địa chỉ thành công");
              }
            } catch (error) {
              console.error("Error deleting address: ", error);
              Alert.alert("Error", "Xóa địa chỉ thất bại");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdateAddress = async () => {
    try {
      // Lấy thông tin user id từ AsyncStorage
      const userId = await AsyncStorage.getItem("UserId");

      // Lấy danh sách địa chỉ từ AsyncStorage
      let addressesString = await AsyncStorage.getItem(`address_${userId}`);
      let addressesArray = [];

      // Chuyển đổi dữ liệu từ string thành mảng (nếu có)
      if (addressesString !== null) {
        addressesArray = JSON.parse(addressesString);
      }

      // Cập nhật thông tin địa chỉ tương ứng trong mảng
      addressesArray[index] = {
        fullname: fullname_update,
        phone: phone_update,
        country: country_update,
        address: address_update,
        isDefault: isToggled,
      };

      // Lưu danh sách địa chỉ mới vào AsyncStorage
      await AsyncStorage.setItem(
        `address_${userId}`,
        JSON.stringify(addressesArray)
      );

      // Thông báo cập nhật thành công và quay lại màn hình trước
      Alert.alert("Success", "Đã cập nhật địa chỉ thành công");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating address: ", error);
      Alert.alert("Error", "Cập nhật địa chỉ thất bại");
    }
  };

  return (
    <View style={StyleSheet.Container}>
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
              Thêm địa chỉ mới
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.Content}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#DADADA",
          }}
        >
          <Text style={{ color: "#5A5A5A" }}>Thông tin</Text>
        </View>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <TextInput
            placeholder="Họ và tên"
            placeholderTextColor={"#D4D4D4"}
            value={fullname_update}
            onChangeText={(txt) => setFullName(txt)}
          />
        </View>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <TextInput
            placeholder="Số điện thoại"
            placeholderTextColor={"#D4D4D4"}
            value={phone_update}
            onChangeText={(txt) => setPhone(txt)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#DADADA",
          }}
        >
          <Text style={{ color: "#5A5A5A" }}>Địa chỉ</Text>
        </View>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <TextInput
            placeholder="Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã"
            placeholderTextColor={"#D4D4D4"}
            value={country_update}
            onChangeText={(txt) => setCountry(txt)}
          />
        </View>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <TextInput
            placeholder="Tên đường/Số nhà"
            placeholderTextColor={"#D4D4D4"}
            value={address_update}
            onChangeText={(txt) => setAddress(txt)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#DADADA",
          }}
        >
          <Text style={{ color: "#5A5A5A" }}>Cài đặt</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <Text>Loại địa chỉ</Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "#DADADA",
                borderRadius: 4,
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>Văn phòng</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "#DADADA",
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>Nhà riêng</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Đặt làm địa chỉ mặc định</Text>
          <ToggleSwitch
            isOn={isToggled} // Sử dụng state isToggled để kiểm soát trạng thái bật/tắt
            onColor="#1890ff" // Màu khi toggle được bật
            offColor="#D4D4DE" // Màu khi toggle được tắt
            size="small" // Kích thước của toggle switch
            onToggle={onToggle} // Hàm được gọi khi trạng thái của toggle thay đổi
          />
        </View>
        <TouchableOpacity onPress={handleDeleteAddress}>
          <View
            style={{
              marginHorizontal: 16,
              paddingVertical: 10,
              borderWidth: 0.5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              borderColor: "#1890ff",
            }}
          >
            <Text>Xóa địa chỉ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpdateAddress}>
          <View
            style={{
              backgroundColor: "#1890ff",
              marginTop: 16,
              paddingVertical: 10,
              marginHorizontal: 16,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Hoàn thành
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UpdateAddress;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
});
