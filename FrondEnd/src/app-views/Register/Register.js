import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import BannerSvg from "../../../assets/Svg/BannerSvg";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LogoCat from "../../../assets/Svg/LogoCat";
import PhoneSvg from "../../../assets/Svg/PhoneSvg";
import LockSvg from "../../../assets/Svg/LockSvg";
import EyeSvg from "../../../assets/Svg/EyeSvg";
import UserSvg from "../../../assets/Svg/UserSvg";
import EmailSvg from "../../../assets/Svg/EmailSvg";

const Register = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);
  const gotoLogin = () => {
    navigation.navigate('Login');
  };
  const gotoOTP = () => {
    navigation.navigate('OTPScreen');
  };
  return (
    <View style={{ flex: 1, width: "100%" ,backgroundColor:'#fff'}}>
      <View style={{ alignItems: "center" }}>
        <SvgXml xml={BannerSvg()} />
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
              secureTextEntry={true}
            ></TextInput>
          </View>
          <SvgXml xml={EyeSvg()} />
        </View>
      </View>

      <TouchableOpacity onPress={gotoOTP}>
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
            Đăng ký
          </Text>
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
        <Text style={{ color: "#1890FF", marginLeft: 5 }}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Register;
