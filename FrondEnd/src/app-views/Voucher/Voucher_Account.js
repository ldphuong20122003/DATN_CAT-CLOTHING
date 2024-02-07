import React from "react";
import ListVoucher_Account from "./component/ListVoucher_Account";
import { View } from "react-native";

const Voucher_Account = () => {
    const default_data = [
        {
            title: "Giảm đ50k",
            content: "Đơn tối thiểu 150k",
            date: "Hết hạn 30.01"
        },
        {
            title: "Giảm đ50k",
            content: "Đơn tối thiểu 150k",
            date: "Hết hạn 30.01"
        },
        {
            title: "Giảm đ50k",
            content: "Đơn tối thiểu 150k",
            date: "Hết hạn 30.01"
        },
        {
            title: "Giảm đ50k",
            content: "Đơn tối thiểu 150k",
            date: "Hết hạn 30.01"
        },
        
    ];
    return (
        <View style={{ marginTop: 10 }}>
            <ListVoucher_Account data={default_data} />
        </View>
    );
};
export default Voucher_Account;
