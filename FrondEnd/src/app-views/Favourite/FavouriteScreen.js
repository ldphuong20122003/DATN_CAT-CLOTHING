import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import Recommend_Favou from "../Product/Favourite/Recommend_Favou";
const FavouriteScreen = ({}) => {
  return (
    <SafeAreaView style={{ flex: 0.93 }}>
      <View
        style={{
          backgroundColor: "#1890FF",
          alignItems: "center",
          flexDirection: "row",
          paddingTop: 41,
          paddingBottom: 8,
          justifyContent: "space-between",
          paddingHorizontal: 16,
          width: "100%",
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: 400 }}>
            Yêu thích
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10, paddingHorizontal: 16 }}>
        <Recommend_Favou />
      </View>
    </SafeAreaView>
  );
};
export default FavouriteScreen;
const styles = StyleSheet.create({
  Hearder: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 40,
  },
  Voucher: {
    flexDirection: "row",
    backgroundColor: "#fff",
    top: 50,
    left: 32,
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
  },
  Voucher1: {
    flexDirection: "row",
    marginTop: 30,
  },
});
