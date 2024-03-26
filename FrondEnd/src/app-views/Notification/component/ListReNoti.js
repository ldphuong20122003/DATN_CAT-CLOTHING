import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const ListReNoti = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={pressItem}
          style={{ marginTop: 10, paddingHorizontal: 16 }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item.Img ? (
              <Image
                source={{ uri: item.Img }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 20,
                }}
              />
            ) : (
              <Image
                source={require("../../../../assets/anhdaidien.jpg")}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 20,
                }}
              />
            )}
            <View
              style={{
                flex: 1,
                marginLeft: 8,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 400 }}>
                {item.Title}
              </Text>
              <Text
                style={{
                  width: 270,
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#707070",
                }}
              >
                {item.TypeNotification}
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: "80%",
              }}
            >
              <Text style={{ fontSize: 12 }}>{item.Time}</Text>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 15,
                  backgroundColor: "#1890ff",
                }}
              ></View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      horizontal={false}
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{}}
    />
  );
};
export default ListReNoti;
