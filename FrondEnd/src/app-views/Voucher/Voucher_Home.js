import React, { useEffect, useState } from "react";
import ListVoucher_Home from "./component/ListVoucher_Home";
import { View } from "react-native";
import config from "../../../config";

const Voucher_Home = () => {
  const IP = config.IP;
  const [data, setData] = useState([]);
  const getAPI = () => {
    return fetch(`http://${IP}:3000/API/Voucher`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.SoLuong !== 0);
        setData(filteredData);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAPI();
  }, []);
  return (
    <View style={{ marginTop: 10 }}>
      <ListVoucher_Home data={data} />
    </View>
  );
};
export default Voucher_Home;
