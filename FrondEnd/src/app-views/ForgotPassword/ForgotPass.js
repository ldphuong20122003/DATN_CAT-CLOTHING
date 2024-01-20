
import React from "react";
import { View,StyleSheet, Text, TextInput } from "react-native";

const ForgotPass = () => {
  
  return (

    <View style={{ flex: 1, width: "100%" ,backgroundColor:'#fff'}}>
       <View style={{marginTop:32,paddingHorizontal:16}}>
        <Text style={{fontSize:14,fontWeight:700,color:'#5A5A5A'}}>Số điện thoại</Text>
        <View style={{marginTop:9,borderWidth:1,borderRadius:8,paddingHorizontal:12,paddingVertical:8,borderColor:'#8D8D8D'}}>
       <TextInput
            placeholder="Nhập số điện thoại"
            placeholderTextColor={'#D4D4D4'}
         />
       </View>
       <Text style={{marginTop:8,fontSize:14,fontWeight:400,color:'#707070'}}>Bạn sẽ nhận được một mã OTP được gửi về tin nhắn điện thoại của bạn.</Text>
       
       </View>
       <View
          style={{
            marginTop: 24,
            backgroundColor: "#1890FF",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 10,
            marginHorizontal: 8,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
          Xác nhận
          </Text>
        </View>
    </View>
  );
};
export default ForgotPass;
const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
   
  });
