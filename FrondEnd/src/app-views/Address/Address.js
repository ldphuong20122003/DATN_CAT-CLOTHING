import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import ListAddress from "./component/ListAddress";
import config from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Address = () => {
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
  return (
    <View>
      <View>
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
      </View>
    </View>
  );
};
export default Address;