import React, { useState, useRef } from "react";
import { SvgXml } from "react-native-svg";
import BannerSvg from "../../../assets/Svg/BannerSvg";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import LogoCat from "../../../assets/Svg/LogoCat";
import PhoneSvg from "../../../assets/Svg/PhoneSvg";
import LockSvg from "../../../assets/Svg/LockSvg";
import EyeSvg from "../../../assets/Svg/EyeSvg";
import UserSvg from "../../../assets/Svg/UserSvg";
import EmailSvg from "../../../assets/Svg/EmailSvg";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";
import Hide_pass from "../../../assets/Svg/Hide_pass";
import LottieView from "lottie-react-native";
import config from "../../../config";

const IP = config.IP;
const Register = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State cho loading
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const recaptchaVerifierRef = useRef(null);
  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!fullname || !email || !phoneNumber || !password) {
      alert("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (phoneNumber.length !== 10) {
      alert("Số điện thoại phải có 10 chữ số");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ");
      return false;
    }
    if (!passwordRegex.test(password)) {
      alert(
        "Mật khẩu phải chứa ít nhất 1 chữ và 1 số, độ dài tối thiểu 8 ký tự"
      );
      return false;
    }
    return true;
  };
  const sendVerification = async () => {
    if (!validateForm()) {
      return;
    }
    let url_check_login = `http://${IP}:3000/API/users?Phone=` + phoneNumber;
    fetch(url_check_login)
      .then((res) => {
        return res.json();
      })
      .then(async (res_login) => {
        if (res_login.length == 1) {
          Alert.alert(
            "Error",
            "Số điện thoại đã được đăng ký. Vui lòng kiểm tra lại"
          );
          return;
        } else {
          setLoading(true); // Bắt đầu loading
          const fullPhoneNumber = `+84${phoneNumber.substring(1)}`; // Thêm mã quốc gia Việt Nam (+84)
          const phoneProvider = new firebase.auth.PhoneAuthProvider();
          try {
            const verificationId = await phoneProvider.verifyPhoneNumber(
              fullPhoneNumber,
              recaptchaVerifierRef.current
            );
            navigation.navigate("OTPScreen", {
              fullname,
              email,
              phoneNumber,
              password,
              verificationId,
            });
          } catch (error) {
            console.log("Error sending verification code: ", error);
          }
          setLoading(false); // Kết thúc loading
          setPhoneNumber("");
        }
      });
  };

  const gotoLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ height: 180, alignItems: "center" }}>
            <LottieView
              source={require("../../../assets/Animation - 1711700040611.json")}
              style={{ width: "100%", height: 210 }}
              autoPlay
              loop
            />
          </View>
          <SvgXml style={{ marginTop: 10 }} xml={LogoCat()} />
          <Text style={{ fontSize: 32, fontWeight: 400, marginTop: 9 }}>
            Đăng ký
          </Text>
        </View>
        <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
          <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
            Fullname
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
            <SvgXml xml={UserSvg()} />
            <TextInput
              style={{ marginLeft: 8 }}
              placeholder="Fullname"
              value={fullname}
              onChangeText={(text) => setFullname(text)}
            ></TextInput>
          </View>
        </View>
        <View style={{ paddingHorizontal: 8, marginTop: 7 }}>
          <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
            Email
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
              <SvgXml xml={EmailSvg()} />
              <TextInput
                style={{ marginLeft: 8 }}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 8, marginTop: 7 }}>
          <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
            Phone
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
              <SvgXml xml={PhoneSvg()} />
              <TextInput
                style={{ marginLeft: 8 }}
                placeholder="Phone Number"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              ></TextInput>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 8, marginTop: 7 }}>
          <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
            Password
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
                value={password}
                onChangeText={(text) => setPassword(text)}
              ></TextInput>
            </View>
            <TouchableOpacity onPress={toggleShowPassword}>
              {showPassword ? (
                <SvgXml xml={Hide_pass()} />
              ) : (
                <SvgXml xml={EyeSvg()} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={sendVerification}>
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
                Đăng ký
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            marginBottom: 30,
          }}
        >
          <Text>Bạn đã có tài khoản ?</Text>
          <TouchableOpacity onPress={gotoLogin}>
            <Text style={{ color: "#1890FF", marginLeft: 5 }}>
              Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifierRef}
          firebaseConfig={firebaseConfig}
        />
      </View>
    </>
  );
};
export default Register;
