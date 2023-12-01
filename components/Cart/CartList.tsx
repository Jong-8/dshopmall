import QtyBox from "@components/Main/QtyBox";
import Button from "@components/Member/Button";
import API from "@services/API";
import { store } from "@stores/index";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useCookies } from "react-cookie";

export default function CartList() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [items, setItems] = useState<ShopCartType[]>();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    "buyItem",
    "buyItemsData",
    "cartItems",
    "guestCartItems",
    "cartCount",
    "isCart",
  ]);
  const auth = store.auth.useToken();
  const cart = store.cart.useCart();

  //console.log(cookies.guestCartItems);

  const itemPrice = (item: ShopCartType) => {
    const itemPrice =
      item.selectOption?.optionPrice > 0
        ? item.selectOption?.optionPrice
        : item.price;
    return itemPrice;
  };

  const calculateCount = (arr: ShopCartType[]) => {
    let totalCount = 0;
    arr.map((item: ShopCartType) => {
      totalCount += item.qty;
    });
    return totalCount;
  };

  const calculateTotal = (arr: ShopCartType[]) => {
    let totalPrice = 0;
    arr.map((item: ShopCartType) => {
      totalPrice += itemPrice(item) * item.qty;
    });
    return totalPrice;
  };

  const changeCart = (cartItems: ShopCartType[]) => {
    if (auth.token) {
      setCookie("cartItems", cartItems, { path: "/" });
      auth.setCartCount(calculateCount(cartItems));
    } else {
      setCookie("guestCartItems", cartItems, { path: "/" });
    }
    setCookie("cartCount", calculateCount(cartItems), { path: "/" });
    cart.setCart(cartItems);
    const totalPrice = calculateTotal(cartItems);
    if (totalPrice > 50000) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(3000);
    }
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    let totalPrice = 0;
    if (auth.token) {
      setItems(cart.cartItems);
      totalPrice = calculateTotal(cart.cartItems);
    } else {
      if (cookies.cartItems) {
        setItems(cookies.cartItems);
        totalPrice = calculateTotal(cookies.cartItems);
      } else {
        if (cookies.guestCartItems) {
          setItems(cookies.guestCartItems);
          cart.setCart(cookies.guestCartItems);
          totalPrice = calculateTotal(cookies.guestCartItems);
        }
      }
    }

    if (totalPrice > 50000) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(3000);
    }
    setTotalPrice(totalPrice);
  }, [auth.token, cart.cartItems, cookies.cartItems, cookies.guestCartItems]);

  const itemInfo = async (counter: number, optionCounter?: number) => {
    let err = "";
    let stock = 0;

    const item = await API.item.item(counter);
    if (item.statusCode === 2000) {
      //console.log(item.result);
      if (item.result.selectOptions) {
        item.result.selectOptions.options.filter((option) => {
          if (option.optionDetailCounter === optionCounter)
            stock = option.stock;
        });
      } else {
        stock = item.result.item.stock;
      }
    } else err = item.message;

    return { err, stock };
  };

  const changeQty = async (qty: number, counter: number | string) => {
    if (auth.token) {
      const res = await API.cart.changeCart(auth.token, { counter, qty });
      if (res.statusCode === 2000) {
        changeCart(res.result.cartItems);
      } else alert(res.message);
    } else {
      let guestItems: ShopCartType[] = cookies.guestCartItems;
      guestItems = guestItems.map((guestItem) => {
        if (guestItem.counter === counter) {
          return {
            ...guestItem,
            qty,
          };
        } else {
          return guestItem;
        }
      });
      changeCart(guestItems);
    }
  };

  const onQtyChange = async (
    e: ChangeEvent<HTMLInputElement>,
    itemId: number,
    cartId: number | string,
    optionId: number
  ) => {
    const name = e.target.name;
    const value = Number(e.target.value);

    const { err, stock } = await itemInfo(itemId, optionId);
    if (err) {
      alert(err);
      return false;
    }

    if (value > 0) {
      if (value > stock) {
        alert("재고가 부족합니다");
        changeQty(stock, cartId);
      } else {
        changeQty(value, cartId);
      }
    }
  };

  const onMinusClick = async (
    itemId: number,
    cartId: number | string,
    optionId: number
  ) => {
    const { err, stock } = await itemInfo(itemId, optionId);
    if (err) {
      alert(err);
      return false;
    }

    let qty = 0;
    cart.cartItems.filter((cartItem) => {
      if (cartItem.counter === cartId) qty = cartItem.qty;
    });

    const value = qty - 1;
    if (value > 0) {
      if (value > stock) {
        alert("재고가 부족합니다");
        changeQty(stock, cartId);
      } else {
        changeQty(value, cartId);
      }
    }
  };

  const onPlusClick = async (
    itemId: number,
    cartId: number | string,
    optionId: number
  ) => {
    const { err, stock } = await itemInfo(itemId, optionId);
    if (err) {
      alert(err);
      return false;
    }

    let qty = 0;
    cart.cartItems.filter((cartItem) => {
      if (cartItem.counter === cartId) qty = cartItem.qty;
    });

    const value = qty + 1;

    if (value > stock) {
      alert("재고가 부족합니다");
      changeQty(stock, cartId);
    } else {
      changeQty(value, cartId);
    }
  };

  const onDeleteClick = async (id: number | string) => {
    const chkDelete = confirm("선택한 상품을 삭제하시겠습니까?");
    if (chkDelete) {
      if (auth.token) {
        const res = await API.cart.deleteCart(auth.token, { counter: id });
        if (res.statusCode === 2000) {
          alert("선택한 상품 장바구니에서 삭제되었습니다.");
          changeCart(res.result.cartItems);
        } else alert(res.message);
      } else {
        const newGuestCartItems = cookies.guestCartItems.filter(
          (item: ShopCartType) => {
            return item.counter !== id;
          }
        );
        setCookie("guestCartItems", newGuestCartItems, { path: "/" });
        setCookie("cartCount", calculateCount(newGuestCartItems), {
          path: "/",
        });
      }
    }
  };

  const onCartSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const buyItem = items?.map((item) => {
      if (item) {
        return {
          counter: item?.itemCounter,
          name: item?.title,
          thumbnail: item?.thumbnailUrl,
          options: {
            optionCounter: item.selectOption?.optionCounter,
            selectOptions: [
              {
                optionDetailCounter: item.selectOption?.optionDetailCounter,
                name: item.selectOption?.optionDetailTitle,
                qty: item.qty,
                price:
                  item.selectOption.optionCounter === 0
                    ? item.price
                    : item.selectOption?.optionPrice,
              },
            ],
          },
        };
      }
    });

    const buyItemsData = items?.map((item) => {
      if (item) {
        return {
          counter: auth.token ? item?.counter : "",
          itemCounter: item?.itemCounter,
          optionCounter: item.selectOption?.optionCounter,
          optionDetailCounter: item.selectOption?.optionDetailCounter,
          qty: item.qty,
          seller: item.seller ? item.seller : "",
        };
      }
    });

    setCookie("buyItem", buyItem, { path: "/" });
    setCookie("buyItemsData", buyItemsData, { path: "/" });
    setCookie("isCart", true, { path: "/" });
    router.push("/order");
  };
  return (
    <div>
      <form action="" onSubmit={(e) => onCartSubmit(e)}>
        {/* 장바구니 테이블 상단 */}
        <div className="flex border-b border-[#ccc] text-sm pb-4 max-md:hidden">
          <div className="flex-[4] flex">
            <div className="w-[70%]">상품 정보</div>
            <div className="w-[15%] text-center">수량</div>
            <div className="w-[15%] text-center">가격</div>
          </div>
          <div className="flex-[1] text-center">배송비</div>
        </div>
        {/* 장바구니 테이블 리스트 */}
        <div className="flex border-b border-[#ccc] max-md:border-t max-md:flex-wrap">
          <div className="flex-[4] max-md:flex-auto max-md:w-[100%]">
            {items &&
              items.map((item, index) => (
                <div
                  className={`py-5 flex ${
                    index > 0 && "border-t border-[#ccc]"
                  } max-md:py-3 max-md:flex-wrap`}
                  key={index}
                >
                  <div className="flex w-[70%] max-md:w-[100%]">
                    <div className="w-[16%] max-md:w-[70px]">
                      <Link href={`/${item.itemCounter ?? "cart"}`}>
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-[100%] cursor-pointer"
                        />
                      </Link>
                    </div>
                    <div className="pl-[4%] relative flex flex-col justify-center max-md:pl-3 max-md:w-[calc(100%-70px)]">
                      <div className="max-md:text-sm max-md:mb-1">
                        <Link href={`/${item.itemCounter ?? "cart"}`}>
                          {item?.title}
                        </Link>
                      </div>
                      {item.selectOption?.optionTitle && (
                        <div className="text-xs">
                          {`
                      ${item.selectOption?.optionTitle} : 
                      ${item.selectOption?.optionDetailTitle} (+
                      ${(
                        item.selectOption?.optionPrice - item.price
                      ).toLocaleString()}
                      원)`}
                        </div>
                      )}
                      <div className="mt-3 text-sm text-[#999] max-md:hidden">
                        <span
                          className="cursor-pointer"
                          onClick={() => onDeleteClick(item.counter)}
                        >
                          삭제하기
                        </span>
                      </div>
                      <div className="hidden absolute right-3 top-0 text-gray-500 max-md:block">
                        <span
                          className="cursor-pointer"
                          onClick={() => onDeleteClick(item.counter)}
                        >
                          <AiOutlineClose />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-[15%] max-md:w-[100%] max-md:justify-start max-md:pl-[82px] max-md:py-3">
                    <QtyBox
                      qty={item.qty}
                      onQtyChange={(e) =>
                        onQtyChange(
                          e,
                          item.itemCounter,
                          item.counter,
                          item.selectOption.optionDetailCounter
                        )
                      }
                      onMinusClick={() =>
                        onMinusClick(
                          item.itemCounter,
                          item.counter,
                          item.selectOption.optionDetailCounter
                        )
                      }
                      onPlusClick={() =>
                        onPlusClick(
                          item.itemCounter,
                          item.counter,
                          item.selectOption.optionDetailCounter
                        )
                      }
                    />
                  </div>
                  <div className="flex justify-center items-center w-[15%] max-md:w-[100%] max-md:justify-start max-md:pl-[82px] max-md:text-sm">
                    {(itemPrice(item) * item.qty).toLocaleString()}원
                  </div>
                </div>
              ))}
          </div>
          <div className="flex-[1] flex justify-center items-center flex-col max-md:flex-auto max-md:w-[100%] max-md:py-5 max-md:border-t max-md:border-[#ccc]">
            {deliveryFee > 0 ? `${deliveryFee.toLocaleString()}원` : "무료"}
            <span className="block mt-1 text-sm text-[#999]">
              50,000원 이상 구매 시 무료
            </span>
          </div>
        </div>
        {/* 장바구니 합계 */}
        <div className="flex justify-end">
          <div className="w-[50%] max-md:w-[100%]">
            <div className="border-b border-[#ccc] py-5 text-right text-sm text-[#444] max-md:text-xs max-md:py-3">
              <div className="flex mb-5">
                <div className="w-[60%] max-md:text-left">상품 합계</div>
                <div className="w-[40%]">{totalPrice.toLocaleString()}원</div>
              </div>
              <div className="flex">
                <div className="w-[60%] max-md:text-left">배송비</div>
                <div className="w-[40%]">{deliveryFee.toLocaleString()}원</div>
              </div>
            </div>
            <div className="flex text-right py-5 font-bold max-md:text-base">
              <div className="w-[60%] max-md:text-left">합계</div>
              <div className="w-[40%]">
                {(totalPrice + deliveryFee).toLocaleString()}원
              </div>
            </div>
            <div className="text-right mt-10">
              <Button
                text="구매하기"
                type="submit"
                width="w-[160px] max-md:w-[100%]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
