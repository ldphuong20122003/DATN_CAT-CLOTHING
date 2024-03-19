import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackgroundButtonFlashSale from "../../../../../assets/Svg/BackgroundButtonFlashSale";
import { useNavigation } from "@react-navigation/native";
import CareRightSvg from "../../../../../assets/Svg/CareRightSvg";
const ListFlashSale_Home = ({ data, onPress }) => {
  const [renderedItems, setRenderedItems] = useState(4); // Ban đầu chỉ hiển thị 4 sản phẩm

  const navigation = useNavigation();

  const _renderItem = ({ item, index }) => {
    const pressItem = async () => {
      await navigation.navigate("Detail_Product", {
        productId: item.id,
      });
    };
    const PriceSale = item.Price - item.Sale;
    return (
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View
            style={{
              width: 126,
              justifyContent: "center",
              marginTop: 14,
              shadowColor: "#000",
              borderRadius: 4,
              backgroundColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 4,
            }}
          >
            <View style={{ width: 126, justifyContent: "center" }}>
              <View>
                {item.Img && (
                  <Image
                    source={{ uri: item.Img }}
                    style={{
                      height: 140,
                      width: 126,
                      justifyContent: "center",
                    }}
                  />
                )}
              </View>

              <View alignItems={"center"}>
                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}
                >
                  {item.Name}
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 4,
                paddingVertical: 4,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#707070" }}
                >
                  Giá:{" "}
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#ef4444" }}
                >
                  {PriceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <SvgXml xml={BackgroundButtonFlashSale()} />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#fff",
                    position: "absolute",
                  }}
                >
                  Săn ngay
                </Text>
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
        horizontal={true}
        data={data.slice(0, renderedItems)} // Chỉ hiển thị 4 sản phẩm ban đầu
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{}}
      />
    </View>
  );
};
export default ListFlashSale_Home;
