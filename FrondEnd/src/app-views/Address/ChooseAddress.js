import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import AddSvg from "../../../assets/Svg/AddSvg";
import ListAddress from "./component/ListAddress";
import config from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChooseAddress = ({navigation,route}) => {
  const IP = config.IP;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
        return fetch(`http://${IP}:3000/API/users/?id=` + userIdValue)
          .then((res) => res.json())
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://${IP}:3000/API/Address/?id=` + userId
      );
      const data = await response.json();
      setLoading(false);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getAPI();
    }
  }, [userId]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Gọi hàm getAPI để tải lại dữ liệu
      if (userId) {
        getAPI();
      }
    });
  
    // Hủy lắng nghe sự kiện khi component bị hủy
    return unsubscribe;
  }, [navigation, userId]);


  const gotoBack = () => {
    navigation.goBack();
  };
  const gotoPayment=()=>{
    navigation.navigate('Payment')
  };
  const gotoAddAddress=()=>{
    navigation.navigate('AddAddress')
  }

  return (
    <View style={StyleSheet.Container}>
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
              Chọn địa chỉ nhận hàng
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.Content}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#DADADA",
          }}
        >
          <Text style={{ color: "#5A5A5A" }}>Địa chỉ</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: "#fff",
            paddingBottom: 7,
          }}
        >
          {loading ? (
            <ActivityIndicator /> // Hiển thị trạng thái loading khi đang tải dữ liệu
          ) : data.length > 0 ? (
            <ListAddress data={data} /> // Hiển thị danh sách địa chỉ nếu có dữ liệu
          ) : (
            <Text>Bạn hiện chưa có địa chỉ nào</Text> // Hiển thị thông báo nếu không có dữ liệu
          )}
        </View>
        <TouchableOpacity onPress={gotoAddAddress}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 16,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: "#1890ff",
              borderStyle: "dotted",
            }}
          >
            <SvgXml xml={AddSvg()} />
            <Text style={{ fontSize: 12, color: "#5a5a5a", marginLeft: 8 }}>
              Thêm địa chỉ mới
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoPayment}>
            <View style={{backgroundColor:'#1890ff',marginTop:16,paddingVertical:10,marginHorizontal:16,borderRadius:8,alignItems:'center'}}>
                <Text style={{fontWeight:600,color:'#fff'}}>Xác nhận</Text>
            </View>
        </TouchableOpacity>
      </View> 
    </View>
  );
};
export default ChooseAddress;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
});
