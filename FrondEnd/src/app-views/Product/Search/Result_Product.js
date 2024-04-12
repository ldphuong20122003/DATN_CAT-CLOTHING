import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

import BackgroundFreeShip from "../../../../assets/Svg/BackgroundFreeShip";
import BackgroundFavourite from "../../../../assets/Svg/BackgroundFavourite";
import AddressSvg from "../../../../assets/Svg/AddressSvg";
import ModalLoading from "../../Modal/ModalLoading";
const Result_Product = ({ data, onPress }) => {
  const [renderedItems, setRenderedItems] = useState(4); // Ban đầu chỉ hiển thị 4 sản phẩm
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const _renderItem = ({ item, index }) => {
    const PriceSale = item.Price - item.Sale;
    const pressItem = async () => {
      await navigation.navigate("Detail_Product", {
        productId: item.id,
      });
    };
    return (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={pressItem} style={{ alignItems: "center" }}>
          <View
            style={{
              width: 185,
              justifyContent: "center",
              marginTop: 14,
              borderRadius: 1,
              backgroundColor: "#fff",
              borderRadius: 4,
            }}
          >
            <View style={{}}>
              <View>
                {item.Img && (
                  <Image
                    source={{ uri: item.Img }}
                    style={{
                      height: 185,
                      width: 185,
                    }}
                  />
                )}
              </View>
              <View style={{ paddingHorizontal: 6 }}>
                <View ml={2} marginTop={5}>
                  <Text
                    style={{ color: "#5a5a5a", fontSize: 12, fontWeight: 400 }}
                  >
                    {item.Name}
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
                    {PriceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    đ
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
                      Hà Nội
                    </Text>
                  </View>
                </View>
                {item.Sale !== "0" ? (
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#707070",
                      textDecorationLine: "line-through",
                    }}
                  >
                    {item.Price.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    )}
                    đ
                  </Text>
                ) : null}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                  alignItems: "center",
                }}
              >
                <View style={{ paddingHorizontal: 6 }}>
                  <SvgXml xml={BackgroundFreeShip()} />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#ffff",
                      position: "absolute",
                      marginLeft: 6,
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
    <View>
      <FlatList
        scrollEnabled={false}
        numColumns={numColumns}
        data={data} // Chỉ hiển thị 4 sản phẩm ban đầu
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        key={numColumns.toString()} // Sử dụng giá trị của numColumns làm giá trị key
      />
      <ModalLoading visible={loading} />
    </View>
  );
};
export default Result_Product;
