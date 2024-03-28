import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import iconBackSvg from "../../../../assets/Svg/iconBackSvg";
import SearchSvg from "../../../../assets/Svg/SearchSvg";
import CameraSvg from "../../../../assets/Svg/CameraSvg";
import ListRecommend_Home from "../Recommend/component/ListRecommend_Home";
import config from "../../../../config";

const IP = config.IP;

const ProductByCategory = ({ navigation, route }) => {
  const { name } = route.params;
  const [text_search, setTextSearch] = useState("");
  const [data, setData] = useState([]);

  const gotoBack = () => {
    navigation.goBack();
  };

  const getAPI = () => {
    return fetch(
      `http://${IP}:3000/API/product/getbyCategories/?Categories=${name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAPI();
  }, []);

  const filteredData = data.filter((item) => {
    const itemCategories = item.Name.toLowerCase().trim();
    const searchText = text_search.toLowerCase().trim();
    return itemCategories.includes(searchText);
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.Header}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={iconBackSvg()} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 8,
              marginTop: 7,
              flex: 1,
              marginLeft: 16,
              borderRadius: 8,
              height: 32,
              alignItems: "center",
              backgroundColor: "#fff",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={SearchSvg()} />
              <TextInput
                editable={true}
                style={{ marginLeft: 8 }}
                placeholder="Tìm kiếm sản phẩm"
                value={text_search}
                onChangeText={(text) => {
                  setTextSearch(text);
                }}
              />
            </View>
            <SvgXml xml={CameraSvg()} />
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <ListRecommend_Home data={filteredData} />
      </View>
    </View>
  );
};

export default ProductByCategory;

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 30,
  },
});
