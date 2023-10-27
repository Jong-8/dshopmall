import API from "@services/API";
import { store } from "@stores/index";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type optionProps = {
  optionDetailCounter: number;
  name: string | "";
  qty: number | 1;
  price: number | 0;
  stock: number | 0;
};

type optionsProps = {
  optionCounter: number;
  selectOptions: optionProps[];
};

type buyItemProps = {
  counter: number;
  name: string;
  thumbnail: string;
  options: optionsProps;
};

export default function useOrder() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "buyItem",
    "buyItemsData",
  ]);
  const [userInfo, setUserInfo] = useState<{
    userName: string;
    userPhone1: string;
    userPhone2: string;
    userPhone3: string;
    userEmail: string;
  }>({
    userName: "",
    userPhone1: "",
    userPhone2: "",
    userPhone3: "",
    userEmail: "",
  });
  const [addressInfo, setAddressInfo] = useState<{
    addrName: string | undefined;
    zipcode: string | undefined;
    address: string | undefined;
    detailed: string | undefined;
    addrPhone1: string | undefined;
    addrPhone2: string | undefined;
    addrPhone3: string | undefined;
    requests: string;
    setBasic: boolean;
  }>({
    addrName: "",
    zipcode: "",
    address: "",
    detailed: "",
    addrPhone1: "",
    addrPhone2: "",
    addrPhone3: "",
    requests: "",
    setBasic: false,
  });
  const [myPoint, setMyPoint] = useState<number | undefined>(undefined);
  const [buyItems, setBuyItems] = useState<buyItemProps[]>();
  const [buyItemsData, setBuyItemsData] = useState<ShopPayItemType[]>();
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [bank, setBank] = useState({
    bankName: "",
    bankNumber: "",
    bankHolder: "",
  });
  const auth = store.auth.useToken();
  const shopInfo = store.shop.useShopInfo();

  const phoneForm = (num: string | undefined, type: number) => {
    let result = "";
    if (num?.length == 11) {
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

  const orderInit = () => {
    let totalItemsPrice = 0;
    cookies.buyItem.map((buyItem: buyItemProps) => {
      //console.log(buyItem);
      buyItem.options.selectOptions.map((option: optionProps) => {
        //console.log(option);
        totalItemsPrice = totalItemsPrice + option.price * option?.qty;
      });
    });
    setBuyItems(cookies.buyItem);
    setBuyItemsData(cookies.buyItemsData);
    setTotalItemsPrice(totalItemsPrice);
    setTotalPrice(
      totalItemsPrice >= 100000 ? totalItemsPrice : totalItemsPrice + 3000
    );
    setDeliveryCost(totalItemsPrice >= 100000 ? 0 : 3000);
  };

  useEffect(() => {
    orderInit();
    if (auth.token) {
      setMyPoint(auth.user.point);
      setUserInfo({
        userName: auth.user.name,
        userPhone1: phoneForm(auth.user.phone, 1),
        userPhone2: phoneForm(auth.user.phone, 2),
        userPhone3: phoneForm(auth.user.phone, 3),
        userEmail: auth.user.email,
      });
      setAddressInfo({
        ...addressInfo,
        addrName: auth.user.deliveryInfo.name,
        zipcode: auth.user.deliveryInfo.zipcode,
        address: auth.user.deliveryInfo.address,
        detailed: auth.user.deliveryInfo.detailed,
        addrPhone1: phoneForm(auth.user.deliveryInfo.phone, 1),
        addrPhone2: phoneForm(auth.user.deliveryInfo.phone, 2),
        addrPhone3: phoneForm(auth.user.deliveryInfo.phone, 3),
      });
    } else {
      setMyPoint(0);
    }

    if (shopInfo.shopInfo) {
      setBank({
        bankName: shopInfo.shopInfo.bankName,
        bankNumber: shopInfo.shopInfo.bankNumber,
        bankHolder: shopInfo.shopInfo.bankHolder,
      });
    }
  }, [auth.token, shopInfo.shopInfo]);

  return {
    userInfo,
    setUserInfo,
    addressInfo,
    setAddressInfo,
    buyItems,
    buyItemsData,
    totalItemsPrice,
    totalPrice,
    setTotalPrice,
    deliveryCost,
    myPoint,
    auth,
    bank,
    phoneForm,
  };
}
