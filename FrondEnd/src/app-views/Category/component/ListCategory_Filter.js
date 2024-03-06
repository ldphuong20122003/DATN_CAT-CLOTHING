import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const ListCategory_Filter = ({ data, onPress }) => {
    const pressItem = (item) => {
      onPress && onPress(item);
    };
    const IP = "192.168.0.103";
    const [dataCate,setDataCate]=useState([]);
    const getAPI=()=>{
      return fetch(`http://${IP}:3000/API/Cate`)
      .then((res)=>res.json())
      .then((data)=>setDataCate(data))
      .catch((err)=>console.log(err))
    }
  
    useEffect(()=>{
      getAPI();
    },[]);
  
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View
            style={{
              alignItems: "center",
           width:100,
              backgroundColor:'#F6F6F6',
              paddingVertical:4,
              borderRadius:6
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "#5A5A5A",
               
              }}
            >
              {item.Name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList 
    horizontal={true}
      data={dataCate}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default ListCategory_Filter;
