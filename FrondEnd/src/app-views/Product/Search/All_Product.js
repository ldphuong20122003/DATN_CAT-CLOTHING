import React from "react";
import { View,Text } from "react-native";

import AllProduct_Search from "./component/AllProduct_Search";


const All_Products=()=>{
    return(
        <View style={{flex:1}}>
            <Text style={{marginTop:10,marginLeft:16,color:'#1890ff',fontSize:14,fontWeight:600}}>Kết quả dành cho bạn</Text>
           <AllProduct_Search />
        </View>
    )
}
export default All_Products;