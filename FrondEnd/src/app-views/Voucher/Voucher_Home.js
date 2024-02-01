import React from "react";
import ListVoucher_Home from "./component/ListVoucher_Home";
import { View } from "react-native";

const Voucher_Home = () => {
  const default_data = [
    {
      title: "Giảm đ50k",
      content: "Cho đơn từ 500k",
    },
    {
      title: "Giảm đ50k",
      content: "Cho đơn từ 500k",
    },
    {
        title: "Giảm đ50k",
        content: "Cho đơn từ 500k",
      },
  ];
  return (
    <View style={{ marginTop: 10 }}>
      <ListVoucher_Home data={default_data} />
    </View>
  );
};
export default Voucher_Home;
