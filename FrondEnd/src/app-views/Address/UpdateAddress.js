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

const UpdateAddress = ({ navigation, route }) => {
  const [isToggled, setIsToggled] = useState(false); // State để theo dõi trạng thái bật/tắt
  const { item } = route.params;
  const [fullname, setFullName] = useState(""); // State
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  const onToggle = (isOn) => {
    setIsToggled(isOn); // Cập nhật trạng thái dựa vào giá trị isOn
  };
  const gotoBack = () => {
    navigation.goBack();
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
            value={fullname}
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
            value={phone}
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
            value={country}
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
            value={address}
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
        <View style={{marginHorizontal:16,paddingVertical:10,borderWidth:0.5,justifyContent:'center',alignItems:'center',borderRadius:8,borderColor:'#1890ff'}}>
          <Text>Xóa tài khoản</Text>
        </View>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#E2E2E2",
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
                color: "#5A5A5A",
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
