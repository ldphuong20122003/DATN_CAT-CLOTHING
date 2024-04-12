import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import iconDollarSvg from "../../../../assets/Svg/iconDollarSvg";
import { useNavigation } from "@react-navigation/native";
const ListOrder = ({ data, onPress }) => {
  const navigation= useNavigation();
  const [isChecked, setChecked] = useState(false);
  const pressItem = (item) => {
    navigation.navigate('Information_Order',{item:item})

  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ borderBottomWidth: 10, borderBottomColor: "#dadada" }}>
        <TouchableOpacity onPress={() => pressItem(item)}>
          <View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 16,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderBottomWidth: 0.5,
                  borderColor: "#D4D4D4",
                }}
              >
                <View style={{ marginLeft: 12 }}>
                  {item.product[0].image && (
                    <Image
                      source={{ uri: item.product[0].image }}
                      style={{
                        height: 100,
                        width: 100,
                      }}
                    />
                  )}
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: 400, color: "#2d2d2d" }}
                  >
                    {item.product[0].name}
                  </Text>

                  <View
                    style={{
                      width: "62%",
                      flexDirection: "row",
                      paddingVertical: 4,
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 10 }}>Phân loại: {""}</Text>
                      <Text style={{ fontSize: 10 }}>
                        {item.product[0].size}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12 }}>
                      x{item.product[0].soluong}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#EF4444",
                      marginTop: 5,
                    }}
                  >
                    {item.product[0].price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    đ
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 16,
                paddingBottom: 16,
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
                borderColor: "#D4D4D4",
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>
                Số lượng : {item.tongsanpham} sản phẩm
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgXml xml={iconDollarSvg()} />
                <Text style={{ fontSize: 14, marginLeft: 6 }}>
                  Thành tiền :{" "}
                </Text>
                <Text style={{ fontWeight: 600, color: "#EF4444" }}>
                  {item.totalPayment
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  đ
                </Text>
              </View>
            </View>

            {item.status ? (
              <View>
                {item.status === "Chờ xác nhận" && (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: "#707070",
                      }}
                    >
                      Đơn hàng đang chờ shop xác nhận
                    </Text>
                    <View
                      style={{
                        padding: 4,
                        backgroundColor: "#E2E2E2",
                        borderRadius: 4,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "#5A5A5A" }}>
                        Chờ xác nhận
                      </Text>
                    </View>
                  </View>
                )}
                {item.status === "Chờ lấy hàng" && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          color: "#707070",
                        }}
                      >
                        Đơn hàng đang chờ đơn vị vận chuyển
                      </Text>
                      <View
                        style={{
                          padding: 4,
                          backgroundColor: "#E2E2E2",
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ fontSize: 12, color: "#5A5A5A" }}>
                          Chờ lấy hàng
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {item.status === "Chờ giao hàng" && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          color: "#707070",
                        }}
                      >
                        Đơn hàng đang được giao
                      </Text>
                      <View
                        style={{
                          padding: 4,
                          backgroundColor: "#00CBD8",
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ fontSize: 12, color: "#fff" }}>
                          Chờ giao hàng
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {item.status === "Đã giao" && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          color: "#707070",
                        }}
                      >
                        Đơn hàng đã được giao đến bạn
                      </Text>
                      <View
                        style={{
                          padding: 4,
                          backgroundColor: "#1890ff",
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ fontSize: 12, color: "#fff" }}>
                          Đã giao
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {item.status === "Đã hủy" && (
                  <View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 400,
                            color: "#707070",
                          }}
                        >
                          Đơn hàng đã được hủy
                        </Text>
                        <View
                          style={{
                            padding: 4,
                            backgroundColor: "#FF3838",
                            borderRadius: 4,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: "#fff" }}>
                            Đã hủy
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{}}
    />
  );
};
export default ListOrder;
