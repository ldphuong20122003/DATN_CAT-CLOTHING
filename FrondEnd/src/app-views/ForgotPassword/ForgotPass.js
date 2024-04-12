import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import config from "../../../config";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";

const ForgotPass = ({ navigation }) => {
  const IP = config.IP;
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaVerifierRef = useRef(null);

  const handleForgotPass = () => {
    if (!phone) {
      Alert.alert("Error", "Vui lòng nhập số điện thoại");
      return false;
    }
    let url_check_login = `http://${IP}:3000/API/users?Phone=` + phone;
    fetch(url_check_login)
      .then((res) => {
        return res.json();
      })
      .then(async (res_login) => {
        if (res_login.length != 1) {
          Alert.alert(
            "Error",
            "Số điện thoại không đúng. Vui lòng kiểm tra lại"
          );
          return;
        } else {
          setLoading(true);
          const fullPhoneNumber = `+84${phone.substring(1)}`; // Thêm mã quốc gia Việt Nam (+84)
          const phoneProvider = new firebase.auth.PhoneAuthProvider();
          try {
            const verificationId = await phoneProvider.verifyPhoneNumber(
              fullPhoneNumber,
              recaptchaVerifierRef.current
            );
            setLoading(false);
            navigation.navigate("OTPForgotPass", {
              phone,
              verificationId,
            });
          } catch (error) {
            console.log("Error sending verification code: ", error);
          }
          setPhone("");
        }
      });
  };
  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}>
      <View style={{ marginTop: 32, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: 700, color: "#5A5A5A" }}>
          Số điện thoại
        </Text>
        <View
          style={{
            marginTop: 9,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderColor: "#8D8D8D",
          }}
        >
          <TextInput
            placeholder="Nhập số điện thoại"
            placeholderTextColor={"#D4D4D4"}
            onChangeText={setPhone}
            value={phone}
          />
        </View>
        <Text
          style={{
            marginTop: 8,
            fontSize: 14,
            fontWeight: 400,
            color: "#707070",
          }}
        >
          Bạn sẽ nhận được một mã OTP được gửi về tin nhắn điện thoại của bạn.
        </Text>
      </View>
      <TouchableOpacity onPress={handleForgotPass}>
        <View
          style={{
            marginTop: 24,
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
              Xác nhận
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifierRef}
        firebaseConfig={firebaseConfig}
      />
    </View>
  );
};
export default ForgotPass;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
