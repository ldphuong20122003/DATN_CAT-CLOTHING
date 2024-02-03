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
    { key: '2', title: 'Mới nhất' },
    { key: '3', title: 'Bán chạy' },
    { key: '4', title: 'Giá' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <All_Products />;
      case '2':
        return <All_Products />;
      case '3':
        return <All_Products />;
      case '4':
        return <All_Products />;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={{backgroundColor:'#fff'}}>
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
      <ModalFilter visible={visible}>
        <View style={styles.HeaderFilter}>
          <View style={{ width: "98%", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Bộ Lọc</Text>
          </View>
          <TouchableOpacity onPress={()=>setVisible(false)}>
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
              <View
                style={{
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderColor: "#D4D4D4",
                  paddingHorizontal: 4,
                  borderRadius: 6,
                  marginTop: 6,
                }}
              >
                <TextInput placeholder="0đ" />
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
              <View
                style={{
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderColor: "#D4D4D4",
                  paddingHorizontal: 4,
                  borderRadius: 6,
                  marginTop: 6,
                }}
              >
                <TextInput placeholder="0đ" />
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
            <View
              style={{
                width: "30%",
                backgroundColor: "#F6F6F6",
                alignItems: "center",
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                0k - 100k
              </Text>
            </View>
            <View
              style={{
                width: "30%",
                backgroundColor: "#F6F6F6",
                alignItems: "center",
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                100k - 500k
              </Text>
            </View>
            <View
              style={{
                width: "30%",
                backgroundColor: "#F6F6F6",
                alignItems: "center",
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                500k - 1M
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, fontWeight: 600, marginTop: 20 }}>
            Dịch vụ & Khuyến mãi
          </Text>
          <View style={{ flexDirection: "row", marginTop: 12 }}>
            <View
              style={{
                backgroundColor: "#F6F6F6",
                alignItems: "center",
                paddingVertical: 4,
                borderRadius: 4,
                paddingHorizontal: 8,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                Thanh toán Khi nhận hàng
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#F6F6F6",
                alignItems: "center",
                paddingVertical: 4,
                borderRadius: 4,
                paddingHorizontal: 8,
                marginHorizontal: 20,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                Free ship
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#F6F6F6",
                alignItems: "center",
                paddingVertical: 4,
                borderRadius: 4,
                paddingHorizontal: 8,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
                Flash Sale
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, fontWeight: 600, marginTop: 20 }}>
            Thể loại sản phẩm
          </Text>
          <ListCategory_Filter />
        </View>
        </ScrollView>
        <View style={styles.FooterFilter}>
          <View style={{width:'45%',alignItems:'center',borderColor:'#1890ff',borderWidth:1,paddingVertical:8,borderRadius:8}}>
            <Text style={{color:'#1890ff',fontSize:16,fontWeight:600}}>Đặt lại</Text>
          </View>
          <View style={{width:'45%',alignItems:'center',backgroundColor:'#1890ff',paddingVertical:8,borderRadius:8}}>

          <Text style={{color:'#fff',fontSize:16,fontWeight:600}}>Áp dụng</Text>

          </View>
        </View>
      </ModalFilter>
      <View style={styles.Content}>
      <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width:'100%' }}
          lazy={true}
          renderTabBar={props => (
            <TabBar
              {...props}
              
              style={{ backgroundColor: 'white',marginTop:5 }} // Chỉnh style cho thanh tab
              indicatorStyle={{ backgroundColor: '#1890FF' }} // Chỉnh style cho chỉ mục hiện tại
              labelStyle={{
                fontSize: 14,
                fontFamily: 'Roboto',
                fontWeight: '400',
                textTransform: 'none',
                color: '#5A5A5A',
              }}
              activeColor={'#1890FF'}
            />
          )}
        />
      </View>
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
  ContentFilter: { marginTop: 16,marginBottom:50 },
  FooterFilter: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    marginHorizontal:16,justifyContent:'space-between',width:'100%',paddingVertical:8
  },
  Content:{
height:'100%' }
});
