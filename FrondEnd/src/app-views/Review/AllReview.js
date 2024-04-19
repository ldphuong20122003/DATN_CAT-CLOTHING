import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import axios from "axios";
import config from "../../../config";
import ItemReview from "./component/ItemReview";
import { Rating } from "react-native-ratings";

const IP = config.IP;

const AllReview = ({ navigation, route }) => {
  const gotoBack = () => {
    navigation.goBack();
  };

  const productId = route.params.id_product;
  const [dataReview, setDataReview] = useState([]);
  const [ratingsCount, setRatingsCount] = useState({});
  const totalRating = dataReview.reduce((acc, curr) => acc + curr.rating, 0);
  const totalReviews = dataReview.length;

  // Tránh chia cho 0
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const getReview = async () => {
    try {
      const response = await axios.get(`http://${IP}:3000/API/Rating`);
      const filteredReviews = response.data.filter(
        (review) => review.id_product === productId
      );
      setDataReview(filteredReviews);

      // Đếm số lượng đánh giá cho mỗi mức độ đánh giá
      const ratings = {};
      filteredReviews.forEach((review) => {
        ratings[review.rating] = (ratings[review.rating] || 0) + 1;
      });
      setRatingsCount(ratings);
    } catch (error) {
      console.error("Error handling review:", error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={gotoBack}>
          <SvgXml xml={BackSvg()} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá sản phẩm</Text>
      </View>
      <View style={{ padding: 16 }}>
        <View style={styles.ratingContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{alignItems:'center'}}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              {averageRating.toFixed(1)}/5.0
            </Text>
            <Rating
              type="star"
              ratingCount={5}
              startingValue={averageRating} // Set the starting value for the rating
              imageSize={14}
              readonly // Make the rating readonly
              style={{ marginLeft: 8 }}
            />
            </View>
             <View style={styles.ratingsBarContainer}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <View key={rating} style={styles.ratingBar}>
                <Text style={styles.ratingText}>{rating} sao:</Text>
                <View style={styles.emptyBar} />
                <View
                  style={[
                    styles.fillBar,
                    { width: `${((ratingsCount[rating] || 0) * 100) / 20}%` },
                  ]}
                />
                <Text style={styles.ratingCount}>
                  {ratingsCount[rating] || 0}
                </Text>
              </View>
            ))}
          </View>
          </View>
         
        </View>
        <ItemReview data={dataReview} />
      </View>
    </View>
  );
};

export default AllReview;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  ratingContainer: {
    marginBottom: 16,
  },
  ratingsBarContainer: {
    marginTop: 16,marginLeft:30
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  emptyBar: {
    backgroundColor: "white",
    height: 10,
    width: "60%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  fillBar: {
    backgroundColor: "gold",
    height: 8,
    borderRadius: 8,
    position: "absolute",
    top: 7,
    left: 52.5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
