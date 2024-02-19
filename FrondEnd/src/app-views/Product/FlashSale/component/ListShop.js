import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackgroundButtonFlashSale from "../../../../../assets/Svg/BackgroundButtonFlashSale";
const ListShop = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{  }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
        <View 
        style={{marginTop:14,marginRight:20}}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <View>
                  {item.image && (
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        borderRadius: 100
                      }}
                    />
                  )}
                </View>

                <View >
                  <Text style={{ fontSize:12,fontWeight:400,color:'black',marginTop:5}}>
                    {item.name}
                  </Text>
                </View>
              </View>
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
export default ListShop;
