import React, { useRef} from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SvgXml } from "react-native-svg";
import TickSvg from "../../../assets/Svg/TickSvg";
import ModalPopups from "../Modal/ModalPopup";


const OTPScreen = ({navigation}) => {
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));
const gotoLogin =()=>navigation.navigate('Login');
  const handleOTPChange = (index, value) => {
    if (index < 6 && value !== "") {
      inputRefs[index + 1].current.focus();
    }
    if (index > 0 && value === "") {
      // Nếu người dùng xoá giá trị từ ô hiện tại và ô hiện tại không phải là ô đầu tiên
      inputRefs[index - 1].current.focus();
    }
  };
  const handleLastOTPChange = (value) => {
    // Xử lý khi người dùng nhập giá trị vào ô cuối cùng
    console.log("OTP is:", value);
  };
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 32,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: 400 }}>
          Mã xác thực OTP được gửi quá SĐT
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 700, marginLeft: 5 }}>
          0987*****321
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          marginTop: 24,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.input}
            textAlign="center"
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) =>
              index === 5
                ? handleLastOTPChange(text)
                : handleOTPChange(index, text)
            }
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: 400 }}>
          Bạn chưa nhận được mã?
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 700,
              marginLeft: 5,
              color: "#41B870",
            }}
          >
            Gửi lại mã OTP
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View
          style={{
            marginTop: 24,
            marginHorizontal: 20,
            alignItems: "center",
            padding: 12,
            backgroundColor: "#1890FF",
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: 600 }}>
            Xác nhận
          </Text>
        </View>
      </TouchableOpacity>
      
        <ModalPopups visible={visible}>
          <View style={{alignItems:'center'}}>
         
              <SvgXml xml={TickSvg()}/>
           <Text style={{color:'#6AC259',fontSize:16,fontWeight:600}}>Đăng ký tài khoản thành công</Text>
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
export default OTPScreen;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#D4D4D4",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

});
