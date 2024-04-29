import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import BackSvg from "../../../../assets/Svg/BackSvg";
import { SvgXml } from "react-native-svg";
import config from "../../../../config";
import WebView from "react-native-webview";

const IP = config.IP;

const OrderPayment = ({ navigation, route }) => {
    const gotoBack = () => {
        navigation.goBack();
      };
    const {url}=route.params;
    console.log(url);
    

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={BackSvg()} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh toán đơn hàng</Text>
        </View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: "75%",
    height: 100,
  },
  paymentInfoContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  paymentInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  paymentInfoInputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentInfoInput: {
    color: "#000",
    flex: 1,
  },
  orderInfoContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  orderInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  orderInfoInputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  orderInfoInput: {},
  footer: {
    marginHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#1890ff",
    borderRadius: 8,
    marginVertical: 16,
  },
  footerText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default OrderPayment;
