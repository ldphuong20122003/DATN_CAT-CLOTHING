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
        <TouchableOpacity onPress={pressItem} style={{marginTop: 15}}>
          
            <View style={{flexDirection: 'row'}}>
              <View>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 100,
                    }}
                  />
                )}
              </View>
              {/* <View style={{paddingHorizontal:6}}> */}
              <View ml={2} style={{marginTop: 17, marginLeft:10}}>
                <Text
                  style={{ color: "#5a5a5a", fontSize: 12, fontWeight: 400, marginLeft: 10 }}
                >
                  {item.title}
                </Text>
              </View>
              <View ml={2} >
                <Text
                  style={{
                    width: "100%",
                    color: "black",
                    fontSize: 14,
                    fontWeight: 400,
                    marginLeft: 100
                  }}
                >
                  {item.date}
                </Text>
                <Text style={{width:10, height: 10, borderRadius:100, backgroundColor: '#1890FF', marginLeft:130, marginTop:10}}/>
              </View>
            </View>
            {/* </View> */}
          
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
