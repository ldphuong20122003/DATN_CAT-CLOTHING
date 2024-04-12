import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Svg, SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import SearchSvg from "../../../assets/Svg/SearchSvg";
import FilterSvg from "../../../assets/Svg/FilterSvg";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import OrderWaitCF from "./component/OrderWaitCF";
import OrderWaitDelivery from "./component/OrderWaitDelivery";
import OrderWaitShip from "./component/OrderWaitShip";
import OrderDelivered from "./component/OrderDelivered";
import OrderCancelled from "./component/OrderCancelled";
const renderScene = ({ route }) => {
  switch (route.key) {
    case "1":
      return <OrderWaitCF />;
    case "2":
      return <OrderWaitDelivery />;
    case "3":
      return <OrderWaitShip />;
    case "4":
      return <OrderDelivered />;
    case "5":
      return <OrderCancelled />;
    default:
      return null;
  }
};

const HistoryOrder = ({ navigation }) => {
  const gotoBack = () => {
    navigation.goBack();
  };
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "1", title: "Chờ xác nhận" },
    { key: "2", title: "Chờ lấy hàng" },
    { key: "3", title: "Chờ giao hàng" },
    { key: "4", title: "Đã giao" },
    { key: "5", title: "Đã hủy" },
  ]);
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
              Lịch sử đơn hàng
            </Text>
          </View>
          <SvgXml xml={SearchSvg("#fff")} />
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled={true}
            style={{ backgroundColor: "white", width: "100%" }} // Chỉnh style cho thanh tab
            indicatorStyle={{ backgroundColor: "#1890FF" }} // Chỉnh style cho chỉ mục hiện tại
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
  );
};
export default HistoryOrder;
const styles = StyleSheet.create({
  Container: { flex: 1 },
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  Content: {},
});
