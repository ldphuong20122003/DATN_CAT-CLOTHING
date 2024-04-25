import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Text,
} from "react-native";

import { SvgXml } from "react-native-svg";
import Recommend_Noti from "./Recommend_Noti";
import CheckSvg from "../../../assets/Svg/CheckSvg";

const NotificationScreen = ({}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#1890FF",
          alignItems: "center",
          flexDirection: "row",
          paddingTop: 41,
          paddingBottom: 8,
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: 400 }}>
            Thông báo
          </Text>
        </View>
        <SvgXml xml={CheckSvg("white")} />
      </View>
      <View style={{ height: "87%" }}>
        <Recommend_Noti />
      </View>
    </SafeAreaView>
  );
};
export default NotificationScreen;
const styles = StyleSheet.create({
  Hearder: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 40,
  },
  Voucher: {
    flexDirection: "row",
    backgroundColor: "#fff",
    top: 50,
    left: 32,
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
  },
  Voucher1: {
    flexDirection: "row",
    marginTop: 30,
  },
});
