import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import FourStarSvg from "../../../../assets/Svg/FourStarSvg";
import { Rating } from "react-native-ratings";

const ItemReview = ({ data, onPress }) => {
  const _renderItem = ({ item, index }) => {
    const textComment = item.comment
      ? item.comment
      : "Người dùng chưa viết bình luận.";
    return (
      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{uri: item.avatar_User?item.avatar_User: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCKCDGUeBOA7-l8OT5no5le_n5y8R4yEGwEAR5U5lP4Q&s'}}
            style={{ width: 24, height: 24, borderRadius: 12 }}
          />
          <Text style={{ fontSize: 12, marginLeft: 10 }}>{item.name_User}</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <View style={{ alignItems: "flex-start" }}>
            <Rating
              type="star"
              ratingCount={5}
              startingValue={item.rating} // Set the starting value for the rating
              imageSize={14}
              readonly // Make the rating readonly
            />
          </View>
          <Text style={{ fontSize: 12, color: "#707070", marginTop: 8 }}>
            Phân loại: {item.size}
          </Text>
          <Text style={{ fontSize: 12, marginTop: 8 }}>{textComment}</Text>
        </View>

        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 10, color: "#707070" }}>{item.date} </Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={data} // Chỉ hiển thị 4 sản phẩm ban đầu
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{}}
      />
    </View>
  );
};
export default ItemReview;
