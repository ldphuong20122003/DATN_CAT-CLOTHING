import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Hide_pass from "../../../../assets/Svg/Hide_pass";
import BackSvg from "../../../../assets/Svg/BackSvg";
import ModalPopups from "../../Modal/ModalPopup";
import TickSvg from "../../../../assets/Svg/TickSvg";

const Update_Pass = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const gotoLogin =()=>navigation.navigate('Login');
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.Header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={goBack}>
            <SvgXml xml={BackSvg()} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                marginLeft: 10,
                fontWeight: "bold",
              }}
            >
              Đổi mật khẩu
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.Content}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Mật khẩu hiện tại
          </Text>
          <View
            style={{
              flexDirection: "row",

              padding: 12,
              marginTop: 7,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput placeholder="Nhập mật khẩu hiện tại" />
            <SvgXml xml={Hide_pass()} />
          </View>
        </View>

        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Mật khẩu mới</Text>
          <View
            style={{
              flexDirection: "row",

              padding: 12,
              marginTop: 7,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput placeholder="Nhập mật khẩu mới" />
            <SvgXml xml={Hide_pass()} />
          </View>
        </View>

        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Nhập lại mật khẩu mới
          </Text>
          <View
            style={{
              flexDirection: "row",

              padding: 12,
              marginTop: 7,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput placeholder="Nhập lại mật khẩu mới" />
            <SvgXml xml={Hide_pass()} />
          </View>
        </View>
        <TouchableOpacity onPress={setVisible}>
          <View
            style={{
              marginTop: 16,
              backgroundColor: "#1890FF",
              alignItems: "center",

              paddingVertical: 12,

              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
              Lưu thay đổi
            </Text>
          </View>
        </TouchableOpacity>
        <ModalPopups visible={visible}>
          <View style={{alignItems:'center'}}>
         
              <SvgXml xml={TickSvg()}/>
           <Text style={{color:'#6AC259',fontSize:16,fontWeight:600}}>Đổi mật khẩu thành công</Text>
           <Text style={{fontSize:12,fontWeight:400,color:'#707070'}}>Chuyển tới trang đăng nhập trong vài giây nữa</Text>
           <TouchableOpacity onPress={gotoLogin}>
           <View style={{width:180,padding:15,backgroundColor:'#1890FF',alignItems:'center',marginTop:30,borderRadius:6}}>
            <Text style={{color:'#fff',fontSize:14,fontWeight:600}}>Đi tới trang đăng nhập</Text>
           </View>
           </TouchableOpacity>
          </View>
        </ModalPopups>
      </View>
    </View>
  );
};
export default Update_Pass;
const styles = StyleSheet.create({
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
  Content: {
    padding: 16,
  },
});
