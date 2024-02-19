import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const ListOtherProduct = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View style={{ width: 100, justifyContent: "center", marginTop: 4,backgroundColor:'#fff',borderRadius:8 }}>
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
                    style={{ fontSize: 12, fontWeight: 400, color: "black" }}
                  >
                    {item.name}
                  </Text>
                </View>

                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "#ef4444" }}
                >
                  {item.price}
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 400, color: "#707070" }}
                >
                  {item.sold}
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
export default ListOtherProduct;
