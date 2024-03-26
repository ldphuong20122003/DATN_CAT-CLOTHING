FavouriteScreen;
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import config from "../../../config";
import { SvgXml } from "react-native-svg";
import AddressSvg from "../../../assets/Svg/AddressSvg";
import FullFavouriteSvg from "../../../assets/Svg/FullFavouriteSvg";
import BackgroundFreeShip from "../../../assets/Svg/BackgroundFreeShip";
import BackgroundFavourite from "../../../assets/Svg/BackgroundFavourite";
import axios from "axios";

const FavouriteScreen = ({ navigation }) => {
  const IP = config.IP;
  const [userId, setUserId] = useState("");
  const [favouriteProductIDs, setFavouriteProductIDs] = useState([]);
  const [productList, setProductList] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [favouriteID, setFavouriteID] = useState("");
  const [favouriteList, setFavouriteList] = useState([]);

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

  const fetchFavouriteProductIDs = () => {
    setIsLoading(true);
    fetch(`http://${IP}:3000/API/fvr/`)
      .then((res) => res.json())
      .then((favouriteList) => {
        // Lọc danh sách yêu thích để chỉ lấy các ID_product
        const productIDs = favouriteList
          .filter((favourite) => favourite.ID_user === userId)
          .map((favourite) => favourite.ID_product);
        setFavouriteProductIDs(productIDs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchProductsByIDs = async (productIDs) => {
    try {
      const products = await Promise.all(
        productIDs.map(async (id) => {
          const response = await fetch(
            `http://${IP}:3000/API/product/?id=${id}`
          );
          if (response.ok) {
            const productData = await response.json();
            return productData;
          } else {
            throw new Error("Failed to fetch product");
          }
        })
      );
      // Phẳng mảng 2D thành mảng 1D
      const flattenedProducts = products.flat();
      // Lọc ra các sản phẩm không null hoặc không undefined
      const filteredProducts = flattenedProducts.filter(
        (product) => product !== null && product !== undefined
      );
      // Cập nhật danh sách sản phẩm trong state
      setProductList(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId !== "") {
      fetchFavouriteProductIDs();
    }
  }, [userId]);

  useEffect(() => {
    if (favouriteProductIDs.length > 0) {
      fetchProductsByIDs(favouriteProductIDs);
    }
  }, [favouriteProductIDs]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Gọi hàm getAPI để tải lại dữ liệu
      if (userId) {
        fetchFavouriteProductIDs();
        fetchFavouriteList();
      }
    });

    // Hủy lắng nghe sự kiện khi component bị hủy
    return unsubscribe;
  }, [navigation, userId]);

  useEffect(() => { }, [productList]);
  const fetchFavouriteList = async () => {
    try {
      const response = await axios.get(`http://${IP}:3000/API/fvr`);
      const data = response.data;
      setFavouriteList(data);
    } catch (error) {
      console.error("Error fetching favourite list:", error);
    }
  };
  useEffect(() => {
    fetchFavouriteList();
  }, []);
  const _renderItem = ({ item, index }) => {
    const handleRemoveFavourite = async () => {
      try {
        const favourite = favouriteList.find(
          (fav) => fav.ID_user === userId && fav.ID_product === item.id
        );

        if (favourite) {
          const favouriteId = favourite.id;

          // Gửi yêu cầu xóa sản phẩm yêu thích từ server
          await axios.delete(`http://${IP}:3000/API/fvr/delete/${favouriteId}`);

          // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm yêu thích
          fetchFavouriteProductIDs();
          fetchFavouriteList();
        } else {
          console.log("Không tìm thấy favouriteId.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm yêu thích:", error);
      }
    };
    const PriceSale = item.Price - item.Sale;
    if (!favouriteProductIDs.includes(item.id)) {
      // Nếu sản phẩm không có trong danh sách yêu thích, không hiển thị nó
      return null;
    }
   
      const pressItem = async () => {
        await navigation.navigate("Detail_Product", {
          productId: item.id,
        });
 
      };
    

    return (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
        onPress={() => pressItem()}
        >
          <View
            style={{
              width: 185,
              justifyContent: "center",
              marginTop: 14,
              borderRadius: 1,
              backgroundColor: "#fff",
              borderRadius: 4,
            }}
          >
            <View style={{}}>
              <View>
                {item.Img && (
                  <Image
                    source={{ uri: item.Img }}
                    style={{
                      height: 185,
                      width: 185,
                    }}
                  />
                )}
              </View>
              <View style={{ paddingHorizontal: 6 }}>
                <View
                  ml={2}
                  marginTop={5}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ color: "#5a5a5a", fontSize: 12, fontWeight: 400 }}
                  >
                    {item.Name}
                  </Text>
                  <TouchableOpacity onPress={handleRemoveFavourite}>
                    <SvgXml xml={FullFavouriteSvg()} />
                  </TouchableOpacity>
                </View>
                <View ml={2} flexDirection={"row"}>
                  <Text
                    style={{
                      width: "50%",
                      color: "#F90D0D",
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    {PriceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    đ
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SvgXml xml={AddressSvg()} />
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 400,
                        color: "#707070",
                      }}
                    >
                      Hà Nội
                    </Text>
                  </View>
                </View>
                {item.Sale !== "0" ? (
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#707070",
                      textDecorationLine: "line-through",
                    }}
                  >
                    {item.Price.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    )}
                    đ
                  </Text>
                ) : null}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                  alignItems: "center",
                }}
              >
                <View style={{ paddingHorizontal: 6 }}>
                  <SvgXml xml={BackgroundFreeShip()} />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#ffff",
                      position: "absolute",
                      marginLeft: 6,
                    }}
                  >
                    Freeship
                  </Text>
                </View>
                <View style={{ alignItems: "center", marginLeft: 8 }}>
                  <SvgXml xml={BackgroundFavourite()} />
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: 400,
                      color: "#ffff",
                      position: "absolute",
                    }}
                  >
                    Yêu thích
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#1890FF" />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            numColumns={numColumns}
            data={productList}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            key={numColumns.toString()} // Sử dụng giá trị của numColumns làm giá trị key
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavouriteScreen;
