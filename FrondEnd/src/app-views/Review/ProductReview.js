import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import { Rating } from "react-native-ratings";
import config from "../../../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import ModalPopups from "../Modal/ModalPopup";
import LottieView from "lottie-react-native";

const IP = config.IP;
const ProductReview = ({ navigation, route }) => {
  const product = route.params.product;
  const orderID = route.params.itemId;
  const [userId, setUserId] = useState("");
  const [visible, setVisible] = useState(false);
  const [data_User, setData_User] = useState([]);
  const getUserId = async () => {
    try {
      const userIdValue = await AsyncStorage.getItem("UserId");
      if (userIdValue !== null) {
        setUserId(userIdValue);
        return fetch(`http://${IP}:3000/API/users/`)
          .then((res) => res.json())
          .then((data) => {
            const filteredUser = data.filter((user) => user.id === userIdValue);
            setData_User(filteredUser);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const gotoBack = () => {
    navigation.goBack();
  };
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const currentDate = moment();
  const formattedDate = currentDate.format("HH:mm DD/MM/YYYY");
  const ratingCompleted = (rating) => {
    setRating(rating);
  };
  const gotoHome = () => {
    navigation.navigate("BottomTabScreen");
    setVisible(false);
  };
  const handleReview = async () => {
    try {
      // Kiểm tra xem đã có đánh giá cho sản phẩm, người dùng và đơn hàng cụ thể hay chưa
      const response = await axios.get(`http://${IP}:3000/API/Rating`);
      const reviews = response.data; // Danh sách đánh giá đã có trong hệ thống
      const isReviewExist = reviews.some((review) => {
        return (
          review.id_Order === orderID&&
          review.id_product === product.id_product &&
          review.id_User === userId 
         
        );
      });

      if (isReviewExist) {
        // Nếu đã có đánh giá, hiển thị thông báo
        Alert.alert(
          "Error",
          "Sản phẩm " +
            product.name +
            " trong đơn hàng " +
            orderID +
            " đã được đánh giá. Vui lòng đặt sản phẩm mới để đánh giá tiếp."
        );
        // Thực hiện hành động phù hợp ở đây, ví dụ: hiển thị thông báo cảnh báo
      } else {
        // Nếu chưa có đánh giá, gửi đánh giá mới
        const data = {
          id_User: userId,
          name_User:data_User[0].FullName,
          avatar_User:data_User[0].Avatar,
          id_product: product.id_product,
          id_Order: orderID,
          rating: rating,
          comment: comment,
          size: product.size,
          date: formattedDate,
        };

        // Gửi yêu cầu POST để thêm đánh giá mới
        const addReviewResponse = await axios.post(
          `http://${IP}:3000/API/Rating/add`,
          data
        );
        setVisible(true);
      }
    } catch (error) {
      console.error("Error handling review:", error);
    }
  };

  useEffect(() => {
    getUserId();
  }, [userId]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={gotoBack}>
          <SvgXml xml={BackSvg()} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá</Text>
      </View>
      <View style={{ ...styles.content }}>
        <View style={styles.productInfo}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productSize}>Phân loại: {product.size}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>
            Đánh giá của bạn cho sản phẩm này
          </Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={40}
            onFinishRating={(rating) => ratingCompleted(rating)}
            startingValue={rating}
            style={styles.rating}
          />
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>
            Bình luận của bạn cho sản phẩm này
          </Text>
          <View style={styles.commentInputContainer}>
            <TextInput
              placeholder="Nhập nội dung ..."
              multiline={true}
              value={comment}
              onChangeText={setComment}
              style={styles.commentInput}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleReview} style={styles.footer}>
        <Text style={styles.footerText}>Gửi</Text>
      </TouchableOpacity>
      <ModalPopups visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: 50, height: 70 }}>
            <LottieView
              source={require("../../../assets/Animation - 1711695455244.json")}
              style={{ width: "100%" }}
              autoPlay
              loop={false}
            />
          </View>
          <Text style={{ color: "#6AC259", fontSize: 16, fontWeight: 600 }}>
            Đánh giá thành công
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 400, color: "#707070" }}>
            Quay trở lại trang chủ để tiếp tục mua hàng
          </Text>
          <View style={{}}>
            <TouchableOpacity onPress={gotoHome}>
              <View
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  borderColor: "#1890FF",
                  alignItems: "center",
                  marginTop: 30,
                  borderRadius: 6,
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{ color: "#1890ff", fontSize: 14, fontWeight: 600 }}
                >
                  Trang chủ
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopups>
    </View>
  );
};
export default ProductReview;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    marginBottom: 24,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productSize: {
    fontSize: 14,
    color: "#707070",
  },
  ratingContainer: {
    marginTop: 16,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  rating: {
    marginTop: 10,
  },
  commentContainer: {
    marginTop: 16,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  commentInputContainer: {
    borderWidth: 1,
    borderColor: "#707070",
    marginTop: 8,
    height: 120,
    borderRadius: 16,
  },
  commentInput: {
    flex: 1,
    padding: 10,
  },
  footer: {
    marginHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#1890ff",
    borderRadius: 8,
    marginVertical: 16,
  },
  footerText: {
    color: "#fff",
    fontWeight: "600",
  },
});
