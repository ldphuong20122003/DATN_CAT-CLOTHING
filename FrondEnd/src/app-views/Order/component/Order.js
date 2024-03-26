import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ListOrder from "./ListOrder";
import config from "../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const IP = config.IP;

const Order = () => {
  const [userId, setUserId] = useState("");
  const [data,setData]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
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
        const Order = OrderList
          .filter((Order) => Order.id_user === userId)
        setData(Order);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getUserId();
  }, [userId]);
  useEffect(() => {
    fetchOrder();
  }, [userId]);
  return (
  <View>
    <ListOrder data={data}/>
  </View>
  );
};
export default Order;
