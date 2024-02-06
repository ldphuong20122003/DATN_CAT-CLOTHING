import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

import BackgroundFreeShip from "../../../../../assets/Svg/BackgroundFreeShip";
import AddressSvg from "../../../../../assets/Svg/AddressSvg";
import BackgroundFavourite from "../../../../../assets/Svg/BackgroundFavourite";
import FullFavouriteSvg from "../../../../../assets/Svg/FullFavouriteSvg";

const ListRecommend_Favou = ({ data, onPress }) => {
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
              marginTop: 10,
              borderRadius: 1,
              marginRight: 25,
              backgroundColor: "#fff",
              borderRadius: 4,
              paddingBottom:5
            }}
          >
            <View>
              <View>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 178,
                      width: 178,
                    }}
                  />
                )}
              </View>
              <View style={{ paddingHorizontal: 6 }}>
                <View style={{marginLeft:2,flexDirection:'row',marginTop:5,justifyContent:'space-between'}}>
                  <Text
                    style={{ color: "#5a5a5a", fontSize: 12, fontWeight: 400 }}
                  >
                    {item.title}
                  </Text>
                  <SvgXml xml={FullFavouriteSvg()}/>
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
                      style={{
                        fontSize: 10,
                        fontWeight: 400,
                        color: "#707070",
                      }}
                    >
                      {item.address}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#707070",
                    }}
                  >
                    {item.price}
                  </Text>
                  <Image source={require("../../../../../assets/ShoppingCart.png")}/>

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
export default ListRecommend_Favou;
