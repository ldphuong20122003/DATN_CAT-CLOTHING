import React from "react";
import {
  View,
  Text,
  TextInput,
  Checkbox,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Svg, SvgXml } from "react-native-svg";

import CareLeftSvg from "../../../../assets/Svg/CareLeftSvg";
import Hide_pass from "../../../../assets/Svg/Hide_pass";
import BackSvg from "../../../../assets/Svg/BackSvg";

const Update_Pass = ({ navigation }) => {
  const gotoHome = () => {
    navigation.navigate("BottomTabScreen");
  };
  const goBack = () => {
    navigation.goBack();
  };
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
              Đổi mật khẩu
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.Content}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Mật khẩu hiện tại
          </Text>
          <View
            style={{
              flexDirection: "row",

              padding: 12,
              marginTop: 7,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput placeholder="Nhập mật khẩu hiện tại" />
            <SvgXml xml={Hide_pass()} />
          </View>
        </View>

        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Mật khẩu mới</Text>
          <View
            style={{
              flexDirection: "row",

              padding: 12,
              marginTop: 7,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput placeholder="Nhập mật khẩu mới" />
            <SvgXml xml={Hide_pass()} />
          </View>
        </View>

        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Nhập lại mật khẩu mới
          </Text>
          <View
            style={{
              flexDirection: "row",

              padding: 12,
              marginTop: 7,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput placeholder="Nhập lại mật khẩu mới" />
            <SvgXml xml={Hide_pass()} />
          </View>
        </View>
        <TouchableOpacity onPress={gotoHome}>
          <View
            style={{
              marginTop: 16,
              backgroundColor: "#1890FF",
              alignItems: "center",

              paddingVertical: 12,

              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
              Lưu thay đổi
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Update_Pass;
const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  Content: {
    padding: 16,
  },
});
