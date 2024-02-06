import React from "react";
import { View,Text } from "react-native";
import { Svg, SvgXml } from "react-native-svg";

import CareRightSvg from "../../../../assets/Svg/CareRightSvg";
import CareLeftSvg from "../../../../assets/Svg/CareLeftSvg";
import UserSWsvg from "../../../../assets/Svg/UserSWsvg";
import PassSvg from "../../../../assets/Svg/PassSvg";
import TransSvg from "../../../../assets/Svg/TransSvg";
import CheckVSvg from "../../../../assets/Svg/CheckVSvg";

const Trans_Account =({})=>{
    return(
        <View style={{flex:1, backgroundColor: 'white'}}>

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
              <SvgXml xml={CareLeftSvg('white')} style={{width:24,height:24}}/>
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  marginLeft: 10,
                  width: 247,
                  fontWeight: 'bold',
                  alignItems:'center',
                }}
              >
                Ngôn ngữ
              </Text>
            </View>
          </View>

            <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              width: 400,
              backgroundColor: '#F6F6F6',
              borderRadius: 10,
              padding: 10,
              marginTop: 20
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "black",
                  marginLeft: 10,
                  width: 275
                }}
              >
                Tiếng Việt
              </Text>
            </View>
            <View style={{marginLeft: 70}}>
            <SvgXml xml={CheckVSvg("black")} style={{width:24,height:24}}/>
            </View>
          </View>

          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              width: 400,
              backgroundColor: '#F6F6F6',
              borderRadius:10,
              padding: 10, 
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "black",
                  marginLeft: 10,
                  width: 275
                }}
              >
                English
              </Text>
            </View>
            <View style={{marginLeft: 70}}>
            
            </View>
          </View>

          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              width: 400,
              backgroundColor: '#F6F6F6',
              borderRadius: 10,
              padding: 10,
           
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "black",
                  marginLeft: 10,
                  width: 275
                }}
              >
                中文
              </Text>
            </View>
            <View style={{marginLeft: 70}}>
            
            </View>
          </View>


        </View>  
        </View>
    )
}
export default Trans_Account;