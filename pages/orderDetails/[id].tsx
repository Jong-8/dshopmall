import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@components/Member/Button";
import Link from "next/link";
import API from "@services/API";
import useOrderDetail from "@hooks/useOrderDetail";
import { AiOutlineClose } from "react-icons/ai";

export default function OrderDetails() {
  const [post, setPost] = useState(false);
  const [orderCancel, setOrderCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const orderDetail = useOrderDetail();

  const onOrderCancelClick = () => {
    setOrderCancel(true);
  };

  const onCancelReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCancelReason(e.target.value);
  };

  const onOrderCancelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!confirm("주문을 취소하시겠습니까?")) return false;

    let res;
    if (orderDetail.auth.token) {
      const datas = {
        merchant_uid: orderDetail.merchantUid,
        reason: cancelReason,
      };
      res = await API.order.orderCancel(
        "member",
        datas,
        orderDetail.auth.token
      );
    } else {
      const datas = {
        merchant_uid: orderDetail.merchantUid,
        guest_name: orderDetail.router.query.name,
        guest_phone: orderDetail.router.query.phone,
        reason: cancelReason,
      };
      res = await API.order.orderCancel("guest", datas, "");
    }
    if (res.statusCode === 2000) {
      alert("주문이 취소되었습니다.");
      orderDetail.router.reload();
    } else alert(res.message);
  };

  const calculateDelivery = (arr: ShopOrderDetailItemType[]) => {
    let deliveryFee = 0;
    arr?.map((orderItem: any) => {
      deliveryFee += orderItem.price * orderItem.qty;
    });

    return deliveryFee > 100000 ? "무료" : "3,000원";
  };

  const onDeliveryInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone1") {
      let num = value.toString();
      if (num.length > 3) return false;
    } else if (name === "phone2" || name === "phone3") {
      let num = value.toString();
      if (num.length > 4) return false;
    }

    orderDetail.deliveryInfo &&
      orderDetail.setDeliveryInfo({
        ...orderDetail.deliveryInfo,
        [name]: value,
      });
  };

  const onPostClick = () => {
    setPost(true);
  };

  const handleComplete = (data: Address) => {
    //console.log(data);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    orderDetail.deliveryInfo &&
      orderDetail.setDeliveryInfo({
        ...orderDetail.deliveryInfo,
        zipcode: data.zonecode,
        address: fullAddress,
      });
    setPost(false);
  };

  const foldDaumPostcode = () => {
    // iframe을 넣은 element를 안보이게 한다.
    setPost(false);
  };

  const onDeliveryInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datas = {
      deliveryInfo: JSON.stringify({
        name: orderDetail.deliveryInfo?.userName,
        zipcode: orderDetail.deliveryInfo?.zipcode,
        address: orderDetail.deliveryInfo?.address,
        detailed: orderDetail.deliveryInfo?.detailed,
        phone: `${orderDetail.deliveryInfo?.phone1}${orderDetail.deliveryInfo?.phone2}${orderDetail.deliveryInfo?.phone3}`,
        requests: orderDetail.deliveryInfo?.requests,
      }),
      merchant_uid: orderDetail.merchantUid,
    };
    const res = await API.order.orderDeliveryChange(
      datas,
      orderDetail.auth.token ?? ""
    );
    if (res.statusCode === 2000) {
      alert("배송지 정보 변경 사항이 저장되었습니다.");
      orderDetail.router.reload();
    } else alert(res.message);
  };

  console.log(orderDetail.orderInfos);

  return (
    <>
      <Header title="주문 상세 정보" description="주문 상세 정보" />
      <ContentLayout>
        <div className="max-w-[960px] m-auto">
          {/* 주문 상세 정보 레이아웃 */}
          <div className="px-4 pt-[60px] pb-[70px] max-md:px-3 max-md:pb-[40px]">
            <div className="text-2xl mb-8 font-semibold max-md:text-lg">
              주문 상세 정보
            </div>
            <div className="mb-[80px]">
              {/* 주문 상세 정보 상단 */}
              <div className="flex border-b border-[#ccc] text-sm pb-4 max-md:hidden">
                <div className="flex-[4] flex">
                  <div className="w-[70%]">상품 정보</div>
                  <div className="w-[15%] text-center">수량</div>
                  <div className="w-[15%] text-center">가격</div>
                </div>
                <div className="flex-[1] text-center">배송비</div>
              </div>
              {/* 주문 상품 리스트 */}
              <div className="flex border-b border-[#ccc] text-sm max-md:border-t max-md:flex-wrap">
                <div className="flex-[4] max-md:flex-auto max-md:w-[100%]">
                  {orderDetail.orderItems?.map((orderItem, index) => (
                    <div
                      className={`py-5 flex ${
                        index > 0 && "border-t border-[#ccc]"
                      } max-md:py-3 max-md:flex-wrap`}
                      key={index}
                    >
                      <div className="flex w-[70%] max-md:w-[100%]">
                        <div className="w-[16%] max-md:w-[70px]">
                          <Link href={`/${orderItem.counter}`}>
                            <img
                              src={orderItem.thumbnailUrl}
                              alt={orderItem.name}
                              className="w-[100%] cursor-pointer"
                            />
                          </Link>
                        </div>
                        <div className="pl-[4%] max-md:pl-3 max-md:w-[calc(100%-70px)]">
                          <div className="pt-6 max-md:pt-4 max-md:text-sm max-md:mb-1">
                            <Link href={`/${orderItem.counter}`}>
                              {orderItem.name}
                            </Link>
                          </div>
                          {orderItem.option && (
                            <div className="text-xs">
                              {` 
                              ${orderItem.option}`}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[15%] max-md:w-[100%] max-md:justify-start max-md:pl-[82px] max-md:py-3">
                        {orderItem.qty}
                      </div>
                      <div className="flex justify-center items-center w-[15%] max-md:w-[100%] max-md:justify-start max-md:pl-[82px] max-md:text-sm">
                        {(orderItem.price * orderItem.qty).toLocaleString()}원
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-[1] flex justify-center items-center flex-col max-md:flex-auto max-md:w-[100%] max-md:py-5 max-md:border-t max-md:border-[#ccc]">
                  {orderDetail.orderItems &&
                    calculateDelivery(orderDetail.orderItems)}
                </div>
              </div>
            </div>
            {/* 주문 상세 정보 하단 */}
            <div className="flex justify-between flex-wrap">
              {/* 주문 상세 정보 하단 왼쪽 컨텐츠 */}
              <div className="w-[45%] max-md:w-[100%]">
                <div className="mb-[70px]">
                  <div className="odd_title">주문 정보</div>
                  <div className="text-sm">
                    <div
                      className={`flex border-b border-[#dfdfdf] pb-4 max-md:pb-2 max-md:text-xs`}
                    >
                      <div className="detail_left leading-[45px] max-md:leading-[40px]">
                        주문번호
                      </div>
                      <div
                        className={`detail_right leading-[45px]  max-md:leading-[40px]`}
                      >
                        {orderDetail.orderInfos?.merchant_uid}
                      </div>
                    </div>
                    <div
                      className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                    >
                      <div className="detail_left leading-[45px] max-md:leading-[40px]">
                        주문 일자
                      </div>
                      <div
                        className={`detail_right leading-[45px] max-md:leading-[40px]`}
                      >
                        {orderDetail.orderInfos &&
                          new Date(
                            orderDetail.orderInfos?.date
                          ).toLocaleDateString()}
                      </div>
                    </div>
                    <div
                      className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                    >
                      <div className="detail_left leading-[45px] max-md:leading-[40px]">
                        주문 상태
                      </div>
                      <div
                        className={`detail_right leading-[45px] ${
                          orderDetail.orderInfos?.state === "입금 대기" &&
                          "flex justify-between items-center"
                        } 
                        ${
                          orderDetail.orderInfos?.state === "결제 취소" &&
                          "text-red-500"
                        }                
                        max-md:leading-[40px]`}
                      >
                        {orderDetail.orderInfos?.state === "결제 취소"
                          ? `${orderDetail.orderInfos?.state} (취소 사유 : ${orderDetail.orderInfos?.cancelReason})`
                          : orderDetail.orderInfos?.state}{" "}
                        {orderDetail.orderInfos?.state === "입금 대기" && (
                          <>
                            <div
                              className="w-[100px] h-[45px] ml-3 text-center leading-[45px] text-[#6846b7] border border-[#6846b7] rounded-[23px] cursor-pointer md:hover:bg-[#6846b7] md:hover:text-white ease-in-out duration-300 max-md:h-[40px] max-md:leading-[40px] max-md:text-xs"
                              onClick={onOrderCancelClick}
                            >
                              취소 요청
                            </div>
                            {orderCancel && (
                              <div className="border border-[#666] w-[420px] my-[10px] p-4 bg-white fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-md:w-[calc(100%-1.5rem)] max-md:p-3">
                                <div className="text-base mb-4 flex justify-between items-center max-md:mb-2">
                                  <div className="max-md:text-sm">
                                    취소사유 입력
                                  </div>
                                  <div
                                    onClick={() => setOrderCancel(false)}
                                    className="cursor-pointer text-xl max-md:text-lg"
                                  >
                                    <AiOutlineClose />
                                  </div>
                                </div>
                                <form action="" onSubmit={onOrderCancelSubmit}>
                                  <div className="flex justify-between">
                                    <input
                                      type="text"
                                      name="cancelReason"
                                      value={cancelReason}
                                      onChange={onCancelReasonChange}
                                      className="border border-[#d8d8d8] rounded-[3px] w-[68%] p-[10px] h-[42px]"
                                    />
                                    <button className="w-[30%] h-[42px] leading-[40px] border border-[#6846b7] text-[#6846b7] rounded-[3px]">
                                      취소하기
                                    </button>
                                  </div>
                                </form>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {orderDetail.orderInfos?.state !== "입금 대기" &&
                      orderDetail.orderInfos?.state !== "결제 취소" && (
                        <div
                          className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                        >
                          <div className="detail_left leading-[45px] max-md:leading-[40px]">
                            배송 정보
                          </div>
                          <div
                            className={`detail_right leading-[45px] max-md:leading-[40px]`}
                          >
                            {orderDetail.orderInfos?.deliveryState}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <div className="max-md:mb-10">
                  <div className="odd_title">배송지 정보</div>
                  <div className="text-sm">
                    <form action="" onSubmit={onDeliveryInfoSubmit}>
                      <div className="odd_input_box">
                        <div className="odd_label">이름</div>
                        <div>
                          <input
                            type="text"
                            className="odd_input"
                            name="userName"
                            value={orderDetail.deliveryInfo?.userName}
                            onChange={onDeliveryInfoChange}
                          />
                        </div>
                      </div>
                      <div className="odd_input_box">
                        <div className="odd_label">우편번호</div>
                        <div className="flex justify-between">
                          <input
                            type="text"
                            className="odd_input read-only:bg-[#f9f9f9]"
                            value={orderDetail.deliveryInfo?.zipcode}
                            readOnly
                          />
                          <div
                            className="w-[140px] h-[45px] ml-3 text-center leading-[45px] text-[#6846b7] border border-[#6846b7] rounded-[23px] cursor-pointer md:hover:bg-[#6846b7] md:hover:text-white ease-in-out duration-300 max-md:h-[40px] max-md:leading-[40px] max-md:text-xs"
                            onClick={onPostClick}
                          >
                            검색하기
                          </div>
                        </div>
                        {post && (
                          <div
                            id="wrap"
                            className="border border-[#333] w-[420px] h-[402px] my-[10px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-md:w-[calc(100%-1.5rem)]"
                          >
                            <img
                              src="//t1.daumcdn.net/postcode/resource/images/close.png"
                              className="cursor-pointer absolute right-0 top-[-1px] z-10"
                              onClick={foldDaumPostcode}
                              alt="접기 버튼"
                            />
                            <DaumPostcodeEmbed onComplete={handleComplete} />
                          </div>
                        )}
                      </div>
                      <div className="odd_input_box">
                        <div className="odd_label">주소</div>
                        <div className="mb-3 max-md:mb-2">
                          <input
                            type="text"
                            className="odd_input read-only:bg-[#f9f9f9]"
                            value={orderDetail.deliveryInfo?.address}
                            readOnly
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="odd_input"
                            name="detailed"
                            value={orderDetail.deliveryInfo?.detailed}
                            onChange={onDeliveryInfoChange}
                          />
                        </div>
                      </div>
                      <div className="odd_input_box">
                        <div className="odd_label">휴대폰 번호</div>
                        <div className="flex justify-between items-center">
                          <input
                            type="number"
                            className="odd_input"
                            name="phone1"
                            value={orderDetail.deliveryInfo?.phone1}
                            onChange={onDeliveryInfoChange}
                            minLength={3}
                            maxLength={3}
                          />
                          <div className="px-3">-</div>
                          <input
                            type="number"
                            className="odd_input"
                            name="phone2"
                            value={orderDetail.deliveryInfo?.phone2}
                            onChange={onDeliveryInfoChange}
                            minLength={3}
                            maxLength={4}
                          />
                          <div className="px-3">-</div>
                          <input
                            type="number"
                            className="odd_input"
                            name="phone3"
                            value={orderDetail.deliveryInfo?.phone3}
                            onChange={onDeliveryInfoChange}
                            minLength={4}
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div className="odd_input_box">
                        <div className="odd_label">배송 시 요청 사항</div>
                        <div>
                          <input
                            type="text"
                            className="odd_input"
                            name="requests"
                            value={orderDetail.deliveryInfo?.requests}
                            onChange={onDeliveryInfoChange}
                          />
                        </div>
                      </div>
                      <div className="text-center mt-10">
                        <Button text="변경 사항 저장하기" type="submit" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* 주문 상세 정보 하단 오른쪽 컨텐츠 */}
              <div className="w-[45%] max-md:w-[100%]">
                <div>
                  <div className="odd_title">결제 정보</div>
                  <div className="text-sm">
                    <div
                      className={`flex border-b border-[#dfdfdf] pb-4 max-md:pb-2 max-md:text-xs`}
                    >
                      <div className="detail_left leading-[45px] max-md:leading-[40px]">
                        상품 합계
                      </div>
                      <div
                        className={`detail_right leading-[45px] max-md:leading-[40px]`}
                      >
                        {orderDetail.paymentInfos?.price.toLocaleString()}원
                      </div>
                    </div>
                    {orderDetail.paymentInfos &&
                      orderDetail.paymentInfos?.point > 0 && (
                        <div
                          className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                        >
                          <div className="detail_left leading-[45px] max-md:leading-[40px]">
                            사용 DR포인트
                          </div>
                          <div
                            className={`detail_right leading-[45px] max-md:leading-[40px]`}
                          >
                            {orderDetail.paymentInfos?.point.toLocaleString()}{" "}
                            DR
                          </div>
                        </div>
                      )}
                    <div
                      className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                    >
                      <div className="detail_left leading-[45px] max-md:leading-[40px]">
                        배송비
                      </div>
                      <div
                        className={`detail_right leading-[45px] max-md:leading-[40px]`}
                      >
                        {orderDetail.paymentInfos?.deliveryCost &&
                        orderDetail.paymentInfos?.deliveryCost > 0
                          ? orderDetail.paymentInfos?.deliveryCost.toLocaleString() +
                            "원"
                          : "무료"}
                      </div>
                    </div>
                    <div
                      className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                    >
                      <div className="detail_left leading-[45px] max-md:leading-[40px]">
                        결제 금액
                      </div>
                      <div
                        className={`detail_right leading-[45px] max-md:leading-[40px]`}
                      >
                        {`${orderDetail.paymentInfos?.paymentPrice.toLocaleString()}원`}
                      </div>
                    </div>
                    <div
                      className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                    >
                      <div className="detail_left leading-[45px] max-md:leading-[40px]">
                        결제 방법
                      </div>
                      <div
                        className={`detail_right leading-[45px] max-md:leading-[40px]`}
                      >
                        {orderDetail.paymentInfos?.payment}
                      </div>
                    </div>
                    {orderDetail.paymentInfos?.payment === "무통장입금" && (
                      <>
                        <div
                          className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                        >
                          <div className="detail_left leading-[45px] max-md:leading-[40px]">
                            입금 계좌
                          </div>
                          <div
                            className={`detail_right leading-[24px] max-md:leading-[20px]`}
                          >
                            {`${orderDetail.bank.bankName}(${orderDetail.bank.bankNumber})`}{" "}
                            <br />
                            {`예금주 : ${orderDetail.bank.bankHolder}`}
                          </div>
                        </div>
                        <div
                          className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                        >
                          <div className="detail_left leading-[45px] max-md:leading-[40px]">
                            입금 기한
                          </div>
                          <div
                            className={`detail_right leading-[45px] max-md:leading-[40px]`}
                          >
                            {`${
                              orderDetail.orderInfos &&
                              new Date(
                                orderDetail.orderInfos?.date + 24 * 3600000
                              ).toLocaleDateString()
                            } 23:59:59`}
                          </div>
                        </div>
                        <div
                          className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                        >
                          <div className="detail_left leading-[45px] max-md:leading-[40px]">
                            입금자
                          </div>
                          <div
                            className={`detail_right leading-[45px] max-md:leading-[40px]`}
                          >
                            {orderDetail.paymentInfos?.companyBankDeposit}
                          </div>
                        </div>
                        <div
                          className={`flex border-b border-[#dfdfdf] py-4 max-md:py-2 max-md:text-xs`}
                        >
                          <div className="detail_left leading-[45px] max-md:leading-[40px]">
                            환불 계좌
                          </div>
                          <div
                            className={`detail_right leading-[45px] max-md:leading-[40px]`}
                          >
                            {`${orderDetail.paymentInfos?.refund_bank}(${orderDetail.paymentInfos?.refund_account}) ${orderDetail.paymentInfos?.refund_holder}`}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
      <Footer />
      <style jsx>{`
        .odd_title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 40px;
        }
        .odd_input_box {
          margin-bottom: 16px;
        }
        .odd_label {
          margin-bottom: 5px;
        }
        .odd_input {
          border: 1px solid #d8d8d8;
          border-radius: 3px;
          padding: 10px;
          width: 100%;
          height: 45px;
        }
        .detail_left {
          width: 40%;
        }
        .detail_right {
          width: 60%;
        }
        @media not all and (min-width: 768px) {
          .odd_title {
            font-size: 18px;
            margin-bottom: 30px;
          }
          .odd_input_box {
            margin-bottom: 12px;
          }
          .odd_label {
            font-size: 12px;
          }
          .odd_input {
            height: 40px;
          }
          .detail_left {
            width: 30%;
          }
          .detail_right {
            width: 70%;
          }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
