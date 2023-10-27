import API from "@services/API";
import { store } from "@stores";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "cartItems",
    "cartCount",
    "guestCartItems",
  ]);
  const auth = store.auth.useToken();
  const cart = store.cart.useCart();

  const calculateCount = (arr: ShopCartType[]) => {
    let totalCount = 0;
    arr.map((item: ShopCartType) => {
      totalCount += item.qty;
    });
    return totalCount;
  };

  const tokenLogin = async (token: string) => {
    const res = await API.auth.tokenLogin(token);
    if (res.statusCode === 2000) {
      auth.setToken(res.result.token, res.result.user);
      setCookie("token", token, {
        path: "/",
      });
    } else {
      alert(res.message);
      return false;
    }

    const cartItems = await API.cart.cart(token);
    if (cartItems.statusCode === 2000) {
      cart.setCart(cartItems.result.cartItems);
      auth.setCartCount(calculateCount(cartItems.result.cartItems));
      setCookie("cartItems", cartItems.result.cartItems, {
        path: "/",
      });
      setCookie("cartCount", cartItems.result.cartItems.length, {
        path: "/",
      });
    } else {
      alert(cartItems.message);
      return false;
    }
  };

  useEffect(() => {
    if (!auth.token) {
      // 회원 스토어에 정보가 없을때
      if (cookies.token) {
        // 쿠키 데이터가 있을때 쿠키 토큰으로 토큰로그인
        tokenLogin(cookies.token);
      } else {
        if (!cookies.guestCartItems) {
          setCookie("guestCartItems", [], { path: "/" });
          setCookie("cartCount", 0, { path: "/" });
        }
      }
    }
  }, [auth.token, cookies.token, cookies.guestCartItems, cookies.cartCount]);
}
