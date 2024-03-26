import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ListReNoti from "./component/ListReNoti";
import config from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Recommend_Noti = () => {
  const IP= config.IP
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
  const fetchNotificationIDs = () => {
    setIsLoading(true);
    fetch(`http://${IP}:3000/API/ntf/`)
      .then((res) => res.json())
      .then((NotificationList) => {
        const NotifiIDs = NotificationList
          .filter((Notification) => Notification.id_user === userId)
        setData(NotifiIDs);
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
    fetchNotificationIDs();
  }, [userId]);
 
  return (
    <>
      <View >
        <View
          style={{
         
            borderBottomWidth: 0.5,
            borderColor: "#fff",
            paddingBottom: 7,
          }}
        >
          <ListReNoti data={data}/>
        </View>
      </View>
    </>
  );
};
export default Recommend_Noti;
