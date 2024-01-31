import React from "react";
import { View } from "react-native";
import ListCategory_Home from "./component/ListCategory_Home";
import PhoneSvg from "../../../assets/Svg/PhoneSvg";
import iconHoodieSvg from "../../../assets/Svg/iconHoodieSvg";
import iconTeeSvg from "../../../assets/Svg/iconTeeSvg";
import iconShirtSvg from "../../../assets/Svg/iconShirtSvg";
import iconShortSvg from "../../../assets/Svg/iconShortSvg";
import iconJeanSvg from "../../../assets/Svg/iconJeanSvg";
import iconBomberSvg from "../../../assets/Svg/iconBomberSvg";
import iconJacketSvg from "../../../assets/Svg/iconJacketSvg";

const Category_Home = () => {
  const default_data = [
    {
        icon:iconHoodieSvg(),
      title: "Áo Hoodie",
     
    },
    {
        icon:iconTeeSvg(),
        title: "Áo phông",
     
    },
    {
        icon:iconShirtSvg(),
        title: "Sơ mi",
        
      },
      {
        icon:iconShortSvg(),
        title: "Quần short",
        
      },
      {
        icon:iconJeanSvg(),
        title: "Quần bò",
        
      },
      {
        icon:iconJacketSvg(),
        title: "Áo phao",
        
      },
      {
        icon:iconBomberSvg(),
        title: "Bomber",
        
      },
  ];
  return (
    <View style={{ marginTop: 10 }}>
      <ListCategory_Home data={default_data} />
    </View>
  );
};
export default Category_Home;