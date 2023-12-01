import API from "@services/API";
import { store } from "@stores/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export default function useOrderDetail() {
  const [orderItems, setOrderItems] = useState<ShopOrderDetailItemType[]>();
  const [orderInfos, setOrderInfos] = useState<ShopOrderInfoType>();
  const [paymentInfos, setPaymentInfos] = useState<ShopPaymentInfoType>();
  const [deliveryInfo, setDeliveryInfo] = useState<{
    userName: string | undefined;
    zipcode: string | undefined;
    address: string | undefined;
    detailed: string | undefined;
    phone1: string | undefined;
    phone2: string | undefined;
    phone3: string | undefined;
    requests: string | undefined;
  }>();
  const [merchantUid, setMerchantUid] = useState<
    string | string[] | undefined
  >();
  const [bank, setBank] = useState({
    bankName: "",
    bankNumber: "",
    bankHolder: "",
  });
  const [isTicket, setIsTicket] = useState<boolean>(false);
  const auth = store.auth.useToken();
  const shopInfo = store.shop.useShopInfo();
  const router = useRouter();

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

  const orderData = async (type: string, query: ParsedUrlQuery) => {
    let datas;
    if (type === "member") {
      datas = {
        merchant_uid: query.id,
      };
    } else {
      datas = {
        name: query.name,
        merchant_uid: query.id,
        phone: query.phone,
      };
    }
    const res = await API.order.orderDetail(type, datas, auth.token ?? "");
    console.log(router.query.id)
    console.log(res)
    if (res.statusCode === 2000) {
      setOrderItems(res.result.items);
      setDeliveryInfo({
        userName: res.result.deliveryInfo?.name,
        zipcode: res.result.deliveryInfo?.zipcode,
        address: res.result.deliveryInfo?.address,
        detailed: res.result.deliveryInfo?.detailed,
        requests: res.result.deliveryInfo?.requests,
        phone1: phoneForm(res.result.deliveryInfo?.phone, 1),
        phone2: phoneForm(res.result.deliveryInfo?.phone, 2),
        phone3: phoneForm(res.result.deliveryInfo?.phone, 3),
      });
      setOrderInfos(res.result.orderInfo);
      setPaymentInfos(res.result.paymentInfo);

      res.result.items.map((item) => {
        if (item.counter === 9) {
          setIsTicket(true);
        }
      });
    } else alert(res.message);
    console.log(router.query.id)
  };

  useEffect(() => {
    if(!router.isReady) return;
    if(!router.query.id) return;
    console.log(router.query.id)

    setMerchantUid(router.query.id);
    if (auth.token) {
      orderData("member", router.query);
    } else {
      orderData("guest", router.query);
    }

    if (shopInfo.shopInfo) {
      setBank({
        bankName: shopInfo.shopInfo.bankName,
        bankNumber: shopInfo.shopInfo.bankNumber,
        bankHolder: shopInfo.shopInfo.bankHolder,
      });
    }
  }, [auth.token, router.query, router.isReady, router.query.id, shopInfo.shopInfo]);

  return {
    merchantUid,
    orderItems,
    orderInfos,
    paymentInfos,
    deliveryInfo,
    setDeliveryInfo,
    router,
    auth,
    bank,
    isTicket
  };
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
