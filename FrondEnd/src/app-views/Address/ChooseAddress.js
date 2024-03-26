import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import AddSvg from "../../../assets/Svg/AddSvg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChooseAddress = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const addressorder = route.params.addressorder;

  const gotoBack = () => {
    navigation.goBack();
  };
  const gotoAddAddress = () => {
    navigation.navigate("AddAddress");
  };
  const gotoUpdateAddress = (index, address) => {
    navigation.navigate("UpdateAddress", { index, address });
  };
  const RadioButtonSvg = (address) => {
    const uncheckedSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9.5" stroke="#BDBCDB"/>
    </svg>
    `;

    const checkedSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11.5" stroke="#1890FF"/>
      <circle cx="12" cy="12" r="5" fill="#1890FF"/>
    </svg>
    `;

    return selectedItem === address ? checkedSvg : uncheckedSvg;
  };
  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirm = async () => {
    if (!selectedItem) {
      Alert.alert("Thông báo", "Vui lòng chọn địa chỉ nhận hàng");
      return;
    }
    const selectedItemString = JSON.stringify(selectedItem);

    // Lưu lựa chọn vào AsyncStorage
    try {
      await AsyncStorage.setItem('@address_order', selectedItemString);
      // Chuyển sang màn hình Payment và truyền giá trị selectedOption qua props
      navigation.navigate('Payment', {addressorder: selectedItem });
    } catch (error) {
      console.error('Error saving selected shipping method:', error);
    }
  };
  useEffect(() => {
    getUserId();
  }, []);
  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const ListAddressString = await AsyncStorage.getItem(
          `address_${userId}`
        );
        if (ListAddressString !== null) {
          const ListAddressArray = JSON.parse(ListAddressString);
          setData(ListAddressArray);
        }
      } catch (error) {
        console.error("Error fetching addresses from AsyncStorage: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress(); 

    const unsubscribe = navigation.addListener("focus", () => {
      fetchAddress(); // Gọi hàm fetchAddress khi màn hình được focus lại.
    });

    return unsubscribe;
  }, [userId, navigation]); 
  useEffect(() => {
    if (addressorder) {
      const selectedAddress = data.find(address => 
        address.address === addressorder.address &&
        address.country === addressorder.country &&
        address.fullname === addressorder.fullname &&
        address.phone === addressorder.phone
      );
      setSelectedItem(selectedAddress);
    }
  }, [addressorder, data]);
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
            <ActivityIndicator />
          ) : data.length > 0 ? (
            data.map((address, index) => (
              <View
                key={index}
                style={{ paddingHorizontal: 16, paddingVertical: 8 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 8,
                    borderBottomWidth: 0.5,
                    borderColor: "#D4D4D4",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", marginBottom: 8 }}>
                    <TouchableOpacity onPress={() => setSelectedItem(address)}>
                      <SvgXml xml={RadioButtonSvg(address)} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 12 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text>{address.fullname}</Text>
                        <Text
                          style={{ marginHorizontal: 10, color: "#707070" }}
                        >
                          |
                        </Text>
                        <Text style={{ color: "#707070" }}>
                          {address.phone}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 8,
                          color: "#707070",
                        }}
                      >
                        {address.address}, {address.country}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => gotoUpdateAddress(index,address)}>
                    <Text style={{ fontSize: 12, color: "#1890ff" }}>Sửa</Text>
                  </TouchableOpacity>
                 
                </View>
              </View>
            ))
          ) : (
            <Text style={{margin:16}}>Bạn hiện chưa có địa chỉ nào</Text>
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
        <TouchableOpacity onPress={handleConfirm}>
          <View
            style={{
              backgroundColor: "#1890ff",
              marginTop: 16,
              paddingVertical: 10,
              marginHorizontal: 16,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: 600, color: "#fff" }}>Xác nhận</Text>
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
