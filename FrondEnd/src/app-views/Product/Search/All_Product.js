import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import ListRecommend_Home from "../Recommend/component/ListRecommend_Home";
import config from "../../../../config";

const All_Products = ({ keyword, sortBy }) => {
  const IP = config.IP;
  const [data, setData] = useState([]);
  const getAPI = () => {
    fetch(`http://${IP}:3000/API/product`)
      .then((res) => res.json())
      .then((responseData) => {
        // Lọc dữ liệu ở đây
        const filteredData = responseData.filter((item) => {
          // Chuyển đổi chuỗi `Name` và `keyword` về cùng một định dạng trước khi so sánh
          const itemName = item.Name.toLowerCase().trim();
          const lowerCaseKeyword = keyword.toLowerCase().trim();
          return itemName.includes(lowerCaseKeyword);
        });
        // Cập nhật state data với dữ liệu đã được lọc
        setData(filteredData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAPI();
  }, []);
  const sortData = (data) => {
    switch (sortBy) {
      case "ascending":
        return data.sort((a, b) => parseInt(a.Price-a.Sale) - parseInt(b.Price-b.Sale));
      case "descending":
        return data.sort((a, b) =>parseInt(b.Price-b.Sale) - parseInt(a.Price-a.Sale));
      default:
        return data;
    }
  };
  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <Text
        style={{
          marginTop: 10,
          color: "#1890ff",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Kết quả dành cho bạn
      </Text>
      <View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: "#fff",
            paddingBottom: 7,
          }}
        >
          <ListRecommend_Home data={sortData(data)} />
        </View>
      </View>
    </View>
  );
};
export default All_Products;