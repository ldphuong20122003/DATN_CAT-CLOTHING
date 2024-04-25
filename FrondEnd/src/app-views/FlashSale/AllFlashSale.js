import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import config from "../../../config";
import ListRecommend_Home from "../Product/Recommend/component/ListRecommend_Home";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
const AllFlashSale = ({ navigation }) => {
  const IP = config.IP;
  const gotoBack = () => {
    navigation.goBack();
  };
  const [data, setData] = useState([]);
  const getAPI = () => {
    return fetch(`http://${IP}:3000/API/product`)
      .then((res) => res.json())
      .then((responseData) => {
        const filteredData = responseData.filter((item) => item.Sale !== "0");
        setData(filteredData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAPI();
  }, []);
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={BackSvg()} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "white",

                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              Sản phẩm đang khuyến mãi
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <ListRecommend_Home data={data} />
      </View>
    </View>
  );
};
export default AllFlashSale;
const styles= StyleSheet.create({
    Container: { flex: 1 },
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
})
