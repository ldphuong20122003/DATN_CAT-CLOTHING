import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import DownSvg from "../../../../../assets/Svg/DownSvg";
import iconDollarSvg from "../../../../../assets/Svg/iconDollarSvg";
const ListPayment_Product = ({ data, onPress }) => {
  const [isChecked, setChecked] = useState(false);
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ borderBottomWidth: 10, borderBottomColor: "#dadada" }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 16,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderBottomWidth: 0.5,
                  borderColor: "#D4D4D4",
                }}
              >
                <View style={{ marginLeft: 12 }}>
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        height: 100,
                        width: 100,
                      }}
                    />
                  )}
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: 400, color: "#2d2d2d" }}
                  >
                    {item.name}
                  </Text>

                  <View
                    style={{
                      width: 100,
                      flexDirection: "row",
                      paddingVertical: 4,
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 10 }}>Phân loại: {""}</Text>
                      <Text style={{ fontSize: 10 }}>
                        {item.color} , {item.size}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#EF4444",
                      marginTop: 5,
                    }}
                  >
                    {item.price}.000 đ
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 16,
                paddingBottom: 16,
                justifyContent:'space-between'
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Số lượng : {item.number} sản phẩm
              </Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <SvgXml xml={iconDollarSvg()}/>
                <Text style={{fontSize:14,marginLeft:6}}>Thành tiền : </Text>
                <Text style={{ fontWeight: 600,color: "#EF4444",}}>{item.price * item.number}.000 đ</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
    scrollEnabled={false}
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{}}
    />
  );
};
export default ListPayment_Product;
