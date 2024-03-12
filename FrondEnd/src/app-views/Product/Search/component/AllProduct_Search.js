import React, { useEffect, useState } from "react";
import { View } from "react-native";
import config from "../../../../../config";
import ListRecommend_Home from "../../Recommend/component/ListRecommend_Home";

const AllProduct_Search = ({keyword}) => {
  const IP=config.IP;
  const [data, setData] = useState([]);
  const getAPI = () => {
    fetch(`http://${IP}:3000/API/product`)
      .then((res) => res.json())
      .then((responseData) => {
        // Lọc dữ liệu ở đây
        const filteredData = responseData.filter(item => {
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

  
  return (
    <>
      <View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: "#fff",
            paddingBottom: 7,
          }}
        >
          <ListRecommend_Home data={data} />
        </View>
      </View>
    </>
  );
};
export default AllProduct_Search;
