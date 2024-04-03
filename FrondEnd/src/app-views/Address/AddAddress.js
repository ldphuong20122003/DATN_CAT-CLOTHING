import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import BackSvg from "../../../assets/Svg/BackSvg";
import ToggleSwitch from "toggle-switch-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "../../../config";
import ModalPopups from "../Modal/ModalPopup";
import iconDeleteSvg from "../../../assets/Svg/iconDeleteSvg";
import DeleteSvg from "../../../assets/Svg/DeleteSvg";

const AddAddress = ({ navigation }) => {
  const IP = config.IP;
  const [isToggled, setIsToggled] = useState(false); // State để theo dõi trạng thái bật/tắt
  const [userId, setUserId] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // Trạng thái để kiểm tra xem form có hợp lệ hay không
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
  const [fullname, setFullName] = useState(""); // State
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [listCity, setListCity] = useState([]);
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [listDistrict, setListDistrict] = useState([]);
  const [ward, setWard] = useState("");
  const [listWard, setListWard] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [visibleShowCity, setVisibleShowCity] = React.useState(false);
  const [visibleShowDistrict, setVisibleShowDistrict] = React.useState(false);
  const [visibleShowWard, setVisibleShowWard] = React.useState(false);

  const onToggle = (isOn) => {
    setIsToggled(isOn); // Cập nhật trạng thái dựa vào giá trị isOn
  };
  const gotoBack = () => {
    navigation.goBack();
  };
  const handleAddAddress = () => {
    if (!fullname || !phone || !city || !district || !ward || !address) {
      Alert.alert("Error", "Vui lòng điền đầy đủ thông tin địa chỉ");
      return;
    }
    const newAddress = {
      fullname: fullname,
      phone: phone,
      city: city,
      district: district,
      ward:ward,
      address: address,
      isDefault: isToggled,
    };

    AsyncStorage.getItem(`address_${userId}`)
      .then((addressesString) => {
        let addressesArray = [];
        if (addressesString !== null) {
          // Chuyển đổi giá trị từ chuỗi JSON thành mảng
          addressesArray = JSON.parse(addressesString);
        }
        // Kiểm tra xem addressesArray có phải là một mảng không
        if (!Array.isArray(addressesArray)) {
          // Nếu không phải mảng, bạn có thể tạo một mảng mới
          addressesArray = [];
        }
        // Thêm địa chỉ mới vào mảng
        addressesArray.push(newAddress);
        // Lưu mảng mới vào AsyncStorage
        AsyncStorage.setItem(
          `address_${userId}`,
          JSON.stringify(addressesArray)
        )
          .then(() => {
            Alert.alert("Success", "Thêm địa chỉ mới thành công");
            navigation.navigate("ChooseAddress");
          })
          .catch((error) => {
            console.error("Error saving new address: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching addresses from AsyncStorage: ", error);
      });
  };
  const getlistCity = () => {
    const apiUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Token: "43c646fe-f185-11ee-962e-3e7deb519ac3", // Thay thế bằng token của bạn
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListCity(data.data); // Ước lượng rằng setListCity là một hàm được sử dụng để cập nhật danh sách thành phố
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };
  const getlistDistrict = () => {
    const apiUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
      provinceId;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Token: "43c646fe-f185-11ee-962e-3e7deb519ac3", // Thay thế bằng token của bạn
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListDistrict(data.data); // Ước lượng rằng setListCity là một hàm được sử dụng để cập nhật danh sách thành phố
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };
  const getlistWard = () => {
    const apiUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" +
      districtId;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Token: "43c646fe-f185-11ee-962e-3e7deb519ac3", // Thay thế bằng token của bạn
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListWard(data.data); // Ước lượng rằng setListCity là một hàm được sử dụng để cập nhật danh sách thành phố
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };
  useEffect(() => {
    getUserId();
  }, [userId]);
  useEffect(() => {
    getlistCity();
  }, []);
  useEffect(() => {
    getlistDistrict();
  }, [provinceId]);
  useEffect(() => {
    getlistWard();
  }, [districtId]);
  const renderItemCity = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 8 }}
      onPress={() => {
        setCity(item.ProvinceName),
          setVisibleShowCity(false),
          setProvinceId(item.ProvinceID);
          setDistrict(""),
          setWard("")
      }}
    >
      <Text>{item.ProvinceName}</Text>
    </TouchableOpacity>
  );
  const renderItemDistrict = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 8 }}
      onPress={() => {
        setDistrict(item.DistrictName), setVisibleShowDistrict(false);
        setDistrictId(item.DistrictID);
        setWard("");
      }}
    >
      <Text>{item.DistrictName}</Text>
    </TouchableOpacity>
  );
  const renderItemWard = ({ item }) => (
    <TouchableOpacity style={{ padding: 8 }} onPress={() => {
      setWard(item.WardName);
      setVisibleShowWard(false);
    }}>
      <Text>{item.WardName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={StyleSheet.Container}>
      <View style={styles.Header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={gotoBack}>
            <SvgXml xml={BackSvg()} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              Thêm địa chỉ mới
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.Content}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#DADADA",
          }}
        >
          <Text style={{ color: "#5A5A5A" }}>Thông tin</Text>
        </View>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <TextInput
            placeholder="Họ và tên"
            placeholderTextColor={"#D4D4D4"}
            value={fullname}
            onChangeText={(txt) => setFullName(txt)}
          />
        </View>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <TextInput
            placeholder="Số điện thoại"
            placeholderTextColor={"#D4D4D4"}
            value={phone}
            onChangeText={(txt) => setPhone(txt)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#DADADA",
          }}
        >
          <Text style={{ color: "#5A5A5A" }}>Địa chỉ</Text>
        </View>

        <TouchableOpacity
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
          onPress={() => setVisibleShowCity(true)}
        >
          <TextInput
            placeholder="Tỉnh/Thành Phố"
            placeholderTextColor={"#D4D4D4"}
            value={city}
            editable={false}
            onChangeText={(txt) => setCity(txt)}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
          onPress={() => setVisibleShowDistrict(true)}
        >
          <TextInput
            placeholder="Quận/Huyện"
            placeholderTextColor={"#D4D4D4"}
            value={district}
            editable={false}
            onChangeText={(txt) => setDistrict(txt)}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
          onPress={() => setVisibleShowWard(true)}
        >
          <TextInput
            placeholder="Phường/Xã"
            placeholderTextColor={"#D4D4D4"}
            value={ward}
            editable={false}
            onChangeText={(txt) => setWard(txt)}
            color="#000"
          />
        </TouchableOpacity>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <TextInput
            placeholder="Tên đường/Số nhà"
            placeholderTextColor={"#D4D4D4"}
            value={address}
            onChangeText={(txt) => setAddress(txt)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: "#DADADA",
          }}
        >
          <Text style={{ color: "#5A5A5A" }}>Cài đặt</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 0.3,
            borderBottomColor: "#D4D4D4",
          }}
        >
          <Text>Loại địa chỉ</Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "#DADADA",
                borderRadius: 4,
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>Văn phòng</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "#DADADA",
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 12, color: "#707070" }}>Nhà riêng</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Đặt làm địa chỉ mặc định</Text>
          <ToggleSwitch
            isOn={isToggled} // Sử dụng state isToggled để kiểm soát trạng thái bật/tắt
            onColor="#1890ff" // Màu khi toggle được bật
            offColor="#D4D4DE" // Màu khi toggle được tắt
            size="small" // Kích thước của toggle switch
            onToggle={onToggle} // Hàm được gọi khi trạng thái của toggle thay đổi
          />
        </View>

        <TouchableOpacity onPress={handleAddAddress}>
          <View
            style={{
              backgroundColor: "#1890ff",
              marginTop: 16,
              paddingVertical: 10,
              marginHorizontal: 16,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                color: "white",
              }}
            >
              Hoàn thành
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ModalPopups visible={visibleShowCity}>
        <View style={{ height: 350 }}>
          <View
            style={{
              marginBottom: 10,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                Chọn Tỉnh/Thành Phố
              </Text>
            </View>
            <TouchableOpacity onPress={() => setVisibleShowCity(false)}>
              <SvgXml xml={DeleteSvg()} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={listCity}
            renderItem={renderItemCity}
            keyExtractor={(item) => item.ProvinceID.toString()}
          />
        </View>
      </ModalPopups>
      <ModalPopups visible={visibleShowDistrict}>
        <View style={{ height: 350 }}>
          <View
            style={{
              marginBottom: 10,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                Chọn Quận/Huyện
              </Text>
            </View>
            <TouchableOpacity onPress={() => setVisibleShowDistrict(false)}>
              <SvgXml xml={DeleteSvg()} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={listDistrict}
            renderItem={renderItemDistrict}
            keyExtractor={(item) => item.DistrictID.toString()}
          />
        </View>
      </ModalPopups>
      <ModalPopups visible={visibleShowWard}>
        <View style={{ height: 350 }}>
          <View
            style={{
              marginBottom: 10,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                Chọn Phường/Xã
              </Text>
            </View>
            <TouchableOpacity onPress={() => setVisibleShowWard(false)}>
              <SvgXml xml={DeleteSvg()} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={listWard}
            renderItem={renderItemWard}
            keyExtractor={(item) => item.WardCode.toString()}
          />
        </View>
      </ModalPopups>
    </View>
  );
};
export default AddAddress;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890FF",
    paddingTop: 30,
    paddingBottom: 12,
  },
});
