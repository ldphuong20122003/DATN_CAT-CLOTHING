import React from "react";
import { View } from "react-native";
import ListOder_Accou from "./component/ListOder_Accou";
import PhoneSvg from "../../../assets/Svg/PhoneSvg";
import iconHoodieSvg from "../../../assets/Svg/iconHoodieSvg";
import iconTeeSvg from "../../../assets/Svg/iconTeeSvg";
import iconShirtSvg from "../../../assets/Svg/iconShirtSvg";
import iconShortSvg from "../../../assets/Svg/iconShortSvg";
import iconJeanSvg from "../../../assets/Svg/iconJeanSvg";
import iconBomberSvg from "../../../assets/Svg/iconBomberSvg";
import iconJacketSvg from "../../../assets/Svg/iconJacketSvg";

const Oder_Account = () => {
  const default_data = [
    {
        icon:iconHoodieSvg(),
      title: "Chờ xác nhận",
     
    },
    {
        icon:iconTeeSvg(),
        title: "Chờ giao hàng",
     
    },
    {
        icon:iconShirtSvg(),
        title: "Đã giao",
        
      },
      {
        icon:iconShortSvg(),
        title: "Đã hủy",
        
      },
  ];
  return (
    <View style={{ marginTop: 10 }}>
      <ListOder_Accou data={default_data} />
    </View>
  );
};
export default Oder_Account;