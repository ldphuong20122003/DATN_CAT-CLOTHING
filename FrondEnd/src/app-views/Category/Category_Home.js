import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ListCategory_Home from "./component/ListCategory_Home";

const Category_Home = () => {
  const IP = "192.168.1.9";
  const [data,setData]=useState([]);
  const getAPI=()=>{
    return fetch(`http://${IP}:3000/API/Cate`)
    .then((res)=>res.json())
    .then((data)=>setData(data))
    .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    getAPI();
  },[]);
  return (
    <View style={{ marginTop: 10 }}>
      <ListCategory_Home data={data} />
    </View>
  );
};
export default Category_Home;