import QtyBox from "@components/Main/QtyBox";
import Button from "@components/Member/Button";
import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";

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

  const onQtyChange = (e: {
    target: {
      name: string;
      value: string;
    };
  }) => {
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
        <div className="flex border-b border-[#ccc] text-sm pb-4">
          <div className="flex-[4] flex">
            <div className="w-[70%]">상품 정보</div>
            <div className="w-[15%] text-center">수량</div>
            <div className="w-[15%] text-center">가격</div>
          </div>
          <div className="flex-[1] text-center">배송비</div>
        </div>
        {/* 장바구니 테이블 리스트 */}
        <div className="flex border-b border-[#ccc]">
          <div className="flex-[4]">
            {items.map((item, index) => (
              <div
                className={`py-5 flex ${index > 0 && "border-t border-[#ccc]"}`}
                key={index}
              >
                <div className="flex items-center w-[70%]">
                  <div className="w-[16%]">
                    <Link href={`/${item.id}`}>
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-[100%] cursor-pointer"
                      />
                    </Link>
                  </div>
                  <div className="pl-[4%]">
                    <div>
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
                    <div className="mt-3 text-sm text-[#999]">
                      <span
                        className="cursor-pointer"
                        onClick={() => onDeleteClick(item.id)}
                      >
                        삭제하기
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-[15%]">
                  <QtyBox
                    qty={item.qty}
                    name={`qty-${item.id}`}
                    onQtyChange={(e) => onQtyChange(e)}
                    onMinusClick={() => onMinusClick(item.id)}
                    onPlusClick={() => onPlusClick(item.id)}
                  />
                </div>
                <div className="flex justify-center items-center w-[15%]">
                  {(
                    (item.price + item.selectOption.selectOptionAddPrice) *
                    item.qty
                  ).toLocaleString()}
                  원
                </div>
              </div>
            ))}
          </div>
          <div className="flex-[1] flex justify-center items-center flex-col">
            {deliveryFee > 0 ? `${deliveryFee.toLocaleString()}원` : "무료"}
            <span className="block mt-1 text-sm text-[#999]">
              100,000원 이상 구매 시 무료
            </span>
          </div>
        </div>
        {/* 장바구니 합계 */}
        <div className="flex justify-end">
          <div className="w-[50%]">
            <div className="border-b border-[#ccc] py-5 text-right text-sm text-[#444]">
              <div className="flex mb-5">
                <div className="w-[60%]">상품 합계</div>
                <div className="w-[40%]">{totalPrice.toLocaleString()}원</div>
              </div>
              <div className="flex">
                <div className="w-[60%]">배송비</div>
                <div className="w-[40%]">{deliveryFee.toLocaleString()}원</div>
              </div>
            </div>
            <div className="flex text-right py-5 font-bold">
              <div className="w-[60%]">합계</div>
              <div className="w-[40%]">
                {(totalPrice + deliveryFee).toLocaleString()}원
              </div>
            </div>
            <div className="text-right mt-10">
              <Button text="구매하기" type="submit" width="w-[160px]" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
