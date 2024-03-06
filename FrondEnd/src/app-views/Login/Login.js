import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import BannerSvg from "../../../assets/Svg/BannerSvg";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import LogoCat from "../../../assets/Svg/LogoCat";
import PhoneSvg from "../../../assets/Svg/PhoneSvg";
import LockSvg from "../../../assets/Svg/LockSvg";
import Checkbox from "expo-checkbox";
import GoogleSvg from "../../../assets/Svg/GoogleSvg";
import FacebookSvg from "../../../assets/Svg/FacebookSvg";
import EyeSvg from "../../../assets/Svg/EyeSvg";
import ForgotPass from "../ForgotPassword/ForgotPass";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IP = "192.168.1.8";
const Login = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false); // State cho loading
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const gotoRegister = () => {
    navigation.navigate("Register");
  };
  const gotoForgotPass = () => {
    navigation.navigate("ForgotPass");
  };
  const gotoHome = () => {
    navigation.navigate("BottomTabScreen");
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (!phoneNumber || !password) {
      alert("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (phoneNumber.length !== 10) {
      alert("Số điện thoại phải có 10 chữ số");
      return false;
    }
    setLoading(true);
    let url_check_login = `http://${IP}:3000/API/users?Phone=` + phoneNumber;
    fetch(url_check_login)
      .then((res) => {
        return res.json();
      })
      .then(async (res_login) => {
        setLoading(false);
        if (res_login.length != 1) {
          Alert.alert(
            "Error",
            "Số điện thoại không đúng. Vui lòng kiểm tra lại"
          );
          return;
        } else {
          let objU = res_login[0];
          if (objU.Password != password) {
            Alert.alert("Error", "Sai Password. Vui lòng kiểm tra lại");
            return;
          } else {
            try {
              await AsyncStorage.setItem("UserId",objU.id);
             
              await AsyncStorage.setItem("InforLogin", JSON.stringify(objU));
              gotoHome();
            } catch (error) {
              console.log(error);
            }
          }
        }
      });
  };
  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center" }}>
        <SvgXml xml={BannerSvg()} />
        <SvgXml style={{ marginTop: 10 }} xml={LogoCat()} />
        <Text style={{ fontSize: 32, fontWeight: 400, marginTop: 9 }}>
          Đăng nhập
        </Text>
      </View>
      <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
        <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
          Số điện thoại
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
          }}
        >
          <SvgXml xml={PhoneSvg()} />
          <TextInput
            style={{ marginLeft: 8 }}
            placeholder="Phone Number"
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 8, marginTop: 7 }}>
        <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
          Mật khẩu
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
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity onPress={toggleShowPassword}>
            <SvgXml xml={EyeSvg()} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          paddingHorizontal: 8,
          justifyContent: "space-between",
        }}
      >
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
            Nhớ mật khẩu
          </Text>
        </View>
        <TouchableOpacity onPress={gotoForgotPass}>
          <Text
            style={{
              marginLeft: 8,
              fontSize: 14,
              fontWeight: 400,
              color: "#1890FF",
            }}
          >
            Quên mật khẩu ?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleLogin()}>
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
          {loading ? ( // Kiểm tra trạng thái loading để hiển thị hoặc ẩn đi phần tử
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
              Đăng nhập
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            marginTop: 30,
            color: "#707070",
            fontSize: 20,
            fontWeight: 400,
          }}
        >
          Hoặc
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <SvgXml xml={GoogleSvg()} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SvgXml xml={FacebookSvg()} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: 30,
        }}
      >
        <Text>Bạn chưa có tài khoản ?</Text>
        <TouchableOpacity onPress={gotoRegister}>
          <Text style={{ color: "#1890FF", marginLeft: 5 }}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;
