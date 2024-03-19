import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import { SvgXml } from "react-native-svg";
import CartSvg from "../../../../assets/Svg/CartSvg";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderCart = () => {
  const navigation = useNavigation();
  const gotoCart = () => {
    navigation.navigate("CartScreen");
  };
 const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const cartItemsString = await AsyncStorage.getItem(`cartItems_${userId}`);
      if (cartItemsString !== null) {
        const cartItemsArray = JSON.parse(cartItemsString);
        setCartItems(cartItemsArray);
        setCartLength(cartItemsArray.length);
      }
    } catch (error) {
      console.error("Error fetching cart items from AsyncStorage: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const updateCartLength = (newCartItems) => {
    setCartLength(newCartItems.length);
  };

  useEffect(() => {
    updateCartLength(cartItems);
  }, [cartItems]);

  // Hàm để thêm một mục vào cartItems và cập nhật cartLength
  const addItemToCart = (item) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    updateCartLength(newCartItems);
    // Lưu newCartItems vào AsyncStorage nếu cần
  };

  return (
    <View style={styles.container}>
      <View style={styles.total_qty}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", fontSize: 12 }}>
            {cartLength}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={gotoCart}>
        <SvgXml xml={CartSvg()} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCart;

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    marginTop: 10,
  },
  total_qty: {
    zIndex: 99,
    position: "absolute",
    top: -1,
    right: 5,
    backgroundColor: "red",
    height: 18,
    width: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
});
