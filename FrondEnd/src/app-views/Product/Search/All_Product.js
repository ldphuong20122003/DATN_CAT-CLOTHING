import React from "react";
import { View,Text } from "react-native";

import AllProduct_Search from "./component/AllProduct_Search";


const All_Products=({keyword})=>{

    return(
        <View style={{flex:1,marginHorizontal:16}}>
            <Text style={{marginTop:10,color:'#1890ff',fontSize:14,fontWeight:600}}>Kết quả dành cho bạn</Text>
           <AllProduct_Search keyword={keyword}/>
        </View>
    )
}
export default All_Products;