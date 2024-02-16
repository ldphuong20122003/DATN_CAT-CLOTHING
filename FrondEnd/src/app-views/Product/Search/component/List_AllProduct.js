import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackgroundFreeShip from "../../../../../assets/Svg/BackgroundFreeShip";
import BackgroundFavourite from "../../../../../assets/Svg/BackgroundFavourite";
import AddressSvg from "../../../../../assets/Svg/AddressSvg";
const List_AllProduct = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity onPress={pressItem} style={{ alignItems: "center" }}>
          <View
            style={{
              width: 190,
              justifyContent: "center",
              marginTop: 14,
              borderRadius: 1,
           
              backgroundColor: "#fff",
            borderRadius:4,
            
            }}
          >
            <View style={{}}>
              <View>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 178,
                      width: 190,
                    }}
                  />
                )}
              </View>
              <View style={{paddingHorizontal:6}}>
              <View ml={2}>
                <Text
                  style={{ color: "#5a5a5a", fontSize: 12, fontWeight: 400 }}
                >
                  {item.title}
                </Text>
              </View>
              <View ml={2} flexDirection={"row"}>
                <Text
                  style={{
                    width: "50%",
                    color: "#F90D0D",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {item.pricesale}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SvgXml xml={AddressSvg()} />
                  <Text
                    style={{ fontSize: 10, fontWeight: 400, color: "#707070" }}
                  >
                    {item.address}
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 2, flexDirection: "row" }}>
                <Text
                  style={{
                    width: "50%",
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#707070",
                  }}
                >
                  {item.price}
                </Text>
                <View style={{ flexDirection: "row", marginLeft: 30 }}>
                  <Text
                    style={{ fontSize: 10, fontWeight: 400, color: "#707070" }}
                  >
                    {item.sold}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 4,
                paddingVertical: 4,
                alignItems: "center",
              }}
            >
              <View style={{paddingHorizontal:6}}>
                <SvgXml xml={BackgroundFreeShip()} />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#ffff",
                    position: "absolute",
                    marginLeft:6
                  }}
                >
                  Freeship
                </Text>
              </View>
              <View style={{ alignItems: "center", marginLeft: 8 }}>
                <SvgXml xml={BackgroundFavourite()} />
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: 400,
                    color: "#ffff",
                    position: "absolute",
                  }}
                >
                  Yêu thích
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
export default List_AllProduct;
