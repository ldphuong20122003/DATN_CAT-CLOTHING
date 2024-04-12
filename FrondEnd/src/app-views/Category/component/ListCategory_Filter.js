import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import config from "../../../../config";

const ListCategory_Filter = ({ data, onPress, onItemClick  }) => {
  const IP = config.IP;
  const [numColumns, setNumColumns] = useState(3);

  const pressItem = (item) => {
    onPress && onPress(item); // Gọi hàm onPress nếu tồn tại
    onItemClick && onItemClick(item); // Gọi hàm onItemClick nếu tồn tại
  };
  const [dataCate, setDataCate] = useState([]);
  const getAPI = () => {
    return fetch(`http://${IP}:3000/API/Cate`)
      .then((res) => res.json())
      .then((data) => setDataCate(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAPI();
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View
            style={{
              alignItems: "center",
              width: 118,
              backgroundColor: "#F6F6F6",
              paddingVertical: 4,
              borderRadius: 6,
              borderWidth:1,
              marginTop:4
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "#5A5A5A",
              }}
            >
              {item.Name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      numColumns={numColumns}
      scrollEnabled={false}
      data={dataCate}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      key={numColumns.toString()} // Sử dụng giá trị của numColumns làm giá trị key
    />
  );
};
export default ListCategory_Filter;
