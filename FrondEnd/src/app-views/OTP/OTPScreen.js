import React, { useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import TickSvg from "../../../assets/Svg/TickSvg";
import ModalPopups from "../Modal/ModalPopup";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";
import "firebase/auth";
import axios from "axios";
import config from "../../../config";
const IP = config.IP;
import LottieView from "lottie-react-native";

const OTPScreen = ({ navigation, route }) => {
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));
  const [loading, setLoading] = useState(false); // State cho loading
  const [code, setCode] = useState(["", "", "", "", "", ""]); // Mảng lưu mã OTP
  const { phoneNumber } = route.params;
  const { fullname } = route.params;
  const { email } = route.params;
  const { password } = route.params;
  const { verificationId } = route.params;
  const handleRegister = () => {
    // Do something with the registration data
    let formData = {
      FullName: fullname,
      Email: email,
      Phone: phoneNumber,
      Password: password,
      Avatar: "",
      Address: "",
    };
    axios
      .post(`http://${IP}:3000/API/users/add`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleChange = (index, value) => {
    const newCode = [...code]; // Sao chép mảng code
    newCode[index] = value; // Cập nhật giá trị tại index
    setCode(newCode); // Cập nhật mảng code mới
  };
  const hideMiddleDigits = (phoneNumber) => {
    const visibleLength = 2; // Số lượng chữ số hiển thị ở mỗi đầu
    const hiddenLength = phoneNumber.length - visibleLength * 2; // Số lượng chữ số ẩn
    const hiddenDigits = "*".repeat(hiddenLength); // Tạo chuỗi dấu *
    const visibleStart = phoneNumber.slice(0, visibleLength); // Lấy chuỗi số ở đầu
    const visibleEnd = phoneNumber.slice(-visibleLength); // Lấy chuỗi số ở cuối
    return visibleStart + hiddenDigits + visibleEnd; // Kết hợp chuỗi số ở đầu, chuỗi số ẩn và chuỗi số ở cuối
  };
  const hiddenPhoneNumber = hideMiddleDigits(phoneNumber);

  const recaptchaVertifier = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const gotoLogin = () => {navigation.navigate("Login"),setVisible(false)};

  const resendOTP = async () => {};
  const confirmCode = () => {
    setLoading(true);
    if (!code) {
      Alert.alert("Error", "Vui lòng nhập mã OTP để tiếp tục");
      return true;
    }
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code.join("")
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
        setVisible(true);
        handleRegister();
        console.log("Thành công");
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("Mã xác thực không hợp lệ");
      });
  };
  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVertifier}
        firebaseConfig={firebaseConfig}
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 32,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: 400 }}>
          Mã xác thực OTP được gửi quá SĐT
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 700, marginLeft: 5 }}>
          {hiddenPhoneNumber}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          marginTop: 24,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.input}
            textAlign="center"
            keyboardType="number-pad"
            maxLength={1}
            value={code[index]}
            onFocus={() => {
              if (inputRefs[index].current) {
                inputRefs[index].current.setNativeProps({
                  selection: { start: 0, end: 0 },
                });
              }
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && code[index] === "") {
                if (index > 0 && inputRefs[index - 1].current) {
                  inputRefs[index - 1].current.focus();
                }
              } else if (
                code[index].length === 1 &&
                index < inputRefs.length - 1
              ) {
                inputRefs[index + 1].current.focus();
              }
            }}
            onChangeText={(text) => {
              if (text !== "" && index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
              }
              handleChange(index, text);
            }}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: 400 }}>
          Bạn chưa nhận được mã?
        </Text>
        <TouchableOpacity onPress={resendOTP}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 700,
              marginLeft: 5,
              color: "#41B870",
            }}
          >
            Gửi lại mã OTP
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={confirmCode}>
        <View
          style={{
            marginTop: 24,
            marginHorizontal: 20,
            alignItems: "center",
            padding: 12,
            backgroundColor: "#1890FF",
            borderRadius: 6,
          }}
        >
          {loading ? ( // Kiểm tra trạng thái loading để hiển thị hoặc ẩn đi phần tử
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "white", fontSize: 14, fontWeight: 600 }}>
              Xác nhận
            </Text>
          )}
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
            Đăng ký tài khoản thành công
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
export default OTPScreen;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#D4D4D4",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
