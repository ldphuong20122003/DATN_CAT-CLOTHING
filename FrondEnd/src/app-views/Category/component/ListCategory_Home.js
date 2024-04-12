import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import iconTeeSvg from "../../../../assets/Svg/iconTeeSvg";
import iconJeanSvg from "../../../../assets/Svg/iconJeanSvg";
import iconBaloSvg from "../../../../assets/Svg/iconBaloSvg";
import iconBomberSvg from "../../../../assets/Svg/iconBomberSvg";
import iconHoodieSvg from "../../../../assets/Svg/iconHoodieSvg";
import iconJacketSvg from "../../../../assets/Svg/iconJacketSvg";
import iconShirtSvg from "../../../../assets/Svg/iconShirtSvg";
import { useNavigation } from "@react-navigation/native";

const ListCategory_Home = ({ data, onPress }) => {
  const navigation = useNavigation();

  const _renderItem = ({ item, index }) => {
    const pressItem = async () => {
      await navigation.navigate("ProductByCategory", {
        name: item.Name,
      });
    };
    let iconCate = iconTeeSvg;
    if (item.Name === "Quần") {
      iconCate = iconJeanSvg;
    } else if (item.Name === "Balo") {
      iconCate = iconBaloSvg;
    } else if (item.Name === "Áo Hoodie") {
      iconCate = iconHoodieSvg;
    } else if (item.Name === "Bomber") {
      iconCate = iconBomberSvg;
    } else if (item.Name === "Jacket") {
      iconCate = iconJacketSvg;
    } else if (item.Name === "Sơ mi") {
      iconCate = iconShirtSvg;
    }
    return (
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity onPress={pressItem}>
          <View
            style={{
              alignItems: "center",
              width: 60,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#BADEFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SvgXml style={{}} xml={iconCate()} />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#5A5A5A",
                  marginTop: 5,
                }}
              >
                {item.Name}
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
export default ListCategory_Home;
