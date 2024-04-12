import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import GGMapSvg from "../../../assets/Svg/GGMapSvg";

const MapViewScreen = ({ navigation }) => {
  // Tạo một state cho vị trí muốn hiển thị
  const location = {
    latitude: 21.0406243,
    longitude: 105.7375137,
    latitudeDelta: 0.01, // Giá trị này quyết định mức độ zoom của bản đồ
    longitudeDelta: 0.01,
  };
  const gotoBack = () => {
    navigation.goBack();
  };
  const openGoogleMaps = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${location.latitude},${location.longitude}`;
    const label = "Cat Export Clothing";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };
  return (
    <View style={{ flex: 1 }}>
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
              Địa chỉ cửa hàng
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <MapView
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          initialRegion={location}
        >
          <Marker coordinate={location}  />
        </MapView>
        <View style={{position:'absolute',width:'100%',backgroundColor:'white',paddingBottom:16,borderBottomRightRadius:16,borderBottomLeftRadius:16, elevation: 2}}>
          <Text style={{paddingHorizontal:16,paddingTop:10,fontSize:18,fontWeight:'600'}}>Cat Export Clothing</Text>
          <Text style={{paddingHorizontal:16,fontSize:14,fontWeight:'400'}}>Số điện thoại: 0987654321</Text>
          <Text style={{paddingHorizontal:16,fontSize:14,fontWeight:'400'}}>Địa chỉ cửa hàng: Trụ sở chính Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</Text>

        </View>
        <TouchableOpacity
          onPress={openGoogleMaps}
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "white",
            padding: 5,
          }}
        >
          <SvgXml xml={GGMapSvg()} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapViewScreen;
const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
});
