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
import BackSvg from "../../../assets/Svg/BackSvg";
import CheckSvg from "../../../assets/Svg/CheckSvg";
    

const NotificationScreen =({})=>{
    return(
        <SafeAreaView style={{ flex: 0.93 }}>
    <ScrollView style= {{margin: 8}}>
          
        <View style={{backgroundColor: "#1890FF", alignItems : "center",flexDirection: "row", marginTop: 20 ,position: "relative",
    width: "100%",
    height: 40,
    alignSelf: "center"}}>
        <SvgXml xml={BackSvg("white")} />
          <Text style={{ color: "white", fontSize: 25, fontWeight: 380, marginLeft: 120 }}>
            Thông báo
          </Text>
          <SvgXml xml={CheckSvg("white")} style= {{marginLeft: 100}}/> 
        </View> 
        
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner2.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 }}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Voucher
                    </Text> 
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Bạn vừa nhận được 1 voucher  
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner2.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 ,}}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Voucher
                    </Text> 
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Bạn vừa nhận được 1 voucher  
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner2.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 , }}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Voucher
                    </Text> 
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Bạn vừa nhận được 1 voucher  
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner1.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 ,}}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                    Kiện hàng giao thành công
                    </Text> 
                    <Text style={{ fontSize: 14, fontWeight: '400', color: "black", width: 210 }}>
                    Kiện hàng mã SXFH437E837E93 của bạn đã được giao thành công đến bạn 
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner1.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 , }}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                    Kiện hàng giao thành công
                    </Text> 
                    <Text style={{ fontSize: 14, fontWeight: '400', color: "black", width: 210 }}>
                    Kiện hàng mã SXFH437E837E93 của bạn đã được giao thành công đến bạn 
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner1.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 ,}}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                    Kiện hàng giao thành công
                    </Text> 
                    <Text style={{ fontSize: 14, fontWeight: '400', color: "black", width: 210 }}>
                    Kiện hàng mã SXFH437E837E93 của bạn đã được giao thành công đến bạn 
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>

        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner2.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 , }}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Voucher
                    </Text> 
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Bạn vừa nhận được 1 voucher  
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner2.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 , }}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Voucher
                    </Text> 
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        Bạn vừa nhận được 1 voucher  
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner1.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 , }}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                    Kiện hàng giao thành công
                    </Text> 
                    <Text style={{ fontSize: 14, fontWeight: '400', color: "black", width: 210 }}>
                    Kiện hàng mã SXFH437E837E93 của bạn đã được giao thành công đến bạn 
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner1.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 , }}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                    Kiện hàng giao thành công
                    </Text> 
                    <Text style={{ fontSize: 14, fontWeight: '400', color: "black", width: 210 }}>
                    Kiện hàng mã SXFH437E837E93 của bạn đã được giao thành công đến bạn 
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        <View style={styles.Voucher1}>
            <View style={{width: 50, height: 50}}>
                <Image
                    source={require("../../../assets/Banner1.png")}
                    style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 , }}
                />
            </View>
            <View style={{ marginLeft: 10,flexDirection: "row", }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                    Kiện hàng giao thành công
                    </Text> 
                    <Text style={{ fontSize: 14, fontWeight: '400', color: "black", width: 210 }}>
                    Kiện hàng mã SXFH437E837E93 của bạn đã được giao thành công đến bạn 
                    </Text>   
                </View>
                <View style={{marginLeft: 70}}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "black", }}>
                        16/12
                    </Text> 
                    <Text style={{backgroundColor: "#1890FF", marginLeft: 20,marginTop: 5, borderRadius: 1000, width:10, height: 10}}/>   
                </View>                  
          </View>
          <View style={{marginLeft: 150}}><SvgXml xml={CameraSvg()} /></View>
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}
export default NotificationScreen;
const styles = StyleSheet.create({
    
    Hearder: {
        marginTop: 20, fontWeight: "bold", fontSize: 40
    },
    Voucher: {   
      flexDirection: "row",
      backgroundColor: "#fff",
      top: 50,
      left: 32,
      alignItems: "center",
      padding: 8,
      borderRadius: 4

      
    },
    Voucher1: {
        flexDirection: "row",
        marginTop: 30
      },
  });