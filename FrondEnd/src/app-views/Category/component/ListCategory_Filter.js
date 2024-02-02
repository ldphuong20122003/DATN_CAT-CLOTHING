import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const ListCategory_Filter = ({ data, onPress }) => {
    const pressItem = (item) => {
      onPress && onPress(item);
    };
  const default_data = [
    {
      title: "Áo Hoodie",
    },
    {
      title: "Áo phông",
    },
    {
      title: "Sơ mi",
    },
    {
      title: "Quần short",
    },
    {
      title: "Quần bò",
    },
    {
      title: "Áo phao",
    },
    {
      title: "Bomber",
    },
  ];
  
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
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList 
    horizontal={true}
      data={default_data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default ListCategory_Filter;
