import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import các SVG khác nếu cần
import SearchSvg from "../../../assets/Svg/SearchSvg";
import CameraSvg from "../../../assets/Svg/CameraSvg";
import iconBackSvg from "../../../assets/Svg/iconBackSvg";
import HistorySearchSvg from "../../../assets/Svg/HistorySearchSvg";
import DeleteSvg from "../../../assets/Svg/DeleteSvg";
import downSvg from "../../../assets/Svg/DownSvg"; // Thêm import downSvg nếu không có
import Recommend_Search from "../Product/Recommend/Recommend_Search";

const Search = ({ navigation }) => {
  const [text_search, setTextSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const gotoBack = () => {
    navigation.goBack();
  };
 
  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("searchHistory");
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log("Error loading search history:", error);
    }
  };

  const saveSearchHistory = async (searchKeyword) => {
    try {
      const history = await AsyncStorage.getItem("searchHistory");
      let searchHistory = history ? JSON.parse(history) : [];
      searchHistory.unshift(searchKeyword);
      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(searchHistory)
      );
      setSearchHistory(searchHistory);
      // goToDetailSearch(); // Nếu goToDetailSearch là một hàm bạn muốn gọi, hãy thêm nó vào đây
    } catch (error) {
      console.log("Error saving search history:", error);
    }
  };
  const gotoProductSearch = () => {
    saveSearchHistory(text_search);
    navigation.navigate("Product_Search", { keyword: searchKeyword });
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchHistory");
      setSearchHistory([]);
    } catch (error) {
      console.log("Error clearing search history:", error);
    }
  };

  const renderFooter = () => {
    if (searchHistory.length > 3 && !showAllItems) {
      return (
        <TouchableOpacity onPress={() => setShowAllItems(true)}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text>Xem thêm</Text>
            <SvgXml style={{ marginTop: 3 }} xml={downSvg()} />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const visibleItems = showAllItems
    ? searchHistory
    : searchHistory
    ? searchHistory.slice(0, 3)
    : [];

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
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 8,
              marginTop: 7,
              width: 280,
              borderRadius: 8,
              height: 32,
              alignItems: "center",
              backgroundColor: "#fff",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row",alignItems:'center' }}>
              <SvgXml xml={SearchSvg()} />
              <TextInput
                editable={true}
                style={{ marginLeft: 8 }}
                placeholder="Tìm kiếm sản phẩm"
                value={text_search}
                onChangeText={(text) => {
                  setTextSearch(text);
                  setSearchKeyword(text);
                }}
              />
            </View>
            <SvgXml xml={CameraSvg()} />
          </View>
          <TouchableOpacity
            onPress={
              gotoProductSearch
            }
          >
            <Text style={{ fontSize: 14, fontWeight: 400, color: "#1890ff" }}>
              Tìm kiếm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Content}>
        <Text style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>
          Lịch sử tìm kiếm
        </Text>
        {searchHistory.length > 0 && (
          <View width={"100%"}>
            <FlatList
              data={visibleItems}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setTextSearch(item)}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 8,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <SvgXml
                        style={{ marginVertical: 3 }}
                        xml={HistorySearchSvg()}
                      />
                      <Text style={{ marginLeft: 3 }}>{item}</Text>
                    </View>
                    <TouchableOpacity
                      style={{ justifyContent: "center" }}
                      onPress={clearSearchHistory}
                    >
                      <SvgXml xml={DeleteSvg()} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={renderFooter}
            />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Recommend_Search />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Search;
const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 30,
  },
  Content: {
    height: "100%",
    paddingHorizontal: 16,
  },
});
