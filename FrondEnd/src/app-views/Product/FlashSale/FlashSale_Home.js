import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ListFlashSale_Home from "./component/ListFlashSale_Home";
import ListReOder from "../ReOrder/component/ListReOder";

const FlashSale_Home = () => {
  const IP = "192.168.138.2";
  const [data, setData] = useState([]);
  const getAPI = () => {
    return fetch(`http://${IP}:3000/API/product`)
      .then((res) => res.json())
      .then((responseData) => {
        const filteredData = responseData.filter((item) => item.Sale !== "0");
        setData(filteredData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAPI();
  }, []);
  return (
    <View style={{}}>
      <ListFlashSale_Home data={data} />
    </View>
  );
};
export default FlashSale_Home;
