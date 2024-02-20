import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import CheckSvg from "../../../../assets/Svg/CheckSvg";




const ListReNoti = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity onPress={pressItem} style={{marginTop:10,paddingHorizontal:16}}>
        <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={{flexDirection: 'row',alignItems:'center'}}>
              <View>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 20,
                    }}
                  />
                )}
              </View>
           
              <View ml={2} style={{ marginLeft:8}}>
                <Text
                  style={{ color: "#000", fontSize: 14, fontWeight: 400}}
                >
                  {item.title}
                </Text>
                <Text
                  style={{ color: "#5a5a5a", fontSize: 12, fontWeight: 400}}
                >
                  {item.content}
                </Text>
              </View>
             
            </View>
            <View>
              <Text style={{fontSize:10,color:'#707070'}}>16/12</Text>
              
              <View style={{backgroundColor:'#1890ff',width:8,height:8,borderRadius:4,marginLeft:18,marginTop:8}}></View>
            </View>
            </View>
          
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      horizontal={false}
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{}}
    />
  );
};
export default ListReNoti;
