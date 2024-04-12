import React, { useDebugValue, useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import LockSvg from "../../../assets/Svg/LockSvg";
import EyeSvg from "../../../assets/Svg/EyeSvg";
import ModalPopups from "../Modal/ModalPopup";
import config from "../../../config";
import LottieView from "lottie-react-native";
import Hide_pass from "../../../assets/Svg/Hide_pass";

const IP = config.IP;
const ChangeForgotPass = ({ navigation, route }) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [visible, setVisible] = React.useState(false);
  const [new_pass, setNewPass] = React.useState("");
  const [renew_pass, setRenew_pass] = React.useState("");
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState({
    new_pass: false,
    renew_pass: false,
  });
  const toggleShowPassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };
  const gotoLogin = () => navigation.navigate("Login");
  const { phone } = route.params;
  const getAPI = async () => {
    await fetch(`http://${IP}:3000/API/users?Phone=` + phone)
      .then((res) => res.json())
      .then((data) => setUserId(data[0].id))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAPI();
  }, []);
  const updatePass = async () => {
    if (!new_pass) {
      Alert.alert("Error", "Vui lòng nhập mật khẩu mới");
      return;
    }
    if (!renew_pass) {
      Alert.alert("Error", "Vui lòng nhập lại mật khẩu");
      return;
    }
    if (!passwordRegex.test(new_pass)) {
      Alert.alert(
        "Error",
        "Mật khẩu phải chứa ít nhất 1 chữ và 1 số, độ dài tối thiểu 8 ký tự."
      );
      return;
    }
    if (renew_pass !== new_pass) {
      Alert.alert("Error", "Hai mật khẩu hiện không khớp nhau");
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
            Password: new_pass,
          }),
        }
      );
      setVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}>
      <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
        <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
          Mật khẩu mới
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginTop: 7,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SvgXml xml={LockSvg()} />
            <TextInput
              style={{ marginLeft: 8 }}
              placeholder="Password"
              secureTextEntry={!showPassword.new_pass}
              onChangeText={setNewPass}
              value={new_pass}
            />
          </View>
          <TouchableOpacity onPress={() => toggleShowPassword("new_pass")}>
            {showPassword.new_pass ? (
              <SvgXml xml={Hide_pass()} />
            ) : (
              <SvgXml xml={EyeSvg()} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 8, marginTop: 7 }}>
        <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
          Nhập lại mật khẩu mới
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginTop: 7,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SvgXml xml={LockSvg()} />
            <TextInput
              style={{ marginLeft: 8 }}
              placeholder="Password"
              secureTextEntry={!showPassword.renew_pass}
              value={renew_pass}
              onChangeText={setRenew_pass}
            />
          </View>
          <TouchableOpacity onPress={() => toggleShowPassword("renew_pass")}>
            {showPassword.renew_pass ? (
              <SvgXml xml={Hide_pass()} />
            ) : (
              <SvgXml xml={EyeSvg()} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={updatePass}>
        <View
          style={{
            marginTop: 30,
            backgroundColor: "#1890FF",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 10,
            marginHorizontal: 8,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
            Đổi mật khẩu
          </Text>
        </View>
      </TouchableOpacity>
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
            Đổi mật khẩu thành công
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
            Chuyển tới trang đăng nhập trong vài giây nữa
          </Text>
          <TouchableOpacity onPress={gotoLogin}>
            <View
              style={{
                width: 180,
                padding: 15,
                backgroundColor: "#1890FF",
                alignItems: "center",
                marginTop: 30,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                Đi tới trang đăng nhập
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ModalPopups>
    </View>
  );
};
export default ChangeForgotPass;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
