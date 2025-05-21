import useOrder from "@hooks/useOrder";
import API from "@services/API";
import { store } from "@stores/index";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function orderMobile() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    "cartItems",
    "isCart",
    "guestCartItems",
    "cartCount",
    "buyerInfo",
  ]);
  const auth = store.auth.useToken();
  const order = useOrder();

  const payComplete = async (datas: ShopPayCompleteRequest) => {
    // const res = await API.order.payComplete(datas);
    // if (res.statusCode === 2000) {
    //   alert("결제가 완료되었습니다.");

    //   // 장바구니 쿠키, store 비우기
    //   if (cookies.isCart) {
    //     setCookie("cartItems", [], { path: "/" });
    //     auth.setCartCount(0);
    //     setCookie("guestCartItems", [], { path: "/" });
    //     setCookie("cartCount", 0, { path: "/" });
    //     removeCookie("isCart");
    //   }
    //   removeCookie("buyerInfo");

    //   // 회원, 게스트 url 설정
    //   order.gotoUrl(
    //     auth.token,
    //     router.query.merchant_uid,
    //     router.query.name,
    //     router.query.phone
    //   );
    // } else alert(res.message);
  };

  useEffect(() => {
    if (router.query.error_msg) {
      // 결제 실패시 주문페이지로 리다이렉트
      alert(router.query.error_msg);
      router.push(`/order?imp_uid=${router.query.imp_uid}`);
    } else {
      payComplete({
        imp_uid: router.query.imp_uid,
        merchant_uid: router.query.merchant_uid,
      });
    }
  }, []);
}
