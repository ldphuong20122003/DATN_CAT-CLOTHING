import React from "react";
import { View, Text, TextInput, Checkbox, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Svg, SvgXml } from "react-native-svg";

import CareRightSvg from "../../../../assets/Svg/CareRightSvg";
import CareLeftSvg from "../../../../assets/Svg/CareLeftSvg";
import Hide_pass from "../../../../assets/Svg/Hide_pass";


const Update_Pass = ({ navigation }) => {
    const gotoHome =()=>{ navigation.navigate('BottomTabScreen')};
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
                    <SvgXml xml={CareLeftSvg('white')} style={{ width: 24, height: 24 }} />
                    <Text
                        style={{
                            fontSize: 16,
                            color: "white",
                            marginLeft: 10,
                            width: 247,
                            fontWeight: 'bold',
                            alignItems: 'center',
                        }}
                    >
                        Đổi mật khẩu
                    </Text>
                </View>
            </View>

            <View>

                <View style={{ margin: 10 }}>
                    <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
                        Mật khẩu hiện tại
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            marginTop: 7,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                        }}
                    >
                        <TextInput
                            style={{ marginLeft: 8, width: 350 }}
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                        <SvgXml xml={Hide_pass()}/>
                    </View>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
                        Mật khẩu mới
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            marginTop: 7,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                        }}
                    >
                        <TextInput
                            style={{ marginLeft: 8, width: 350 }}
                            placeholder="Nhập mật khẩu mới"
                        />
                        <SvgXml xml={Hide_pass()}/>
                    </View>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
                        Nhập lại mật khẩu mới
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            marginTop: 7,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                        }}
                    >
                        <TextInput
                            style={{ marginLeft: 8, width: 350 }}
                            placeholder="Nhập lại mật khẩu mới"
                        />
                        <SvgXml xml={Hide_pass()}/>
                    </View>
                </View>

                <TouchableOpacity onPress={gotoHome}>
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
                            Lưu thay đổi
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
}
export default Update_Pass;
const styles = StyleSheet.create({
    slide: {},
    image: {
        width: "100%",
        height: 137,
    },
    image: {
        width: "100%",
        height: 137,
    },
    Voucher: {
        width: "90%",
        position: "absolute",
        top: 90,
        left: 18,
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "space-between",
    },
});