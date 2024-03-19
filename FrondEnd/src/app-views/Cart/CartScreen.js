import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config";
import DownSvg from "../../../assets/Svg/DownSvg";
import iconDeleteSvg from "../../../assets/Svg/iconDeleteSvg";

const CartScreen = ({ navigation }) => {
  const IP = config.IP;
  const goBack = () => {
    navigation.goBack();
  };
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantitiesAndSizes, setQuantitiesAndSizes] = useState([]);
  const [isChecked,setChecked] = useState(false);

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

  const getdataProduct = async () => {
    try {
      const productIds = cartItems.map((item) => item.id);
      const productDetails = await Promise.all(
        productIds.map(async (id) => {
          const response = await fetch(
            `http://${IP}:3000/API/product/?id=${id}`
          );
          if (response.ok) {
            return await response.json();
          }
          throw new Error("Failed to fetch product details");
        })
      );
      const flattenedProducts = productDetails.flat();
      setProducts(flattenedProducts);
    } catch (error) {
      console.error("Error fetching product details: ", error);
    }
  };

  useEffect(() => {
    getdataProduct();
  }, [cartItems]);

  useEffect(() => {
    const initialQuantities = cartItems.map((item) => ({
      quantity: item.quantity || 1,
      size: item.size,
    }));
    setQuantitiesAndSizes(initialQuantities);
    console.log(cartItems);
  }, [cartItems]);

  const handleIncrement = (index) => {
    const updatedQuantitiesAndSizes = [...quantitiesAndSizes];
    updatedQuantitiesAndSizes[index].quantity += 1;
    setQuantitiesAndSizes(updatedQuantitiesAndSizes);

    updateQuantityInCart(index, updatedQuantitiesAndSizes[index].quantity);
  };

  const handleDecrement = (index) => {
    const updatedQuantitiesAndSizes = [...quantitiesAndSizes];
    if (updatedQuantitiesAndSizes[index].quantity > 1) {
      updatedQuantitiesAndSizes[index].quantity -= 1;
      setQuantitiesAndSizes(updatedQuantitiesAndSizes);

      updateQuantityInCart(index, updatedQuantitiesAndSizes[index].quantity);
    }
  };

  const updateQuantityInCart = async (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);

    try {
      await AsyncStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(updatedCartItems)
      );
    } catch (error) {
      console.error("Error saving updated cart items to AsyncStorage: ", error);
    }
  };

  const removeItemFromCart = async (index) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Xác nhận', onPress: () => confirmRemoveItem(index) }
      ],
      { cancelable: false }
    );
  };
  const confirmRemoveItem = async (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  
    try {
      await AsyncStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(updatedCartItems)
      );
    } catch (error) {
      console.error("Error saving updated cart items to AsyncStorage: ", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
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
              Giỏ hàng
            </Text>
          </View>
        </View>
      </View>
      {isLoading ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#1890ff" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Content}>
            {products.map((product, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#6AC259" : undefined}
                />
                <View style={{ flexDirection: "row", marginLeft: 12 }}>
                  <Image
                    source={{ uri: product.Img }}
                    style={{ width: 100, height: 100 }}
                  />
                  <View style={{ marginLeft: 8, marginTop: 25 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#2D2D2D",
                        fontWeight: 500,
                      }}
                    >
                      {product.Name}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#d3d3d3",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 2,
                        marginVertical: 4,
                        paddingHorizontal: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#5A5A5A",
                          fontWeight: 400,
                        }}
                      >
                        Phân loại:{" "}
                        {quantitiesAndSizes[index]
                          ? quantitiesAndSizes[index].size
                          : ""}
                      </Text>
                      <SvgXml xml={DownSvg()} />
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#EF4444",
                        fontWeight: 600,
                      }}
                    >
                      {product.Price && product.Sale
                        ? (product.Price - product.Sale)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"
                        : "0"}{" "}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingVertical: 4,
                        marginTop: 5,
                      }}
                    >
                      <TouchableOpacity onPress={() => handleDecrement(index)}>
                        <Text
                          style={{
                            borderWidth: 0.5,
                            paddingHorizontal: 6,
                            borderColor: "#707070",
                          }}
                        >
                          -
                        </Text>
                      </TouchableOpacity>
                      <TextInput
                        placeholder="1"
                        value={
                          quantitiesAndSizes[index]
                            ? quantitiesAndSizes[index].quantity.toString()
                            : ""
                        }
                        style={{
                          borderTopWidth: 0.5,
                          borderBottomWidth: 0.5,
                          width: 40,
                          height: 20,
                          fontSize: 12,
                          textAlign: "center",
                          borderColor: "#707070",
                        }}
                        keyboardType="numeric"
                        onChangeText={(value) => {
                          if (!isNaN(value) && value !== "") {
                            const newQuantity = parseInt(value);
                            if (newQuantity >= 1) {
                              updateQuantityInCart(index, newQuantity);
                            }
                          }
                        }}
                      />
                      <TouchableOpacity onPress={() => handleIncrement(index)}>
                        <Text
                          style={{
                            borderWidth: 0.5,
                            paddingHorizontal: 6,
                            borderColor: "#707070",
                          }}
                        >
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity onPress={() => removeItemFromCart(index)}>
                    <SvgXml xml={iconDeleteSvg()} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      <View style={styles.Footer}>
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#6AC259" : undefined}
          />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 14,
              fontWeight: 400,
              color: "#5A5A5A",
            }}
          >
            Tất cả
          </Text>
        </View>
        <View
          style={{ height: "100%", flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Text>Tổng thanh toán: {""}</Text>
            <Text style={{ fontWeight: 600, color: "#EF4444" }}></Text>
          </View>
          <TouchableOpacity>
            <View
              style={{
                height: "100%",
                backgroundColor: "#1890FF",
                justifyContent: "center",
                paddingHorizontal: 12,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: 600 }}>Mua hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default CartScreen;

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
    flex: 1,
  },
  Footer: {
    bottom: 0,
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    borderTopWidth: 0.2,
  },
});
