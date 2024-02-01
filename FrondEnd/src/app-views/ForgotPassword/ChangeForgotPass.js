import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import BannerSvg from "../../../assets/Svg/BannerSvg";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import LogoCat from "../../../assets/Svg/LogoCat";
import PhoneSvg from "../../../assets/Svg/PhoneSvg";
import LockSvg from "../../../assets/Svg/LockSvg";
import Checkbox from "expo-checkbox";
import GoogleSvg from "../../../assets/Svg/GoogleSvg";
import FacebookSvg from "../../../assets/Svg/FacebookSvg";
import EyeSvg from "../../../assets/Svg/EyeSvg";
import ForgotPass from "../ForgotPassword/ForgotPass";
import TickSvg from "../../../assets/Svg/TickSvg";

const ModalPopups = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  React.useEffect(()=>{
    toggleModal();
  },[visible]);
  const toggleModal=()=>{
    if(visible){
      setShowModal(true)
    }else{
      setShowModal(false)
    }
  }
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View
          style={{
            width: "80%",
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 20,
            elevation: 20,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};
const ChangeForgotPass = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [isChecked, setChecked] = useState(false);
  const gotoLogin =()=>navigation.navigate('Login');

  const gotoRegister =()=>{ navigation.navigate('Register')};
  const gotoForgotPass =()=>{ navigation.navigate('ForgotPass')};
  return (
    <View style={{ flex: 1, width: "100%" ,backgroundColor:'#fff'}}>
  
      <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
        <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
         Mật khẩu mới
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
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" ,alignItems:'center'}}>
            <SvgXml xml={LockSvg()} />
            <TextInput
              style={{ marginLeft: 8 }}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <SvgXml xml={EyeSvg()} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 8, marginTop: 7 }}>
        <Text style={{ marginLeft: 16, fontSize: 16, fontWeight: 400 }}>
          Nhập lại mật khẩu mới
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
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" ,alignItems:'center'}}>
            <SvgXml xml={LockSvg()} />
            <TextInput
              style={{ marginLeft: 8 }}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <SvgXml xml={EyeSvg()} />
        </View>
      </View>
    
      <TouchableOpacity onPress={()=>setVisible(true)}>
        <View
          style={{
            marginTop: 30,
            backgroundColor: "#1890FF",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 10,
            marginHorizontal: 8,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
            Đổi mật khẩu
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
  );
};
export default ChangeForgotPass;
const styles = StyleSheet.create({

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

});

