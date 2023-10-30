import { useState, useEffect } from "react";
import { store } from "@stores/index";
import API from "@services/API";

export default function useMypage() {
  const [orderList, setOrderList] = useState<ShopOrderType[]>();
  const [userInfos, setUserInfos] = useState<mypageUserType>();
  const { token, user, setToken, setCartCount } = store.auth.useToken();

  const phoneForm = (num: string, type: number) => {
    let result = "";
    if (num.length == 11) {
      if (type === 1) {
        result = num.substr(0, 3);
      } else if (type === 2) {
        result = num.substr(3, 4);
      } else {
        result = num.substr(7);
      }
    } else {
    }
    return result;
  };

  const orderListData = async (token: string) => {
    const res = await API.order.orderList(token);
    if (res.statusCode === 2000) {
      setOrderList(res.result.orderItems);
    } else {
      alert(res.message);
    }
  };

  useEffect(() => {
    if (token) {
      setUserInfos({
        username: user.name,
        phone1: phoneForm(user.phone, 1),
        phone2: phoneForm(user.phone, 2),
        phone3: phoneForm(user.phone, 3),
        code: user.code,
        email: user.email,
        deliveryInfo: {
          zipcode: user.deliveryInfo.zipcode,
          address: user.deliveryInfo.address,
          detailed: user.deliveryInfo.detailed,
        },
        marketing: user.marketing,
      });
      orderListData(token);
    }
  }, [
    token,
    user.email,
    user.name,
    user.phone,
    user.deliveryInfo.zipcode,
    user.deliveryInfo.address,
    user.deliveryInfo.detailed,
    user.marketing,
  ]);

  return { userInfos, setUserInfos, setToken, orderList, setCartCount };
}
