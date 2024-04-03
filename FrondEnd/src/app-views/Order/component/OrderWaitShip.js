import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import ListOrder from "./ListOrder";
import config from "../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const IP = config.IP;

const OrderWaitShip = ({}) => {
  const orderStatus = "Chờ giao hàng";
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const fetchOrder = () => {
    setIsLoading(true);
    fetch(`http://${IP}:3000/API/donhang/`)
      .then((res) => res.json())
      .then((OrderList) => {
        // Lọc danh sách đơn hàng dựa trên trạng thái mong muốn
        const filteredOrders = OrderList.filter(
          (order) => order.id_user === userId && order.status === orderStatus
        );
        setData(filteredOrders);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    fetchOrder();
  }, [userId, orderStatus]);

  return (
    <View>
    {isLoading ? (
      <ActivityIndicator size="large" color="#1890ff" />
    ) : (
      <View>
        <ListOrder data={data} />
      </View>
    )}
  </View>
  );
};
export default OrderWaitShip;
