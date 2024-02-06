import React from "react";
import { View, Text, TextInput, Checkbox, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Svg, SvgXml } from "react-native-svg";

import CareRightSvg from "../../../../assets/Svg/CareRightSvg";
import CareLeftSvg from "../../../../assets/Svg/CareLeftSvg";
import UserSWsvg from "../../../../assets/Svg/UserSWsvg";
import PassSvg from "../../../../assets/Svg/PassSvg";
import TransSvg from "../../../../assets/Svg/TransSvg";
import PhoneSvg from "../../../../assets/Svg/PhoneSvg";
import LockSvg from "../../../../assets/Svg/LockSvg";
import EyeSvg from "../../../../assets/Svg/EyeSvg";
import EditSvg from "../../../../assets/Svg/EditSvg";
import CameraSvg from "../../../../assets/Svg/CameraSvg";

const Update_Account = ({ navigation }) => {
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
                        Chỉnh sửa thông tin cá nhân
                    </Text>
                </View>
            </View>

            <View>
                <View style={styles.slide}>
                    <Image
                        source={require("../../../../assets/banner.jpg")}
                        style={styles.image}
                    />
                </View>

                <View style={styles.Voucher}>
                    <View style={{ backgroundColor: "#fff", padding: 6, borderRadius: 50, marginLeft: 380, marginTop: -70, marginBottom: 30 }}>
                        <SvgXml xml={CameraSvg()} />
                    </View>
                    <View>
                        <Image
                            source={require("../../../../assets/anhdaidien.jpg")}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100,
                                borderWidth: 2,
                                borderColor: 'white'
                            }}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", padding: 6, borderRadius: 50, marginLeft: 70, marginTop: -30 }}>
                        <SvgXml xml={CameraSvg()} />
                    </View>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400, marginTop: 70 }}>
                        Tên giao hàng
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
                            style={{ marginLeft: 8 }}
                            placeholder="Nhập tên"
                        />
                    </View>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
                        Địa chỉ
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
                            style={{ marginLeft: 8 }}
                            placeholder="Nhập địa chỉ"
                        />
                    </View>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
                        Hotline
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
                            style={{ marginLeft: 8 }}
                            placeholder="Nhập SĐT"
                        />
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
export default Update_Account;
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