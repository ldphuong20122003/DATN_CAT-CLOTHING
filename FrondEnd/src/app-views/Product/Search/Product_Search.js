import React, { useEffect } from "react";
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

import * as Animatable from 'react-native-animatable';

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
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: '1', title: 'Tất cả' },
    { key: '2', title: 'Giá tăng dần' },
    { key: '3', title: 'Giá giảm dần' },
    
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <All_Products keyword={keyword} />;
      case '2':
        return <All_Products keyword={keyword} sortBy="ascending"/>;
      case '3':
        return <All_Products keyword={keyword}  sortBy="descending"/>;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView >
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
              width: 300,
              borderRadius: 8,
              height: 32,
              alignItems: "center",
              backgroundColor: "#fff",
              justifyContent: "space-between",
              borderColor: "#1890ff",
              borderWidth: 1,
            }}
          >
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
          <TouchableOpacity onPress={()=>setVisible(true)}>
            <SvgXml xml={FilterSvg()} />
          </TouchableOpacity>
        </View>
      </View>