import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Svg, SvgXml } from "react-native-svg";

import CareRightSvg from "../../../../assets/Svg/CareRightSvg";
import UserSWsvg from "../../../../assets/Svg/UserSWsvg";
import PassSvg from "../../../../assets/Svg/PassSvg";
import TransSvg from "../../../../assets/Svg/TransSvg";
import BackSvg from "../../../../assets/Svg/BackSvg";

const Option_Account = ({ navigation }) => {
  const gotoChangeInfor = () => {
    navigation.navigate("Update_Account");
  };
  const gotoChangePass = () => {
    navigation.navigate("Update_Password");
  };
  const gotoTranslate = () => {
    navigation.navigate("Translate_Account");
  };
  const gotoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
              Tùy chọn
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.Content}>
        <TouchableOpacity onPress={gotoChangeInfor}>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F6F6F6",
              borderRadius: 10,
              padding: 10,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml
                  xml={UserSWsvg("black")}
                  style={{ width: 24, height: 24 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "black",
                    marginLeft: 10,
                  }}
                >
                  Chỉnh sửa thông tin cá nhân
                </Text>
              </View>
              <View>
                <SvgXml
                  xml={CareRightSvg("black")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoChangePass}>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F6F6F6",
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={PassSvg()} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "black",
                    marginLeft: 10,
                  }}
                >
                  Đổi mật khẩu
                </Text>
              </View>
              <View>
                <SvgXml xml={CareRightSvg()} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoTranslate}>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F6F6F6",
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={TransSvg()} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "black",
                    marginLeft: 10,
                  }}
                >
                  Ngôn ngữ (Tiếng Việt)
                </Text>
              </View>
              <View>
                <SvgXml xml={CareRightSvg()} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Option_Account;
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
    paddingHorizontal: 16,
  },
});
