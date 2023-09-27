import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import { useState, useEffect } from "react";
import { cartItems } from "../services/dummy/dummy";
import CartList from "@components/Cart/CartList";

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

  return (
    <>
      <Header title="장바구니" description="장바구니" />
      <div className="pt-[100px] max-w-[1800px] m-auto">
        <div className="pt-[60px] px-[106px] pb-[70px]">
          <div>
            <div className="text-2xl font-bold tracking-wider mb-10">
              장바구니 ({count})
            </div>
          </div>
          <div>
            {count > 0 ? (
              <CartList cartItems={cartItems} />
            ) : (
              <div className="py-[200px] text-center leading-6">
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
