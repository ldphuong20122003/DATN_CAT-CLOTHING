import React from "react";
import { View } from "react-native";
import ListRecommend_Home from "./component/ListRecommend_Home";

const Recommend_Home = () => {
  const default_data1 = [
    {
      title: "Áo Sweater dài tay",
      image:
        "data:image/webp;base64,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",
      pricesale: "160.000đ",
      price: "300.000đ",
      address: "Hà Nội",
      sold: "Đã bán 172",
    },
    {
      title: "Áo Sweater dài tay",
      image:
        "data:image/webp;base64,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",
      pricesale: "160.000đ",
      price: "300.000đ",
      address: "Hà Nội",
      sold: "Đã bán 172",
    },
  ];
  const default_data2 = [
    {
      title: "Áo Sweater dài tay",
      image:
        "data:image/webp;base64,UklGRgwFAABXRUJQVlA4WAoAAAAQAAAArwAArwAAQUxQSCcAAAABFyAQSFKffI2ICAczAZPcBKCZeFvK0itARP8n4ALWkLykT/3f3QIAVlA4IL4EAAAwHwCdASqwALAAPt1ssFMopaSipFIJSRAbiWNu3V6dtNQ3dOgE9L3+o3YG423pP+NepX0zTTH3EB+LUhzzfg1QWPXkseol0hrG8GcAw5Bf4xrKRasFjWM57M04hRFZOc8m0bK98/QD+gKQFd60oQWnOclkC00+pguPmoHW6KNqMhRpGKK6BBCpGiCpyX1wCNoKfJCzd1+WGlCV4Rphwz+ybf77SNhfSTWrwVgw2/Hc8pOo/vMKHtae9viwDBuMj8XiWrvSu4ae/0XaHEMgF1Kbm2TX7iwdkBQvZNWBnAcYJfqghYSu5LKJJdqOluYmseZDML94P2CU6pIZ4L36dIgTV4AA/u/YLIy4J8ZbwI9C7C6703QmfDDu2h4T4R7o1k1xPG+M7tqo8VAfjPNMRgmCP4wHNxONwg9oSEhOCDtm5QF4e9Vsc/yhfMChnsJfZofi+epbHF/kJKvtVc5X/7u/g13dkKgondpTQOoCt+MDWHW31JmFPjb4GcIhliU050EIb8QirXD77GniZxo2d2gzQ/T44TpO9/xdfd/UWuqav9ktDeZq0/Mv6pjVZXk3erqCPJqPgPOda8I0YsiZ9k760hv3o6fhPHqdvUqI6bFTSr1M+888p8ycQM1XYSU2222lkmt/+3VQdOSuNNn5QzhAsR/USOsdUHAj/T+FF3+E99qTs3cFIKEUyC022SR5ykUsdyGeRT/anA1vbFa4EKOOs8GUsHc2cZlzlJ7d7mkez2pK0HaZ3aFcwmLg0c2nya+/pbRuxrkRoYYgzzVaMhejjF4jE+gmG3nV1EFugymtB1lnyY70+BoJvIhxwEnBUVL/xpjN8OfZmq/YfQtB3ruFanwDOLvQyCol0Yjw1br8uTXKY3JRda2/R9b0xzremGNlqXZSoyWyGBP+vEP7i30MHy1SC7eTzBTmMNltbIzsHKA3y2ruExh8nyrOg7LVDX4k2oLG5yz/H/FP6XuXZEDffRyKXTaP99ez28diw+WkRk46rI7erniDzqSh7lkI+eJQM18fQDf6AFvKm79YzuOYFXElbN5gXc37KMzdLXIMVQtdJQ1guU+efclH/VYayP5Sqpyjfzh+RQj4qfMTE7V19t0LkGTkWQQmJCfJqZ+NG8IV60HOuPSxkjgjHJNDI+WxIstTx/Hed7Zu0aD30vLlaWKSs77N/5t/ALhqceGjGePgXsY51IjYOgifQ51bTE7xfD12qpXzNm+fFyTiD+c+ZMzhAj5vnTHJErMpP/dy94Oa5urfBVKi/9wZdqaHgVMtGJMCdJIlu4ey8DXOSuEQccfPcvYN+7HxzMPNIerFi3thTIhDm7FW0SKjlMkF7Q/jGg5flyMjj6pnskLje/cqxw2h+Zh6oWuuPDSGPSw+n2Opif0I3tCoYmf/AORJSQLnIT38s9heRgNHl/HvvB+9fYNzCda8/6gh69oyAObABqY79wF/1xZu5Ne5NtWLBDzl1tCuhrES0uDooDQY/W/6VsfobvITDJkYfuVZKMLai/UPwPzJIWK4eLcf5p2hZgUuYfS6zwW9ROxSlmLb2V25t269cEqgNAPoBsJ15J/Uzyt267rZOVCCX7j+ZSdBQH7S5lPueHwwc1ABg9ggAA==",
      pricesale: "160.000đ",
      price: "300.000đ",
      address: "Hà Nội",
      sold: "Đã bán 172",
    },
    {
      title: "Áo Sweater dài tay",
      image:
        "data:image/webp;base64,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",
      pricesale: "160.000đ",
      price: "300.000đ",
      address: "Hà Nội",
      sold: "Đã bán 172",
    },
  ];
  return (
    <>
      <View >
        <View
          style={{
         
            borderBottomWidth: 0.5,
            borderColor: "#fff",
            paddingBottom: 7,
          }}
        >
          <ListRecommend_Home data={default_data1} />
        </View>
        <View
          style={{
           
            borderBottomWidth: 0.5,
            borderColor: "#fff",
            paddingBottom: 7,
          }}
        >
          <ListRecommend_Home data={default_data2} />
        </View>
      </View>
    </>
  );
};
export default Recommend_Home;
