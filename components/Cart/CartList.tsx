import QtyBox from "@components/Main/QtyBox";
import Button from "@components/Member/Button";
import Link from "next/link";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function CartList({ cartItems }: CartItemsProps) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [items, setItems] = useState(cartItems);

  const changeQty = (
    totalPrice: number,
    items: {
      id: number;
      title: string;
      price: number;
      thumbnailUrl: string;
      selectOption: {
        selectOptionTitle: string;
        selectOptionName: string;
        selectOptionAddPrice: number;
      };
      qty: number;
      stock: number;
    }[]
  ) => {
    if (totalPrice > 100000) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(3000);
    }
    setTotalPrice(totalPrice);
    setItems(items);
  };

  useEffect(() => {
    let totalPrice = 0;
    cartItems.map((cartItem) => {
      totalPrice +=
        (cartItem.price + cartItem.selectOption.selectOptionAddPrice) *
        cartItem.qty;
    });
    changeQty(totalPrice, cartItems);
  }, []);

  const onQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = Number(e.target.value);
    const names = name.split("-");
    const id = Number(names[1]);
    let totalPrice = 0;
    if (value > 0) {
      const newItems = items.map((item) => {
        if (item.id === id) {
          if (value > item.stock) {
            alert("재고가 부족합니다");
            totalPrice +=
              (item.price + item.selectOption.selectOptionAddPrice) * item.qty;
          } else {
            totalPrice +=
              (item.price + item.selectOption.selectOptionAddPrice) * value;
          }
          return value <= item.stock ? { ...item, qty: value } : item;
        } else {
          totalPrice +=
            (item.price + item.selectOption.selectOptionAddPrice) * item.qty;
          return item;
        }
      });
      changeQty(totalPrice, newItems);
    }
  };

  const onMinusClick = (id: number) => {
    let totalPrice = 0;
    const newItems = items.map((item) => {
      if (item.id === id) {
        const value = item.qty - 1;
        if (value > 0) {
          totalPrice +=
            (item.price + item.selectOption.selectOptionAddPrice) * value;
        } else {
          totalPrice +=
            (item.price + item.selectOption.selectOptionAddPrice) * item.qty;
        }
        return value > 0 ? { ...item, qty: value } : item;
      } else {
        totalPrice +=
          (item.price + item.selectOption.selectOptionAddPrice) * item.qty;
        return item;
      }
    });
    changeQty(totalPrice, newItems);
  };

  const onPlusClick = (id: number) => {
    let totalPrice = 0;
    const newItems = items.map((item) => {
      if (item.id === id) {
        const value = item.qty + 1;
        if (value <= item.stock) {
          totalPrice +=
            (item.price + item.selectOption.selectOptionAddPrice) * value;
        } else {
          alert("재고가 부족합니다");
          totalPrice +=
            (item.price + item.selectOption.selectOptionAddPrice) * item.qty;
        }
        return value <= item.stock ? { ...item, qty: value } : item;
      } else {
        totalPrice +=
          (item.price + item.selectOption.selectOptionAddPrice) * item.qty;
        return item;
      }
    });
    changeQty(totalPrice, newItems);
  };

  const onDeleteClick = (id: number) => {
    const chkDelete = confirm("선택한 상품을 삭제하시겠습니까?");
    if (chkDelete) {
      let totalPrice = 0;
      const newItems = items.filter((item) => {
        item.id !== id &&
          (totalPrice +=
            (item.price + item.selectOption.selectOptionAddPrice) * item.qty);
        return item.id !== id;
      });
      changeQty(totalPrice, newItems);
    }
  };

  const onCartSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            {items.map((item, index) => (
              <div
                className={`py-5 flex ${
                  index > 0 && "border-t border-[#ccc]"
                } max-md:py-3 max-md:flex-wrap`}
                key={index}
              >
                <div className="flex w-[70%] max-md:w-[100%]">
                  <div className="w-[16%] max-md:w-[70px]">
                    <Link href={`/${item.id}`}>
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-[100%] cursor-pointer"
                      />
                    </Link>
                  </div>
                  <div className="pl-[4%] relative max-md:pl-3 max-md:w-[calc(100%-70px)]">
                    <div className="pt-6 max-md:pt-4 max-md:text-sm max-md:mb-1">
                      <Link href={`/${item.id}`}>{item.title}</Link>
                    </div>
                    {item.selectOption.selectOptionTitle && (
                      <div className="text-xs">
                        {`
                      ${item.selectOption.selectOptionTitle} : 
                      ${item.selectOption.selectOptionName} (+
                      ${item.selectOption.selectOptionAddPrice.toLocaleString()}
                      원)`}
                      </div>
                    )}
                    <div className="mt-3 text-sm text-[#999] max-md:hidden">
                      <span
                        className="cursor-pointer"
                        onClick={() => onDeleteClick(item.id)}
                      >
                        삭제하기
                      </span>
                    </div>
                    <div className="hidden absolute right-3 top-0 text-gray-500 max-md:block">
                      <span
                        className="cursor-pointer"
                        onClick={() => onDeleteClick(item.id)}
                      >
                        <AiOutlineClose />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-[15%] max-md:w-[100%] max-md:justify-start max-md:pl-[82px] max-md:py-3">
                  <QtyBox
                    qty={item.qty}
                    name={`qty-${item.id}`}
                    onQtyChange={(e) => onQtyChange(e)}
                    onMinusClick={() => onMinusClick(item.id)}
                    onPlusClick={() => onPlusClick(item.id)}
                  />
                </div>
                <div className="flex justify-center items-center w-[15%] max-md:w-[100%] max-md:justify-start max-md:pl-[82px] max-md:text-sm">
                  {(
                    (item.price + item.selectOption.selectOptionAddPrice) *
                    item.qty
                  ).toLocaleString()}
                  원
                </div>
              </div>
            ))}
          </div>
          <div className="flex-[1] flex justify-center items-center flex-col max-md:flex-auto max-md:w-[100%] max-md:py-5 max-md:border-t max-md:border-[#ccc]">
            {deliveryFee > 0 ? `${deliveryFee.toLocaleString()}원` : "무료"}
            <span className="block mt-1 text-sm text-[#999]">
              100,000원 이상 구매 시 무료
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
