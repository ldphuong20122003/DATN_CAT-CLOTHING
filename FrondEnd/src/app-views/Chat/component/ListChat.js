import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ListChat = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity onPress={pressItem} style={{  }}>
        <View
            style={{
              paddingHorizontal:16,
              paddingVertical:8,
          
              marginTop: 10,
              borderRadius: 1,
              flexDirection:'row',
             
              borderRadius: 4,
              paddingBottom:5,
              alignItems:'center'
            }}
          >
            
              <View>
                {item.avatar && (
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius:30
                    }}
                  />
                )}
              </View>
              <View style={{ paddingHorizontal: 11 }}>
                <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-between'}}>
                  <Text
                    style={{ fontSize: 14, fontWeight: 600 }}
                  >
                    {item.name}
                  </Text>
               
                </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:12,color:'#707070'}}>{item.content}</Text>
                <Text style={{marginHorizontal:5}}>{'-'}</Text>
                <Text style={{fontSize:12,color:'#707070'}}>{item.time}</Text>

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
export default ListChat;
