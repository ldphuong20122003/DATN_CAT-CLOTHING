import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
const ListReOder = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginRight:8 }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
        <View 
        style={{width:126,justifyContent:'center',marginTop:14}}>
              <View style={{width:126,justifyContent:'center'}}>
                <View>
                  {item.image && (
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: 140,
                        width: 126,
                        justifyContent: 'center',
                      }}
                    />
                  )}
                </View>

                
                <View alignItems={'center'}>
                  <Text style={{ fontSize:12,fontWeight:400,color:'black'}}>
                    {item.name}
                  </Text>
                </View>      

                <View alignItems={'center'}>
                  <Text style={{ fontSize:12,fontWeight:400,color:'#ef4444'}}>
                    {item.price}
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
export default ListReOder;
