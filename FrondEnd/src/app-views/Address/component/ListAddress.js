import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ListAddress = ({ data, onPress }) => {
  
  const [selectedItem, setSelectedItem] = useState(null);

  const pressItem = (item) => {
    if (selectedItem === item) {
        setSelectedItem(null); // Bỏ chọn nếu mục đã được chọn trước đó
      } else {
        setSelectedItem(item);
      }
      onPress && onPress(item);
  };
  const RadioButtonSvg = (item) => {
    const uncheckedSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" stroke="#BDBCDB"/>
    </svg>
    `;

    // Thay thế bằng mã SVG của hình ảnh được chọn
    const checkedSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11.5" stroke="#1890FF"/>
    <circle cx="12" cy="12" r="5" fill="#1890FF"/>
    </svg>
    `;

    return selectedItem === item ? checkedSvg : uncheckedSvg;
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View
            style={{
              flexDirection: "row",

              padding: 16,
              borderBottomWidth: 0.5,
              borderColor: "#D4D4D4",
              justifyContent:'space-between'
            }}
          >
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => pressItem(item)}>
            <SvgXml xml={RadioButtonSvg(item)} />
            </TouchableOpacity>
            <View style={{ marginLeft: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Text>{item.name}</Text>
                <Text style={{ marginHorizontal: 10 ,color:'#707070'}}>|</Text>
                <Text style={{color:'#707070'}}>{item.phone_number}</Text>
              </View>
              <Text style={{fontSize:12,marginTop:8,color:'#707070'}}>{item.address}</Text>
            </View>
            </View>
            <Text style={{fontSize:12,color:'#1890ff'}}>Sửa</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{}}
    />
  );
};
export default ListAddress;
