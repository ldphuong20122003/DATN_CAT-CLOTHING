import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Svg, SvgXml } from "react-native-svg";


import BackSvg from "../../../assets/Svg/BackSvg";
import VnPay from "../../../assets/Svg/VnPay";
import PayPaySvg from "../../../assets/Svg/PayPaySvg";

const Pay_method = ({ navigation}) => {
    const gotoPay = () => {
        navigation.navigate("VnPay");
      };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    width: '100%',
                    backgroundColor: '#1890FF',
                    padding: 10
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10 }}>
                    <SvgXml xml={BackSvg('white')} style={{ width: 24, height: 24 }} />
                    <Text
                        style={{
                            fontSize: 16,
                            color: "white",
                            marginLeft: 60,
                            width: 247,
                            fontWeight: 'bold',
                            textAlign: 'center'

                        }}
                    >
                        Phương thức thanh toán
                    </Text>
                </View>
            </View>

            <View
                style={{
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#D4D4D4",
                }}
            >
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                    <SvgXml xml={VnPay()} />
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "400",
                            color: "black",
                            marginLeft: 10,
                            width: 330,
                            
                        }}
                    >
                        Thanh toán khi nhận hàng
                    </Text>
                    <Text style={{width: 20, height: 20, borderRadius: 50, borderWidth: 1}}/>
                </View>
                
            </View>

            <View
                style={{
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#D4D4D4",
                }}
            >
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                    <SvgXml xml={PayPaySvg()} />
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "400",
                            color: "black",
                            marginLeft: 10,
                            width: 325,
                            
                        }}
                    >
                        Thẻ tín dụng / Ghi nợ
                    </Text>
                    <Text style={{width: 20, height: 20, borderRadius: 50, borderWidth: 1}}/>
                </View>
                
            </View>
            <TouchableOpacity onPress={gotoPay}>
                    <View
                        style={{
                            marginTop: 10,
                            backgroundColor: "#E2E2E2",
                            alignItems: "center",
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            marginHorizontal: 8,
                            borderRadius: 6,
                        }}
                    >
                        <Text style={{ color: "black", fontSize: 16, fontWeight: 500 }}>
                            Xác nhận
                        </Text>
                    </View>
                </TouchableOpacity>

        </View>
    )
}
export default Pay_method;