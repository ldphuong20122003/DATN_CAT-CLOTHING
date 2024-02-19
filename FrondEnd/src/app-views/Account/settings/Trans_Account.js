import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Svg, SvgXml } from "react-native-svg";
import CheckVSvg from "../../../../assets/Svg/CheckVSvg";
import BackSvg from "../../../../assets/Svg/BackSvg";

const Trans_Account = ({ navigation }) => {
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
              Ngôn ngữ
            </Text>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F6F6F6",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "black",
                marginLeft: 10,
              }}
            >
              Tiếng Việt
            </Text>
          </View>
          <View>
            <SvgXml
              xml={CheckVSvg("black")}
              style={{ width: 24, height: 24 }}
            />
          </View>
        </View>

        <View
          style={{
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",

            backgroundColor: "#F6F6F6",

            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "black",
                marginLeft: 10,
              }}
            >
              English
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",

            backgroundColor: "#F6F6F6",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "black",
                marginLeft: 10,
              }}
            >
              中文
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Trans_Account;
const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
});
