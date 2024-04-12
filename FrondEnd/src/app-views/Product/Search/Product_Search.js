import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SvgXml } from "react-native-svg";
import iconBackSvg from "../../../../assets/Svg/iconBackSvg";
import SearchSvg from "../../../../assets/Svg/SearchSvg";
import DeleteSvg from "../../../../assets/Svg/DeleteSvg";
import FilterSvg from "../../../../assets/Svg/FilterSvg";
import { useRoute } from "@react-navigation/native";
import ModalFilter from "../../Modal/ModalFilter";

import * as Animatable from "react-native-animatable";

import ListCategory_Filter from "../../Category/component/ListCategory_Filter";
import All_Products from "./All_Product";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const Product_Search = ({ navigation }) => {
  const gotoBack = () => {
    navigation.goBack();
  };
  const [visible, setVisible] = React.useState(false);
  const route = useRoute();
  const { keyword } = route.params;
  const handleItemClick = (item) => {
    console.log(item.Name);
  };
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "1", title: "Tất cả" },
    { key: "2", title: "Giá tăng dần" },
    { key: "3", title: "Giá giảm dần" },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "1":
        return <All_Products keyword={keyword} />;
      case "2":
        return <All_Products keyword={keyword} sortBy="ascending" />;
      case "3":
        return <All_Products keyword={keyword} sortBy="descending" />;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView>
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
          <View style={{ ...styles.search }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={SearchSvg()} />
              <TextInput
                value={keyword}
                editable={true}
                style={{ marginLeft: 8 }}
              />
            </View>
            <SvgXml xml={DeleteSvg()} />
          </View>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <SvgXml xml={FilterSvg()} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Content}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: "100%" }}
          lazy={true}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{ backgroundColor: "#f2f2f2", marginTop: 5 }}
              indicatorStyle={{ backgroundColor: "#1890FF" }}
              labelStyle={{
                fontSize: 14,
                fontFamily: "Roboto",
                fontWeight: "400",
                textTransform: "none",
                color: "#5A5A5A",
              }}
              activeColor={"#1890FF"}
            />
          )}
        />
      </View>
      {/* <ModalFilter visible={visible}>
        <View style={styles.HeaderFilter}>
          <View style={{ width: "98%", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Bộ Lọc</Text>
          </View>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <SvgXml xml={DeleteSvg()} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.ContentFilter}>
            <Text style={{ fontSize: 14, fontWeight: 600 }}>Khoảng giá</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text>Từ</Text>
                <View style={{ ...styles.inputkhoanggia }}>
                  <TextInput
                    placeholder="0đ"
                    value={priceFrom}
                    onChangeText={(text) => setPriceFrom(text)}
                  />
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  height: 0,
                  width: 20,
                  borderColor: "#D4D4D4",
                  marginTop: 25,
                }}
              ></View>
              <View style={{ width: "40%" }}>
                <Text>Đến </Text>
                <View style={{ ...styles.inputkhoanggia }}>
                  <TextInput
                    placeholder="0đ"
                    value={priceTo}
                    onChangeText={(text) => setPriceTo(text)}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={handleItemPriceClick}
                style={{ ...styles.itemkhoanggia }}
              >
                <Text style={{ ...styles.textkhoanggia }}>0k - 200k</Text>
              </TouchableOpacity>
              <View style={{ ...styles.itemkhoanggia }}>
                <Text style={{ ...styles.textkhoanggia }}>200k - 500k</Text>
              </View>
              <View style={{ ...styles.itemkhoanggia }}>
                <Text style={{ ...styles.textkhoanggia }}>500k - 1M</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, fontWeight: 600, marginTop: 20 }}>
              Thể loại sản phẩm
            </Text>
            <ListCategory_Filter
              onItemClick={(item) => handleItemClick(item)}
            />
          </View>
        </ScrollView>
        <View style={styles.FooterFilter}>
          <View style={{ ...styles.button }}>
            <Text style={{ color: "#1890ff", fontSize: 16, fontWeight: 600 }}>
              Đặt lại
            </Text>
          </View>
          <View style={{ ...styles.button, backgroundColor: "#1890ff" }}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
              Áp dụng
            </Text>
          </View>
        </View>
      </ModalFilter> */}
    </SafeAreaView>
  );
};
export default Product_Search;
const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 30,
    alignItems: "center",
  },
  HeaderFilter: {
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.2,
    paddingBottom: 8,
  },
  ContentFilter: { marginTop: 16, marginBottom: 50 },
  FooterFilter: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
  },
  Content: {
    height: "100%",
  },
  itemkhoanggia: {
    width: "30%",
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  button: {
    width: "45%",
    alignItems: "center",
    borderColor: "#1890ff",
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
  },
  inputkhoanggia: {
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    paddingHorizontal: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  search: {
    flexDirection: "row",
    paddingHorizontal: 8,
    marginTop: 7,
    width: 300,
    borderRadius: 8,
    height: 32,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderColor: "#1890ff",
    borderWidth: 1,
  },
  textkhoanggia: { fontSize: 12, fontWeight: 400, color: "#707070" },
});
