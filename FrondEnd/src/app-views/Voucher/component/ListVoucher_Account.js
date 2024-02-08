import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BackgroundVoucherSvg from "../../../../assets/Svg/BackgroundVoucherSvg";
import VoucherSvg from "../../../../assets/Svg/VoucherSvg";
import Voucher from "../../../../assets/Svg/Voucher";

const ListVoucher_Account = ({ data, onPress }) => {
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View
            style={{
              width: "400",
              height: "150",
              flexDirection: "row",
              marginTop: 10,
              backgroundColor: "white",
              paddingVertical: 8,
              alignItems: "center",
            }}
          >
            <SvgXml style={{}} xml={Voucher()} />
            <View style={{ marginLeft: 22 }}>
              <Text style={{ fontSize: 14, fontWeight: 600, color: "#1890FF" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                {item.content}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                {item.date}
              </Text>
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
export default ListVoucher_Account;
