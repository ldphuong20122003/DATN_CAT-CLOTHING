import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ListAddress = ({ data, onPress }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation= useNavigation();

  const pressItem = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null); // Hủy chọn nếu mục đã được chọn trước đó
    } else {
      setSelectedItem(item);
    }
    onPress && onPress(item);
  };
  const gotoUpdateAddress=(item)=>{
    navigation.navigate('UpdateAddress',{item:item})
  }

  const RadioButtonSvg = (item) => {
    const uncheckedSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9.5" stroke="#BDBCDB"/>
    </svg>
    `;
  
    const checkedSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11.5" stroke="#1890FF"/>
      <circle cx="12" cy="12" r="5" fill="#1890FF"/>
    </svg>
    `;
  
    return selectedItem === item ? checkedSvg : uncheckedSvg;
  };

  const _renderItem = ({ item, index }) => {
    const addressKeys = Object.keys(item);
    return (
      <View>
        {addressKeys.map((key, i) => {
          if (key !== "id") {
            const address = item[key];
            return (
              <View key={i}>
                <TouchableOpacity onPress={() => pressItem(item)}>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 16,
                      borderBottomWidth: 0.5,
                      borderColor: "#D4D4D4",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", marginBottom: 8 }}
                    >
                      <SvgXml xml={RadioButtonSvg(item)} />
                      <View style={{ marginLeft: 12 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>{address.tennguoinhan}</Text>
                          <Text
                            style={{ marginHorizontal: 10, color: "#707070" }}
                          >
                            |
                          </Text>
                          <Text style={{ color: "#707070" }}>
                            {address.sdtnguoinhan}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 12,
                            marginTop: 8,
                            color: "#707070",
                          }}
                        >
                          {address.diachinhanhang}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => gotoUpdateAddress(item)}>
                    <Text style={{ fontSize: 12, color: "#1890ff" }}>Sửa</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
          return null;
        })}
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

export default ListAddress;
