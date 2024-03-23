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
import ModalFilter from "../Modal/ModalFilter";
import DeleteSvg from "../../../assets/Svg/DeleteSvg";

const CartScreen = ({ navigation }) => {
  const IP = config.IP;
  const goBack = () => {
    navigation.goBack();
  };
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(""); // State lưu kích cỡ được chọn
  const [selectedSizeAmount, setSelectedSizeAmount] = useState(0); // State lưu số lượng tương ứng với kích cỡ được chọn
  const [visibleChangeProduct, setVisibleChangeProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(null);
  const [selectedModalSize, setSelectedModalSize] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const gotoBack = () => navigation.goBack();
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
  const handleIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantityInCart += 1;
    setCartItems(updatedCartItems);
    updateQuantityInCart(index, updatedCartItems[index].quantityInCart);
  };
  const handleDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantityInCart > 1) {
      updatedCartItems[index].quantityInCart -= 1;
      setCartItems(updatedCartItems);
      updateQuantityInCart(index, updatedCartItems[index].quantityInCart);
    }
  };

  const updateQuantityInCart = async (index, newQuantity) => {
    try {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantityInCart = newQuantity;
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
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Xác nhận", onPress: () => confirmRemoveItem(index) },
      ],
      { cancelable: false }
    );
  };

  const confirmRemoveItem = async (index) => {
    setIsLoading(true);
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    try {
      await AsyncStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(updatedCartItems),
        setIsLoading(false)
      );
    } catch (error) {
      console.error("Error saving updated cart items to AsyncStorage: ", error);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedProductQuantity(product.quantityInCart.toString());
    setVisibleChangeProduct(true);
    setSelectedModalSize(product.sizeInCart); // Thêm dòng này
    setSelectedSize(product.sizeInCart); // Thêm dòng này
    setSelectedSizeAmount(product.SizeProduct[product.sizeInCart]); // Thêm dòng này
  };
  const closeModal = () => {
    setVisibleChangeProduct(false);
  };
  const handleSizeSelection = (size, amount) => {
    setSelectedSize(size);
    setSelectedSizeAmount(amount);
  };
  const handleIncrementQuantity = () => {
    const newQuantity = parseInt(selectedProductQuantity) + 1;
    setSelectedProductQuantity(newQuantity.toString());
  };

  const handleDecrementQuantity = () => {
    const newQuantity = parseInt(selectedProductQuantity) - 1;
    if (newQuantity >= 1) {
      setSelectedProductQuantity(newQuantity.toString());
    }
  };
  const updateCartItem = async () => {
    if (selectedProduct) {
      // Tạo một bản sao của giỏ hàng
      let updatedCartItems = [...cartItems];
      // Tìm index của sản phẩm trong giỏ hàng
      const existingIndex = updatedCartItems.findIndex(
        (item) =>
          item.id === selectedProduct.id && item.sizeInCart === selectedSize
      );

      if (existingIndex !== -1) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, cộng thêm số lượng vào sản phẩm đó
        updatedCartItems[existingIndex].quantityInCart += parseInt(
          selectedProductQuantity
        );
        // Giảm số lượng của sản phẩm được chọn khỏi giỏ hàng
        const selectedIndex = updatedCartItems.findIndex(
          (item) =>
            item.id === selectedProduct.id &&
            item.sizeInCart === selectedProduct.sizeInCart
        );
        updatedCartItems[selectedIndex].quantityInCart -= parseInt(
          selectedProductQuantity
        );

        // Nếu số lượng của sản phẩm được chọn bằng 0, xóa nó khỏi giỏ hàng
        if (updatedCartItems[selectedIndex].quantityInCart === 0) {
          updatedCartItems.splice(selectedIndex, 1);
        }
      } else {
        updatedCartItems.push({
          ...selectedProduct,
          sizeInCart: selectedSize,
          quantityInCart: parseInt(selectedProductQuantity),
        });
        const oldItemIndex = updatedCartItems.findIndex(
          (item) =>
            item.id === selectedProduct.id &&
            item.sizeInCart === selectedProduct.sizeInCart
        );
        if (oldItemIndex !== -1) {
          updatedCartItems.splice(oldItemIndex, 1);
        }
      }
      await AsyncStorage.setItem(
        `cartItems_${userId}`,
        JSON.stringify(updatedCartItems)
      );

      // Cập nhật state cartItems với giỏ hàng đã cập nhật
      setCartItems(updatedCartItems);
    }

    // Đóng Modal
    closeModal();
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
    if (!isCheckedAll) {
      const allIndexes = cartItems.map((_, index) => index);
      setSelectedItems(allIndexes);
    } else {
      setSelectedItems([]);
    }
  };
  useEffect(() => {
    // Kiểm tra xem tất cả các mục có được chọn không
    const allSelected =
      selectedItems.length === cartItems.length && cartItems.length > 0;
    setIsCheckedAll(allSelected);
  }, [selectedItems, cartItems]);
  const toggleCheckbox = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };
  const calculateTotalPayment = () => {
    let totalPayment = 0;
    selectedItems.forEach((index) => {
      const product = cartItems[index];
      if (
        product.PriceProduct &&
        product.SaleProduct &&
        product.quantityInCart
      ) {
        const productTotalPrice =
          (product.PriceProduct - product.SaleProduct) * product.quantityInCart;
        totalPayment += productTotalPrice;
      }
    });
    return totalPayment;
  };
  const handleBuy = async () => {
    if(selectedItems.length === 0){
      Alert.alert('Error', 'Bạn chưa chọn sản phẩm nào để đặt hàng');
      return;
    }
  
    // Lấy danh sách sản phẩm đã chọn từ cartItems dựa vào index đã chọn
    const selectedProducts = selectedItems.map((index) => cartItems[index]);
    
    try {
      // Chuyển đổi danh sách sản phẩm đã chọn thành chuỗi JSON để lưu trữ
      const jsonValue = JSON.stringify(selectedProducts);
      await AsyncStorage.setItem('@selected_products', jsonValue);
      
      // Chuyển hướng sang màn hình Payment và truyền danh sách sản phẩm đã chọn
      navigation.navigate('Payment', { data: selectedProducts });
    } catch (error) {
      // Xử lý lỗi khi lưu dữ liệu
      console.error("Error saving data", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.Header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => gotoBack()}>
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
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <View style={{ flex: 1 }}>
              <ActivityIndicator size="large" color="#1890ff" />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.Content}>
                {cartItems.map((product, index) => (
                  <View key={index} style={{ ...styles.itemInCart }}>
                    <Checkbox
                      value={selectedItems.includes(index)}
                      onValueChange={() => toggleCheckbox(index)}
                    />
                    <View style={{ flexDirection: "row", marginLeft: 12 }}>
                      <Image
                        source={{ uri: product.ImgProduct }}
                        style={{ width: 100, height: 100, marginTop: 15 }}
                      />
                      <View style={{ marginLeft: 8, marginTop: 25 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#2D2D2D",
                            fontWeight: 500,
                          }}
                        >
                          {product.NameProduct}
                        </Text>
                        <TouchableOpacity onPress={() => openModal(product)}>
                          <View style={{ ...styles.buttonPhanloai }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#5A5A5A",
                                fontWeight: 400,
                              }}
                            >
                              Phân loại: {product.sizeInCart}
                            </Text>
                            <SvgXml xml={DownSvg()} />
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#EF4444",
                            fontWeight: 600,
                          }}
                        >
                          {product.PriceProduct &&
                          product.SaleProduct &&
                          product.quantityInCart
                            ? (
                                (product.PriceProduct - product.SaleProduct) *
                                product.quantityInCart
                              )
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
                          <TouchableOpacity
                            onPress={() => handleDecrement(index)}
                          >
                            <Text style={{ ...styles.textIn_DeQuantity }}>
                              -
                            </Text>
                          </TouchableOpacity>
                          <TextInput
                            placeholder="1"
                            value={product.quantityInCart.toString()} // Thay đổi dòng này
                            style={{ ...styles.inputQuantity }}
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
                          <TouchableOpacity
                            onPress={() => handleIncrement(index)}
                          >
                            <Text style={{ ...styles.textIn_DeQuantity }}>
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
                      <TouchableOpacity
                        onPress={() => removeItemFromCart(index)}
                      >
                        <SvgXml xml={iconDeleteSvg()} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
        <View style={styles.Footer}>
          <View style={{ flexDirection: "row" }}>
            <Checkbox value={isCheckedAll} onValueChange={handleCheckAll} />
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
            style={{
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <Text>Tổng thanh toán: </Text>
              <Text style={{ fontWeight: 600, color: "#EF4444" }}>
                {calculateTotalPayment().toLocaleString()} đ
              </Text>
            </View>
            <TouchableOpacity onPress={handleBuy}>
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
      <ModalFilter visible={visibleChangeProduct}>
        {selectedProduct && (
          <View>
            <View
              style={{
                flexDirection: "row",
                padding: 16,
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
                borderBottomColor: "#E2E2E2",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: selectedProduct.ImgProduct,
                  }}
                  style={{ width: 100, height: 100 }}
                />
                <View style={{ width: 100, marginLeft: 8, marginTop: 40 }}>
                  <Text style={{ fontSize: 14 }}>
                    {selectedProduct.NameProduct}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#EF4444",
                      marginTop: 2,
                      fontWeight: 500,
                    }}
                  >
                    {(
                      selectedProduct.PriceProduct - selectedProduct.SaleProduct
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </Text>
                  <Text style={{ fontSize: 10, marginTop: 2, fontWeight: 400 }}>
                    Số lượng: {selectedSize ? selectedSizeAmount : "0"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => closeModal()}>
                <SvgXml xml={DeleteSvg()} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                padding: 16,
                borderBottomWidth: 0.5,
                borderBottomColor: "#E2E2E2",
              }}
            >
              <Text>Kích cỡ</Text>
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                {Object.keys(selectedProduct.SizeProduct)
                  .sort((a, b) => {
                    const sizeOrder = { S: 0, M: 1, L: 2, XL: 3 };
                    return sizeOrder[a] - sizeOrder[b];
                  })
                  .map((size, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        handleSizeSelection(
                          size,
                          selectedProduct.SizeProduct[size]
                        )
                      }
                      style={{
                        ...styles.itemSize,
                        backgroundColor:
                          selectedSize === size ? "#1890ff" : "#f6f6f6",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: selectedSize === size ? "#fff" : "#000",
                        }}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 16,
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 16,
              }}
            >
              <Text>Số lượng</Text>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 4,
                    marginTop: 5,
                  }}
                >
                  <TouchableOpacity onPress={handleDecrementQuantity}>
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
                    value={selectedProductQuantity}
                    style={{ ...styles.inputQuantity }}
                    keyboardType="numeric"
                    onChangeText={(value) => {
                      if (!isNaN(value) && value !== "") {
                        const newQuantity = parseInt(value);
                        if (newQuantity >= 1) {
                          setSelectedProductQuantity(value);
                        }
                      }
                    }}
                  />
                  <TouchableOpacity onPress={handleIncrementQuantity}>
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
            <TouchableOpacity onPress={updateCartItem}>
              <View
                style={{
                  paddingVertical: 10,
                  backgroundColor: "#1890ff",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: 600 }}>Xác nhận</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ModalFilter>
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
  itemSize: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
    borderRadius: 6,
    marginRight: 8,
  },
  inputQuantity: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    width: 40,
    height: 20,
    fontSize: 12,
    textAlign: "center",
    borderColor: "#707070",
  },
  buttonChangeProduct: {
    paddingVertical: 10,
    backgroundColor: "#1890ff",
    alignItems: "center",
    borderRadius: 8,
  },
  textIn_DeQuantity: {
    borderWidth: 0.5,
    paddingHorizontal: 6,
    borderColor: "#707070",
  },
  buttonPhanloai: {
    backgroundColor: "#d3d3d3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    marginVertical: 4,
    paddingHorizontal: 4,
  },
  itemInCart: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
