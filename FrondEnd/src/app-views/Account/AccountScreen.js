import React from "react";
import { View,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    Text,
    ScrollView,
    TouchableOpacity, } from "react-native";
    import { SvgXml } from "react-native-svg";
    import Swiper from "react-native-swiper/src";
    import SearchSvg from "../../../assets/Svg/SearchSvg";
    import CameraSvg from "../../../assets/Svg/CameraSvg";
    import WalletSvg from "../../../assets/Svg/WalletSvg";
    import CareRightSvg from "../../../assets/Svg/CareRightSvg";
    import Voucher_Home from "../Voucher/Voucher_Home";
    import Category_Home from "../Category/Category_Home";
    import FlashSale_Home from "../Product/FlashSale/FlashSale_Home";
    import Recommend_Home from "../Product/Recommend/Recommend_Home";
import Shop from "../Product/FlashSale/Shop";
import Oder_Account from "./Oder_Account";


const AccountScreen =({})=>{
    return(
        <SafeAreaView style={{ flex: 0.93 }}>
     <ScrollView>
        {/* <View style={styles.Banner}>
          <Swiper
            style={styles.wrapper}
            autoplay={true}
            showsPagination={false}
          >
            <View style={styles.slide}>
              <Image
                source={require("../../../assets/Banner1.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../../assets/Banner2.png")}
                style={styles.image}
              />
            </View> */}
            <View style={styles.slide}>
              <Image
                source={require("../../../assets/banner.jpg")}
                style={styles.image}
              />
            </View>
          {/* </Swiper> */}
        {/* </View> */}
        {/* <View style={styles.Header}> */}
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                marginTop: 7,
                width: 310,
                borderRadius: 8,
                height: 32,
                alignItems: "center",
                backgroundColor: "#fff",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <SvgXml xml={SearchSvg()} />
                <TextInput
                  style={{ marginLeft: 8 }}
                  placeholder="Tìm kiếm sản phẩm"
                />
              </View>
              <SvgXml xml={CameraSvg()} />
            </View>
           
          </View> */}
        {/* </View> */}
        <View style={styles.Voucher}>
            <View style={{width: 90, height: 90}}>
                <Image
                    source={require("../../../assets/anhdaidien.jpg")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100}}
                />
            </View>
            <View style={{ marginLeft: 10, marginTop: -30 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white", }}>
                    Lê Hồng Nghinh
                </Text>
            <View style={styles.QuanTri} >
                <Text style={{color: "#1890FF", fontWeight: "bold", fontSize: 14}}>
                    Quản trị viên
                </Text>
            </View>
          </View>
          <View style={{marginLeft: 130}}><SvgXml xml={CareRightSvg("black")} /></View>
        </View>
        
        <View style={styles.Voucher1}>
            <View style={{width: 60, height: 60}}>
                <Image
                    source={require("../../../assets/Banner2.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100}}
                />
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: "black", }}>
                    Đăng ký mở Shop
                </Text>
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CareRightSvg("#1890FF")} /></View>
        </View>
        <View style={styles.Voucher2}>
            <View style={{width: 60, height: 60}}>
                <Image
                    source={require("../../../assets/Banner1.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100}}
                />
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: "black", }}>
                    Kênh quản lí Shop
                </Text>
          </View>
          <View style={{marginLeft: 147}}><SvgXml xml={CareRightSvg("#1890FF")} /></View>
        </View>
        
        <View style={{ marginTop: 160, paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{width: 40, height: 40}}>
                <Image
                    source={require("../../../assets/Storefront.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100}}
                />
            </View>
            <Text style={{ fontSize: 14, fontWeight: 500, color: "black", marginLeft: -210, marginTop: 10 }}>
              Shop liên kết
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "black" }}>
                Xem thêm
              </Text>
              <SvgXml xml={CareRightSvg("black")} />
            </View>
          </View>
          <Shop style={{borderRadius: 100}} />
        </View>
        <View style={{ marginTop: 12, paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center",}}>
          <View style={{width: 40, height: 40}}>
                <Image
                    source={require("../../../assets/ClipboardText.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100}}
                />
            </View>
            <Text style={{ fontSize: 14, fontWeight: 500, color: "black", marginLeft: -210 }}>
              Đơn mua
            </Text>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 12, fontWeight: 400, color: "black" }}
                >
                  Xem lịch sử
                </Text>
                <SvgXml xml={CareRightSvg("black")} />
              </View>
            </TouchableOpacity>
          </View>
          <Oder_Account/>
        </View>
        <View style={{ marginTop: 10, paddingHorizontal: 16 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 14, fontWeight: 500, color: "black" }}>
              Mua lại
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: 400, color: "black" }}>
                Xem thêm
              </Text>
              <SvgXml xml={CareRightSvg("#1890ff")} />
            </View>
          </View>
          <FlashSale_Home />
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '400', color: "black", marginLeft: 10}}>
                    Đã thích
                </Text>
          </View>
          <View style={{marginLeft: 300}}><SvgXml xml={CareRightSvg("black")} /></View>
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '400', color: "black", marginLeft: 10, width: 150}}>
                    Đánh giá của tôi
                </Text>
          </View>
          <View style={{marginLeft: 210}}><SvgXml xml={CareRightSvg("black")} /></View>
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '400', color: "black", marginLeft: 10, width: 150}}>
                    Thiết lập tài khoản
                </Text>
          </View>
          <View style={{marginLeft: 210}}><SvgXml xml={CareRightSvg("black")} /></View>
        </View>

        <View>
            <View style={{ marginLeft: 10, marginTop: 20, marginBottom: 50 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#1890FF", marginLeft: 10}}>
                    Đăng xuất
                </Text>
          </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}
export default AccountScreen;
const styles = StyleSheet.create({
    Banner: {
      position: "relative",
      width: "100%",
      height: 178,
      alignSelf: "center",
    },
    wrapper: {},
    slide: {
      height: 178,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    Header: {
      position: "absolute",
      top: 30,
      paddingHorizontal: 16,
    },
    QuanTri:{
        width: 85,
        fontWeight: 'bold', 
        color: "#1890FF", 
        backgroundColor: "#D1E9FF",
        borderRadius: 5,
    },
    Voucher: {
      flexDirection: "row",
      position: "absolute",
      top: 70,
      left: 20,
      alignItems: "center",
      padding: 8,
      borderRadius: 4,
   
    },
    Voucher1: {
        flexDirection: "row",
      //   backgroundColor: "#D1E9FF",
        position: "absolute",
        top: 190,
        left: 20,
        alignItems: "center",
        padding: 8,
        borderRadius: 4,
      //   shadowColor: "#000",
      //   shadowOffset: {
      //     width: 0,
      //     height: 2,
      //   },
      //   shadowOpacity: 0.25,
      //   shadowRadius: 3.84,
      //   elevation: 5,
      },
      Voucher2: {
        flexDirection: "row",
      //   backgroundColor: "#D1E9FF",
        position: "absolute",
        top: 260,
        left: 20,
        alignItems: "center",
        padding: 8,
        borderRadius: 4,
      //   shadowColor: "#000",
      //   shadowOffset: {
      //     width: 0,
      //     height: 2,
      //   },
      //   shadowOpacity: 0.25,
      //   shadowRadius: 3.84,
      //   elevation: 5,
      },
    Category: {
      flex: 1,
      marginTop: 50,
      backgroundColor: "black",
      height: 200,
      width: "100%",
    },
  });