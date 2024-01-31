import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackgroundVoucherSvg from "../../../../assets/Svg/BackgroundVoucherSvg";
import VoucherSvg from "../../../../assets/Svg/VoucherSvg";

const ListVoucher_Home = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <SvgXml xml={BackgroundVoucherSvg()} />
          <View
            style={{
              width: "100%",
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
            }}
          >
            <SvgXml style={{}} xml={VoucherSvg()} />
            <View style={{ marginLeft: 22, paddingVertical: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: 600, color: "#707070" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 10, fontWeight: 400, color: "#707070" }}>
                {item.content}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                marginLeft: "auto",
                borderWidth: 1,
                padding: 4,
                borderRadius: 4,
                borderColor: "#1890ff",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#1890FF" }}>
                Lưu
              </Text>
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
export default ListVoucher_Home;
