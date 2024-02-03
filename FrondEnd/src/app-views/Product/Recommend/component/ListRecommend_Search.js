import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackgroundFreeShip from "../../../../../assets/Svg/BackgroundFreeShip";
import BackgroundFavourite from "../../../../../assets/Svg/BackgroundFavourite";
import AddressSvg from "../../../../../assets/Svg/AddressSvg";
const ListRecommend_Search = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity onPress={pressItem} style={{ alignItems: "center" }}>
          <View
            style={{
              width: 178,
              justifyContent: "center",
              marginTop: 14,
              borderRadius: 1,
              height:80,
              paddingHorizontal:8,
            
           
              backgroundColor: "#fff",
            borderRadius:4,
              shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 4, // Dành cho Android
            }}
          >
            <View style={{}}>
              <View style={{flexDirection:'row'}}>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 60,
                      width: 60,
                    }}
                  />
                )}
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                 <Text
                  style={{ color: "#5a5a5a", fontSize: 12, fontWeight: 400 ,marginLeft:3}}
                >
                  {item.title}
                </Text>
                </View>
              </View>
             
             
          </View>
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
export default ListRecommend_Search;
