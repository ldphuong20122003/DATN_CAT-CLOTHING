import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import DownSvg from "../../../../../assets/Svg/DownSvg";
const ListProductCart = ({ data, onPress }) => {
  const [isChecked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const pressItem = (item) => {
    onPress && onPress(item);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderBottomWidth: 0.5,
              borderColor: "#D4D4D4",
            }}
          >
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#6AC259" : undefined}
            />
            <View style={{ marginLeft: 12 }}>
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 8,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 400, color: "#2d2d2d" }}>
                {item.name}
              </Text>

              <View
                style={{
                  width: 100,
                  flexDirection: "row",
                  paddingVertical: 4,
                  backgroundColor: "#D4D4D4",
                  paddingHorizontal: 4,
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 10 }}>Phân loại: {""}</Text>
                  <Text style={{ fontSize: 10 }}>
                    {item.color} , {item.size}
                  </Text>
                </View>
                <SvgXml xml={DownSvg()} />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#EF4444",
                  marginTop: 5,
                }}
              >
                {item.price}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 4,
                  marginTop: 5,
                }}
              >
                <TouchableOpacity onPress={handleDecrement}>
                  <Text
                    style={{
                      borderWidth: 0.5,
                      paddingHorizontal: 6,
                      borderColor: "#707070",
                    }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <TextInput
                  placeholder="1"
                  value={quantity.toString()}
                  style={{
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    width: 40,
                    height: 20,
                    fontSize: 12,
                    textAlign: "center",
                    borderColor: "#707070",
                  }}
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    if (!isNaN(value) && value !== "") {
                      setQuantity(parseInt(value));
                    }
                  }}
                />
                <TouchableOpacity onPress={handleIncrement}>
                  <Text
                    style={{
                      borderWidth: 0.5,
                      paddingHorizontal: 6,
                      borderColor: "#707070",
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{}}
    />
  );
};
export default ListProductCart;
