import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ListCategory_Home = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View
            style={{
              alignItems: "center",
              width:60
            }}
          >
            <View style={{width:40,height:40,borderRadius:10,borderWidth:1,borderColor:'#BADEFF',alignItems:'center',justifyContent:'center'}}>
            <SvgXml style={{}} xml={item.icon} />
            </View>
          
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#5A5A5A",marginTop:5 }}>
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
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{}}
    />
  );
};
export default ListCategory_Home;
