import React from "react";
import { View,Text } from "react-native";
import { Svg, SvgXml } from "react-native-svg";

import CareRightSvg from "../../../../assets/Svg/CareRightSvg";
import CareLeftSvg from "../../../../assets/Svg/CareLeftSvg";
import UserSWsvg from "../../../../assets/Svg/UserSWsvg";
import PassSvg from "../../../../assets/Svg/PassSvg";
import TransSvg from "../../../../assets/Svg/TransSvg";

const Option_Account =({})=>{
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
                Tùy chọn
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
              <SvgXml xml={UserSWsvg('black')} style={{width:24,height:24}}/>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "black",
                  marginLeft: 10,
                  width: 247
                }}
              >
                Chỉnh sửa thông tin cá nhân
              </Text>
            </View>
            <View style={{marginLeft: 70}}>
            <SvgXml xml={CareRightSvg("black")} style={{width:24,height:24}}/>
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
              marginTop: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={PassSvg('black')} style={{width:24,height:24}}/>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "black",
                  marginLeft: 10,
                  width: 247
                }}
              >
                Đổi mật khẩu
              </Text>
            </View>
            <View style={{marginLeft: 70}}>
            <SvgXml xml={CareRightSvg("black")} style={{width:24,height:24}}/>
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
              marginTop: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml xml={TransSvg('black')} style={{width:24,height:24}}/>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "black",
                  marginLeft: 10,
                  width: 247
                }}
              >
                Ngôn ngữ (Tiếng Việt)
              </Text>
            </View>
            <View style={{marginLeft: 70}}>
            <SvgXml xml={CareRightSvg("black")} style={{width:24,height:24}}/>
            </View>
          </View>


        </View>  
        </View>
    )
}
export default Option_Account;