import API from "@services/API";
import { store } from "@stores/index";
import { useRouter } from "next/router";
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
    "cartItems",
    "guestCartItems",
    "cartCount",
    "buyerInfo",
    "isCart",
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
  const [point, setPoint] = useState<number | undefined>(undefined);
  const [buyItems, setBuyItems] = useState<buyItemProps[]>();
  const [buyItemsData, setBuyItemsData] = useState<ShopPayItemType[]>();
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [payment, setPayment] = useState("creditCard");
  const [btn, setBtn] = useState(false);
  const [bank, setBank] = useState({
    bankName: "",
    bankNumber: "",
    bankHolder: "",
  });
  const router = useRouter();
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

  const gotoUrl = (
    token: string = "",
    merchant_uid: string | string[] | undefined,
    name: string | string[] | undefined = "",
    phone: string | string[] | undefined = ""
  ) => {
    let url = "";
    if (token) {
      url = `/orderDetails/${merchant_uid}`;
    } else {
      url = `/orderDetails/${merchant_uid}?name=${name}&phone=${phone}`;
    }

    router.push(url);
  };

  const orderInit = () => {
    let totalItemsPrice = 0;
    cookies.buyItem.map((buyItem: buyItemProps) => {
      buyItem.options.selectOptions.map((option: optionProps) => {
        totalItemsPrice = totalItemsPrice + option.price * option?.qty;
      });
    });
    const totalPrice =
      totalItemsPrice >= 100000 ? totalItemsPrice : totalItemsPrice + 3000;
    const deliveryCost = totalItemsPrice >= 100000 ? 0 : 3000;
    setBuyItems(cookies.buyItem);
    setBuyItemsData(cookies.buyItemsData);
    setTotalItemsPrice(totalItemsPrice);
    setTotalPrice(totalPrice);
    setDeliveryCost(deliveryCost);
    setBtn(true);

    return totalPrice;
  };

  const payComplete = async (
    datas: ShopPayCompleteRequest,
    userInfos: { name: string; phone: string }
  ) => {
    const res = await API.order.payComplete(datas);
    alert(res.statusCode);
    if (res.statusCode === 2000) {
      if (cookies.buyerInfo) {
        alert(
          payment !== "withoutBankbook"
            ? `결제가 완료되었습니다.`
            : "입금 확인 후 결제가 완료됩니다."
        );

        // 장바구니 쿠키, store 비우기
        if (cookies.isCart) {
          setCookie("cartItems", [], { path: "/" });
          auth.setCartCount(0);
          setCookie("guestCartItems", [], { path: "/" });
          setCookie("cartCount", 0, { path: "/" });
          removeCookie("isCart");
        }
        removeCookie("buyerInfo");
      }
    } else alert(res.message);
  };

  useEffect(() => {
    if (router.query.imp_uid && router.query.imp_success) {
      // 모바일 결제 리다이렉트시 imp_uid가 있으면
      if (!router.query.error_msg) {
        // 결제 성공시
        payComplete(
          {
            imp_uid: router.query.imp_uid,
            merchant_uid: router.query.merchant_uid,
          },
          {
            name: `${cookies.buyerInfo.guest_name}`,
            phone: cookies.buyerInfo.guest_phone,
          }
        );

        gotoUrl(
          auth.token,
          router.query.merchant_uid,
          cookies.buyerInfo.guest_name,
          cookies.buyerInfo.guest_phone
        );
      } else {
        // 결제 실패시 주문페이지로 리다이렉트
        router.push(`/order?imp_uid=${router.query.imp_uid}`);
      }
    } else if (router.query.imp_uid && !router.query.imp_success) {
      // 결제 실패 후 리다이렉트
      const init = orderInit();

      setUserInfo({
        userName: cookies.buyerInfo.guest_name,
        userPhone1: phoneForm(cookies.buyerInfo.guest_phone, 1),
        userPhone2: phoneForm(cookies.buyerInfo.guest_phone, 2),
        userPhone3: phoneForm(cookies.buyerInfo.guest_phone, 3),
        userEmail: auth.user.email,
      });

      const buyerDeliveryInfo = JSON.parse(cookies.buyerInfo.deliveryInfo);
      setAddressInfo({
        addrName: buyerDeliveryInfo.name,
        zipcode: buyerDeliveryInfo.zipcode,
        address: buyerDeliveryInfo.address,
        detailed: buyerDeliveryInfo.detailed,
        addrPhone1: phoneForm(buyerDeliveryInfo.phone, 1),
        addrPhone2: phoneForm(buyerDeliveryInfo.phone, 2),
        addrPhone3: phoneForm(buyerDeliveryInfo.phone, 3),
        setBasic: false,
        requests: buyerDeliveryInfo.requests,
      });

      setMyPoint(auth.user.point ?? 0);
      setPoint(cookies.buyerInfo.point);
      setTotalPrice(init - cookies.buyerInfo.point);
    } else {
      // 처음 진입
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
    }

    if (shopInfo.shopInfo) {
      setBank({
        bankName: shopInfo.shopInfo.bankName,
        bankNumber: shopInfo.shopInfo.bankNumber,
        bankHolder: shopInfo.shopInfo.bankHolder,
      });
    }
  }, [
    auth.token,
    shopInfo.shopInfo,
    router.query.imp_uid,
    router.query.imp_success,
  ]);

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
    btn,
    router,
    payment,
    setPayment,
    payComplete,
    point,
    setPoint,
    gotoUrl,
  };
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
