import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Checkbox,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Svg, SvgXml } from "react-native-svg";
import CameraSvg from "../../../../assets/Svg/CameraSvg";
import BackSvg from "../../../../assets/Svg/BackSvg";
import ModalPopups from "../../Modal/ModalPopup";
import TickSvg from "../../../../assets/Svg/TickSvg";
import AsyncStorage from "@react-native-async-storage/async-storage";
const IP = "192.168.138.2";
const Update_Account = ({ navigation }) => {
  const gotoHome = () => {
    navigation.navigate("BottomTabScreen");
  };
  const goBack = () => {
    navigation.goBack();
  };
  const [userId, setUserId] = useState("");
  const [data_User, setData_User] = useState([]);
  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
        return fetch(`http://${IP}:3000/API/users/getbyid?id=` + userId)
          .then((res) => res.json())
          .then((data) => setData_User(data))
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    getUserId();
  }, [userId]);
  useEffect(() => {
    if (data_User.length > 0) {
      const user = data_User[0];
      setFullName(user.FullName);
      setEmail(user.Email);
      setAddress(user.Address);
      setPhone(user.Phone);
    }
  }, [data_User]);
  const updateUserInfo = async () => {
    if (!fullname || !email) {
      Alert.alert("Error", "Không được để trống tên và email");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Vui lòng nhập đúng định dạng email");
      return;
    }
    try {
      const response = await fetch(
        `http://${IP}:3000/API/users/update/` + userId,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            FullName: fullname,
            Email: email,
            Address: address,
            Phone: phone,
          }),
        }
      );
      setVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
              Chỉnh sửa thông tin cá nhân
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.Content}>
        <View style={styles.Banner}>
          <View style={styles.slide}>
            <Image
              source={require("../../../../assets/banner.jpg")}
              style={styles.image}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#fff",
              padding: 4,
              borderRadius: 20,
            }}
          >
            <SvgXml xml={CameraSvg()} />
          </View>
          <View
            style={{ position: "absolute", top: 102, left: 160, right: 160 }}
          >
            <Image
              source={require("../../../../assets/anhdaidien.jpg")}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: "#fff",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 4,
              }}
            >
              <SvgXml xml={CameraSvg()} />
            </View>
          </View>
        </View>
        <View style={styles.Infor}>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Tên người dùng
            </Text>
            <View style={{ ...styles.Input }}>
              <TextInput
                placeholder="Nhập tên"
                defaultValue={fullname}
                onChangeText={setFullName}
              />
            </View>
          </View>

          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Email
            </Text>
            <View style={{ ...styles.Input }}>
              <TextInput
                placeholder="Nhập Email"
                defaultValue={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Địa chỉ
            </Text>
            <View style={{ ...styles.Input }}>
              <TextInput
placeholder="Nhập địa chỉ"
                defaultValue={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Số điện thoại
            </Text>
            <View
              style={{
                ...styles.Input,
              }}
            >
              <TextInput
                placeholder="Nhập số điện thoại"
                defaultValue={phone}
                onChangeText={setPhone}
                editable={false}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={updateUserInfo}>
          <View
            style={{
              marginTop: 10,
              backgroundColor: "#1890FF",
              alignItems: "center",
              paddingVertical: 12,
              marginHorizontal: 16,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
              Lưu thay đổi
            </Text>
          </View>
        </TouchableOpacity>
        <ModalPopups visible={visible}>
          <View style={{ alignItems: "center" }}>
            <SvgXml xml={TickSvg()} />
            <Text style={{ color: "#6AC259", fontSize: 16, fontWeight: 600 }}>
              Thay đổi thông tin thành công
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
              Chuyển tới màn hình chính trong vài giây nữa
            </Text>
            <TouchableOpacity onPress={gotoHome}>
              <View
                style={{
                  width: 130,
                  padding: 15,
                  backgroundColor: "#1890FF",
                  alignItems: "center",
                  marginTop: 30,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                  Đi tới trang chủ
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ModalPopups>
      </View>
    </View>
  );
};
export default Update_Account;
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
  image: {
    width: "100%",
    height: 137,
  },
  image: {
    width: "100%",
    height: 137,
  },
  Voucher: {
    position: "absolute",
    borderRadius: 4,
  },
  Infor: {
    marginTop: 42,
    padding: 16,
  },
  Input: {
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
});