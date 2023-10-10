import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import { useState, useEffect } from "react";
import { cartItems } from "../services/dummy/dummy";
import CartList from "@components/Cart/CartList";
import { store } from "@stores/index";
import { useCount } from "./../stores/count.store";

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let itemCount = 0;
    let itemTotalPrice = 0;
    cartItems.map((cartItem) => {
      itemCount += cartItem.qty;
      itemTotalPrice += cartItem.price * cartItem.qty;
    });
    setCount(itemCount);
    setTotalQty(itemCount);
    setTotalPrice(itemTotalPrice);
  }, []);

  const counts = store.count.useCount();

  return (
    <>
      <Header title="장바구니" description="장바구니" />
      <div className="pt-[100px] max-w-[1800px] m-auto max-md:pt-[58px]">
        <div className="pt-[60px] px-[106px] pb-[70px] max-md:px-3">
          <div>
            <div className="text-2xl font-bold tracking-wider mb-10 max-md:text-lg max-md:mb-8">
              장바구니 ({count})
            </div>
            {/* <div>count : {counts.count}</div>
            <button onClick={() => counts.setCount(counts.count + 1)}>
              더하기
            </button> */}
          </div>
          <div>
            {count > 0 ? (
              <CartList cartItems={cartItems} />
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
