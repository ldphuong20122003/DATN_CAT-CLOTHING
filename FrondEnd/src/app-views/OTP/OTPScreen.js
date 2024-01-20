import { Container } from "native-base";
import React,{useRef, useState} from "react";
import { Text, TextInput, View,StyleSheet, TouchableOpacity } from "react-native";

const OTPScreen = ({}) => {
    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    const handleOTPChange = (index, value) => {
      if (index < 6 && value !== '') {
        inputRefs[index + 1].current.focus();
      }
      if (index > 0 && value === '') {
        // Nếu người dùng xoá giá trị từ ô hiện tại và ô hiện tại không phải là ô đầu tiên
        inputRefs[index - 1].current.focus();
      }
    };
    const handleLastOTPChange = (value) => {
        // Xử lý khi người dùng nhập giá trị vào ô cuối cùng
        console.log('OTP is:', value);
      };

  return (

    <View style={{ flex: 1, width: "100%" ,backgroundColor:'#fff'}}>
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
          onChangeText={(text) => (index === 5 ? handleLastOTPChange(text) : handleOTPChange(index, text))}
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
        <Text style={{ fontSize: 14, fontWeight: 700, marginLeft: 5 ,color:'#41B870'}}>
         Gửi lại mã OTP
        </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
      <View style={{marginTop:24,marginHorizontal:20,alignItems:'center',padding:12,backgroundColor:'#1890FF',borderRadius:6}}>
        <Text style={{color:'white',fontSize:14,fontWeight:600}}>Xác nhận</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};
export default OTPScreen;
const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    input: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor:'#D4D4D4',
    },
  });
