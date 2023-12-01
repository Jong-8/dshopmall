import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import { useState, useEffect } from "react";
import CartList from "@components/Cart/CartList";
import { useCookies } from "react-cookie";
import { store } from "@stores/index";
import API from "@services/API";

export default function Cart() {
  const [count, setCount] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies([
    "cartCount",
    "cartItems",
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

  const setCart = async (token: string) => {
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
    if (auth.token) {
      setCart(auth.token);
      setCount(auth.cartCount);
    } else {
      if (cookies.cartCount) {
        setCount(cookies.cartCount);
      } else {
        setCount(0);
      }
    }
  }, [auth.cartCount, cookies.cartCount]);

  return (
    <>
      <Header title="장바구니" description="장바구니" />
      <div className="pt-[100px] max-w-[1800px] m-auto max-md:pt-[58px]">
        <div className="pt-[60px] px-[106px] pb-[70px] max-md:px-3">
          <div>
            <div className="text-2xl font-bold tracking-wider mb-10 max-md:text-lg max-md:mb-8">
              장바구니 ({count})
            </div>
          </div>
          <div>
            {count > 0 ? (
              <CartList />
            ) : (
              <div className="py-[200px] text-center leading-6 max-md:py-[120px] max-md:text-sm">
                장바구니가 비어 있습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
