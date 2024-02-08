import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const ListReOder = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View style={{ width: 100, justifyContent: "center", marginTop: 14 }}>
            <View style={{ width: 100, justifyContent: "center" }}>
              <View>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: 100,
                      justifyContent: "center",
                    }}
                  />
                )}
              </View>

              <View style={{ paddingHorizontal: 6 }}>
                <View>
                  <Text
                    style={{ fontSize: 10, fontWeight: 400, color: "black" }}
                  >
                    {item.name}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 10, fontWeight: 400, color: "#ef4444" }}
                  >
                    {item.price}
                  </Text>
                  <Image
                    source={require("../../../../../assets/ShoppingCart.png")}
                  />
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
export default ListReOder;
