import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Hide_pass from "../../../../assets/Svg/Hide_pass";
import BackSvg from "../../../../assets/Svg/BackSvg";
import ModalPopups from "../../Modal/ModalPopup";
import TickSvg from "../../../../assets/Svg/TickSvg";
import AsyncStorage from "@react-native-async-storage/async-storage";
const IP = "192.168.1.8";
const Update_Pass = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [data_User, setData_User] = useState([]);
  const [pass_old, setPass_old] = useState("");
  const [pass_new, setPass_new] = useState("");
  const [repass, setRepass] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
 
  const checkPasswordMatch = () => {
    // Giả sử mật khẩu được lưu trong đối tượng data_User lấy từ API
    if (data_User && data_User[0].Password !== pass_old) {
      setPasswordMatch(false);
      return false;
     
    }
    setPasswordMatch(true);
    return true;
  };
  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
        return fetch(`http://${IP}:3000/API/users/getbyid?id=` + userId)
          .then((res) => res.json())
          .then((data) => setData_User(data))
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatePass = async () => {
    if (!pass_old) {
      Alert.alert('Error', 'Vui lòng nhập mật khẩu cũ');
      return;
    }
    if (!pass_new) {
      Alert.alert('Error', 'Vui lòng nhập mật khẩu mới');
      return;
    }
    if (!repass) {
      Alert.alert('Error', 'Vui lòng nhập lại mật khẩu');
      return;
    }
    if (!checkPasswordMatch()) {
      Alert.alert('Error', "Mật khẩu cũ của bạn không khớp.");
      return;
    }
    if (repass !== pass_new) {
      Alert.alert('Error', 'Hai mật khẩu hiện không khớp nhau');
      return;
    }
  
    try {
      const response = await fetch(
        `http://${IP}:3000/API/users/update/` + userId,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            Password: pass_new,
          }),
        }
      );
      setVisible(true);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getUserId();
  }, [userId]);
  const gotoLogin =()=>navigation.navigate('Login');
  const goBack = () => {
    navigation.goBack();
  };
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
            <TextInput placeholder="Nhập mật khẩu hiện tại"   onChangeText={(text) => setPass_old(text)}
/>
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
            <TextInput placeholder="Nhập mật khẩu mới"   onChangeText={(text) => setPass_new(text)}
/>
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
            <TextInput placeholder="Nhập lại mật khẩu mới"   onChangeText={(text) => setRepass(text)}
/>
            <SvgXml xml={Hide_pass()} />
          </View>
        </View>
        <TouchableOpacity onPress={updatePass}>
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
