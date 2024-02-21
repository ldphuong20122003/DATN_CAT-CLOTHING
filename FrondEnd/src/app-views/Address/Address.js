import React from "react";
import { View } from "react-native";
import ListAddress from "./component/ListAddress";


const Address = () => {
  const default_data = [
    {
      name:'Đức Phương',
      phone_number: '0987654321',
      address:'123 Sông Hồng , Hai Bà Trưng , Hà Nội'
    },
    {
        name:'Hồng Nghinh',
        phone_number: '0987654321',
        address:'123 Sông Hồng , Hai Bà Trưng , Hà Nội'
    },
    {
        name:'Văn Khanh',
        phone_number: '0987654321',
        address:'123 Sông Hồng , Hai Bà Trưng , Hà Nội'
    }
  ];
  return (
  <View>
     <ListAddress data={default_data}/>
  </View>
  );
};
export default Address;
