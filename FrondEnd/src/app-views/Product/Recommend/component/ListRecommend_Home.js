import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackgroundFreeShip from "../../../../../assets/Svg/BackgroundFreeShip";
import BackgroundFavourite from "../../../../../assets/Svg/BackgroundFavourite";
import AddressSvg from "../../../../../assets/Svg/AddressSvg";
import { useNavigation } from "@react-navigation/native";
const ListRecommend_Home = ({ data, onPress }) => {
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(2); // Giá trị ban đầu của numColumns là 2

  const handleNumColumnsChange = newNumColumns => {
    setNumColumns(newNumColumns); // Cập nhật giá trị của numColumns khi thay đổi
  };

  const pressItem = (item) => {
    navigation.navigate("Detail_Product");
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{marginRight:10}}>
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
                    {item.Price.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    )}
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
    <FlatList
    scrollEnabled={false}
      numColumns={numColumns}
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      key={numColumns.toString()} // Sử dụng giá trị của numColumns làm giá trị key
   
    />
  );
};
export default ListRecommend_Home;
