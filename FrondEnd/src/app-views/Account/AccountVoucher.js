import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Svg, SvgXml } from "react-native-svg";

import CareLeftSvg from "../../../assets/Svg/CareLeftSvg";
import Voucher from "../../../assets/Svg/Voucher";
import Voucher_Home from "../Voucher/Voucher_Account";
import Voucher_Account from "../Voucher/Voucher_Account";

const AccountVoucher = ({ navigation, item }) => {
    const gotoVoucher = () => { navigation.navigate('BottomTabScreen') };
    const pressItem = (item) => {
        onPress && onPress(item);
    };
    return (
        <SafeAreaView style={{ flex: 0.93 }}>
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
                    <SvgXml xml={CareLeftSvg('white')} style={{ width: 24, height: 24 }} />
                    <Text
                        style={{
                            fontSize: 16,
                            color: "white",
                            marginLeft: 10,
                            width: 247,
                            fontWeight: 'bold',

                        }}
                    >
                        Voucher của tôi
                    </Text>
                </View>
            </View>

            <ScrollView>
                <View style={{ flex: 1 }}>

                    <View>
                        <Text style={{ marginTop: 15, marginLeft: 15, fontSize: 18 }}>
                            Mã giảm giá của bạn
                        </Text>
                        <Text style={{ marginTop: 5, marginLeft: 15, fontSize: 14, color: '#707070' }}>
                            Có thể chọn 1 Voucher
                        </Text>
                    </View>

                    <Voucher_Account />

                </View>
            </ScrollView>
            <View style={{ height: 100, backgroundColor: 'white' }}>
                <TouchableOpacity onPress={gotoVoucher}>
                    <View
                        style={{
                            marginTop: 10,
                            backgroundColor: "#1890FF",
                            alignItems: "center",
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            marginHorizontal: 8,
                            borderRadius: 6,
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
                            Áp dụng
                        </Text>
                    </View>

                </TouchableOpacity>
                <Text style={{ marginTop: 5, marginLeft: 15, fontSize: 14, color: '#707070' }}>
                    01 mã Voucher đã được áp dụng 
                </Text>
            </View>
        </SafeAreaView>

    )
}
export default AccountVoucher;
const styles = StyleSheet.create({
    image: {
        marginTop: 10,
        height: 110,
        width: 100
    },
}); 