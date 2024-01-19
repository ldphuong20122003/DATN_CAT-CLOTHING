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
import Checkbox from "expo-checkbox";
import GoogleSvg from "../../../assets/Svg/GoogleSvg";
import FacebookSvg from "../../../assets/Svg/FacebookSvg";
import EyeSvg from "../../../assets/Svg/EyeSvg";

const Login = () => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={{ alignItems: "center" }}>
        <SvgXml xml={BannerSvg()} />
        <SvgXml style={{ marginTop: 10 }} xml={LogoCat()} />
        <Text style={{ fontSize: 32, fontWeight: 400, marginTop: 9 }}>
          Đăng nhập
        </Text>
      </View>
      <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
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
          }}
        >
          <SvgXml xml={PhoneSvg()} />
          <TextInput
            style={{ marginLeft: 8 }}
            placeholder="Phone Number"
          ></TextInput>
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
            justifyContent:'space-between'
          }}
        >
          <View style={{flexDirection:'row'}}>
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
          <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: 400,color:'#5A5A5A' }}>
            Nhớ mật khẩu
          </Text>
        </View>
        <TouchableOpacity>
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
      <TouchableOpacity>
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
          <Text style={{ color: "#fff",fontSize:16,fontWeight:500 }}>Đăng ký</Text>
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
        <Text style={{ color: "#1890FF", marginLeft: 5 }}>Đăng ký ngay</Text>
      </View>
    </View>
  );
};
export default Login;
