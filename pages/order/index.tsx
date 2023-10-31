import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { useState, ChangeEvent, FormEvent } from "react";
import Payment from "@components/Order/Payment";
import AddrRadio from "@components/Order/AddrRadio";
import useOrder from "@hooks/useOrder";
import API from "@services/API";
import { useCookies } from "react-cookie";

let IMP: any;
if (typeof window !== "undefined") {
  IMP = window.IMP; // 생략 가능
  IMP.init("imp15801485"); // 예: imp00000000
}

type optionProps = {
  optionDetailCounter: number;
  name: string | "";
  qty: number | 1;
  price: number | 0;
  stock: number | 0;
};

type optionsProps = {
  optionCounter: number;
  selectOptions: optionProps[];
};

type buyItemProps = {
  counter: number;
  name: string;
  thumbnail: string;
  options: optionsProps;
};

const bankList = [
  "선택하세요",
  "NH농협은행",
  "KB국민은행",
  "우리은행",
  "신한은행",
  "IBK기업은행",
  "하나은행",
  "경남은행",
  "대구은행",
  "부산은행",
  "Sh수협은행",
  "우체국예금보험",
  "KDB산업은행",
  "SC제일은행",
  "씨티은행",
  "DGB대구은행",
  "광주은행",
  "제주은행",
  "전북은행",
  "새마을금고",
  "신협",
  "케이뱅크",
  "카카오뱅크",
];

export default function Order() {
  const [post, setPost] = useState(false);
  const [deposit, setDeposit] = useState({
    depositor: "",
    refundBank: "",
    refundAccountHolder: "",
    refundAccount: "",
  });
  const order = useOrder();
  const [cookies, setCookie, removeCookie] = useCookies([
    "isCart",
    "cartItems",
    "guestCartItems",
    "cartCount",
    "buyerInfo",
  ]);
  const { userName, userPhone1, userPhone2, userPhone3, userEmail } =
    order.userInfo;
  const {
    addrName,
    zipcode,
    address,
    detailed,
    addrPhone1,
    addrPhone2,
    addrPhone3,
    requests,
    setBasic,
  } = order.addressInfo;
  const { depositor, refundBank, refundAccountHolder, refundAccount } = deposit;

  const onUserInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "userPhone1") {
      if (value.length > 3) return false;
    } else if (name === "userPhone2" || name === "userPhone3") {
      if (value.length > 4) return false;
    }

    order.setUserInfo({
      ...order.userInfo,
      [name]: value,
    });
  };

  const onAddrChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: string | number | boolean;

    if (name === "addrPhone1") {
      if (value.length > 3) return false;
    } else if (name === "addrPhone2" || name === "addrPhone3") {
      if (value.length > 4) return false;
    }

    if (e.target.type === "checkbox") {
      newValue = e.target.checked;
    } else {
      newValue = value;
    }

    order.setAddressInfo({
      ...order.addressInfo,
      [name]: newValue,
    });
  };

  const onDeliverySetChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "basicAddr") {
      order.setAddressInfo({
        ...order.addressInfo,
        addrName: order.auth.user.deliveryInfo.name,
        zipcode: order.auth.user.deliveryInfo.zipcode,
        address: order.auth.user.deliveryInfo.address,
        detailed: order.auth.user.deliveryInfo.detailed,
        addrPhone1: order.phoneForm(order.auth.user.deliveryInfo.phone, 1),
        addrPhone2: order.phoneForm(order.auth.user.deliveryInfo.phone, 2),
        addrPhone3: order.phoneForm(order.auth.user.deliveryInfo.phone, 3),
      });
    } else {
      order.setAddressInfo({
        ...order.addressInfo,
        addrName: "",
        zipcode: "",
        address: "",
        detailed: "",
        addrPhone1: "",
        addrPhone2: "",
        addrPhone3: "",
      });
    }
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
    order.setAddressInfo({
      ...order.addressInfo,
      zipcode: data.zonecode,
      address: fullAddress,
    });
    setPost(false);
  };

  const foldDaumPostcode = () => {
    // iframe을 넣은 element를 안보이게 한다.
    setPost(false);
  };

  const onPointChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const usePoint = Number(value);

    if (order.myPoint && usePoint > order.myPoint) {
      alert(
        `사용 가능하신 DR포인트는 ${order.myPoint.toLocaleString()}DR 입니다.`
      );
      return false;
    }

    if (usePoint >= order.totalItemsPrice) {
      alert("상품 합계 금액보다 많은 DR포인트를 사용하실 수 없습니다.");
      return false;
    }

    order.setPoint(usePoint);
    order.setTotalPrice(order.totalItemsPrice + order.deliveryCost - usePoint);
  };

  const onBankbookChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setDeposit({
      ...deposit,
      [name]: value,
    });
  };

  const onUseTotalPointClick = () => {
    if (order.myPoint && order.myPoint >= order.totalItemsPrice) {
      alert("상품 합계 금액보다 많은 DR포인트를 사용하실 수 없습니다.");
      return false;
    }

    order.setPoint(order.myPoint);
    order.myPoint && order.setTotalPrice(order.totalItemsPrice - order.myPoint);
  };

  const onPaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    order.setPayment(e.target.value);
  };

  const handlePay = async (prepareDatas: ShopPayPrepareResponse) => {
    order.buyItems &&
      IMP.request_pay(
        {
          pg: "html5_inicis.MOI4305641", //테스트인경우 kcp.T0000
          pay_method: "card",
          merchant_uid: prepareDatas.merchant_uid, //상점에서 생성한 고유 주문번호
          name: prepareDatas.name, // 제품명
          amount: prepareDatas.amount, //결제 금액
          company: "디샵몰", //해당 파라미터 설정시 통합결제창에 해당 상호명이 노출됩니다.
          buyer_email: prepareDatas.buyer_email ?? "", // 주문자 이메일
          buyer_name: prepareDatas.buyer_name, // 주문자명
          buyer_tel: prepareDatas.buyer_tel, // 주문자 연락처
          buyer_addr: prepareDatas.buyer_addr, // 주문자 주소
          buyer_postcode: prepareDatas.buyer_postcode, // 주문자 우편번호
          language: "ko", // en 설정시 영문으로 출력되면 해당 파라미터 생략시 한국어 default
          m_redirect_url: `http://dshopmall.co.kr/order`,
          auth_mode: "key-in", // 키인결제(일회성 결제)이용시 설정
        },
        (rsp?: any) => {
          // callback
          if (rsp.success) {
            // 결제 성공 시 로직
            order.payComplete(
              {
                imp_uid: rsp.imp_uid,
                merchant_uid: prepareDatas.merchant_uid,
              },
              {
                name: `${userName}`,
                phone: `${userPhone1}${userPhone2}${userPhone3}`,
              }
            );

            // 회원, 게스트 url 설정
            order.gotoUrl(
              order.auth.token,
              prepareDatas.merchant_uid,
              userName,
              `${userPhone1}${userPhone2}${userPhone3}`
            );
          } else {
            // 결제 실패 시 로직
            if (rsp.error_code)
              alert(
                `결제가 실패하였습니다.\n에러 내용 : ${rsp.error_msg}.\n관리자에게 문의해주시기 바랍니다.`
              );
          }
        }
      );
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datas = {
      items: JSON.stringify(order.buyItemsData) ?? [],
      guest_name: userName,
      guest_phone: `${userPhone1}${userPhone2}${userPhone3}`,
      deliveryInfo: JSON.stringify({
        name: addrName,
        zipcode: zipcode,
        address: address,
        detailed: detailed,
        phone: `${addrPhone1}${addrPhone2}${addrPhone3}`,
        requests: requests,
      }),
      point: order.point ?? 0,
      refund_holder: refundAccountHolder ?? "",
      refund_bank: refundBank ?? "",
      refund_account: refundAccount ?? "",
      refund_tel: "",
      companyBank: order.payment === "withoutBankbook",
      companyBankDeposit: depositor ?? "",
    };

    setCookie("buyerInfo", datas, { path: "/" });

    if (!userName) {
      alert("주문자 이름을 입력해주시기 바랍니다.");
      return false;
    }

    if (!userPhone1 || !userPhone2 || !userPhone3) {
      alert("주문자 연락처를 입력해주시기 바랍니다.");
      return false;
    }

    if (!addrName) {
      alert("배송 받는 사람의 이름을 입력해주시기 바랍니다.");
      return false;
    }

    if (!addrPhone1 || !addrPhone2 || !addrPhone3) {
      alert("배송 받는 사람의 연락처를 입력해주시기 바랍니다.");
      return false;
    }

    const res = await API.order.payPrepare(order.auth.token, datas);
    if (res.statusCode === 2000) {
      if (order.payment !== "withoutBankbook") {
        handlePay(res.result);
      } else {
        order.payComplete(
          {
            imp_uid: "imp15801485",
            merchant_uid: res.result.merchant_uid,
          },
          {
            name: userName,
            phone: `${userPhone1}${userPhone2}${userPhone3}`,
          }
        );

        // 회원, 게스트 url 설정
        order.gotoUrl(
          order.auth.token,
          res.result.merchant_uid,
          userName,
          `${userPhone1}${userPhone2}${userPhone3}`
        );
      }
    } else alert(res.statusCode + " " + res.message);
  };
  return (
    <>
      <Header title="주문하기" description="주문하기" />
      <ContentLayout>
        <div className="max-w-[660px] m-auto pt-[60px] pb-[70px] max-md:pt-10 max-md:pb-0">
          <form action="" onSubmit={onSubmit}>
            {/* 주문 상품 */}
            <div className="od_box">
              <div className="od_title">주문 상품</div>
              <div>
                {order.buyItems?.map((buyItem: buyItemProps, index: number) => (
                  <div key={index}>
                    {buyItem.options.selectOptions?.map(
                      (option: optionProps, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between pb-5 max-md:pb-3">
                            <div className="w-[160px] rounded-lg overflow-hidden max-md:w-[80px]">
                              <a href={`/${buyItem.counter}`} target="_blank">
                                <img
                                  src={buyItem.thumbnail}
                                  alt=""
                                  className="w-[100%]"
                                />
                              </a>
                            </div>
                            <div className="w-[450px] flex flex-col justify-between py-5 max-md:w-[calc(100%-80px)]">
                              <div>
                                <div className="font-bold mb-1 max-md:text-sm">
                                  <a
                                    href={`/${buyItem.counter}`}
                                    target="_blank"
                                  >
                                    {buyItem.name}
                                  </a>
                                </div>
                                <div className="text-sm text-[#888] max-md:text-xs">
                                  <div>
                                    {option.optionDetailCounter === 0
                                      ? "옵션 없음"
                                      : option?.name}
                                  </div>
                                </div>
                              </div>
                              <div className="max-md:text-sm">
                                {option?.qty}개 /{" "}
                                {(option?.price * option?.qty).toLocaleString()}
                                원
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
                <div className="pt-[30px] flex justify-between items-center border-t border-[#e0e0e0] mt-5 max-md:text-sm max-md:pt-6 max-md:mt-0">
                  <div className="font-bold">상품합계</div>
                  <div className="font-bold text-2xl text-[#7c34d2] max-md:text-lg max-md:font-jamsilRegular">
                    {order.totalItemsPrice.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
            {/* 주문자 */}
            <div className="od_box">
              <div className="od_title">주문자</div>
              <div>
                <div className="od_input_box">
                  <div className="od_label">이름</div>
                  <div>
                    <input
                      type="text"
                      className="od_input"
                      name="userName"
                      value={userName}
                      onChange={onUserInfoChange}
                    />
                  </div>
                </div>
                <div className="od_input_box">
                  <div className="od_label">연락처</div>
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      className="od_input"
                      minLength={3}
                      maxLength={3}
                      name="userPhone1"
                      value={userPhone1}
                      onChange={onUserInfoChange}
                    />
                    <div className="px-3">-</div>
                    <input
                      type="text"
                      className="od_input"
                      minLength={3}
                      maxLength={4}
                      name="userPhone2"
                      value={userPhone2}
                      onChange={onUserInfoChange}
                    />
                    <div className="px-3">-</div>
                    <input
                      type="text"
                      className="od_input"
                      minLength={4}
                      maxLength={4}
                      name="userPhone3"
                      value={userPhone3}
                      onChange={onUserInfoChange}
                    />
                  </div>
                </div>
                <div className="od_input_box">
                  <div className="od_label">이메일</div>
                  <div>
                    <input
                      type="text"
                      className="od_input"
                      name="userEmail"
                      value={userEmail}
                      onChange={onUserInfoChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 배송지 */}
            <div className="od_box">
              <div className="od_title">배송지</div>
              <div>
                <div className="flex mb-5 max-md:mb-3">
                  <AddrRadio
                    id="basicAddr"
                    label="기본 배송지"
                    defaultChecked={true}
                    onChange={onDeliverySetChange}
                  />
                  <AddrRadio
                    id="newAddr"
                    label="신규 입력"
                    defaultChecked={false}
                    onChange={onDeliverySetChange}
                  />
                </div>
                <div className="border-b border-[#e0e0e0] pb-8 max-md:pb-6">
                  <div className="od_input_box">
                    <div className="od_label">이름</div>
                    <div>
                      <input
                        type="text"
                        className="od_input"
                        name="addrName"
                        value={addrName}
                        onChange={onAddrChange}
                      />
                    </div>
                  </div>
                  <div className="od_input_box">
                    <div className="od_label">우편번호</div>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        className="od_input read-only:bg-[#f9f9f9]"
                        name="zipcode"
                        value={zipcode}
                        onChange={onAddrChange}
                        readOnly
                      />
                      <div
                        className="w-[100px] h-[56px] ml-3 text-center leading-[56px] text-[#7a1cea] border border-[#7a1cea] rounded-[3px] cursor-pointer max-md:h-[40px] max-md:leading-[40px] max-md:text-xs"
                        onClick={onPostClick}
                      >
                        검색하기
                      </div>
                    </div>
                    {post && (
                      <div
                        id="wrap"
                        className="border w-[100%] h-[400px] my-[10px] relative"
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
                  <div className="od_input_box">
                    <div className="od_label">주소</div>
                    <div className="mb-3 max-md:mb-2">
                      <input
                        type="text"
                        className="od_input read-only:bg-[#f9f9f9]"
                        name="address"
                        value={address}
                        onChange={onAddrChange}
                        readOnly
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="od_input"
                        name="detailed"
                        value={detailed}
                        onChange={onAddrChange}
                      />
                    </div>
                  </div>
                  <div className="od_input_box">
                    <div className="od_label">연락처</div>
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        className="od_input"
                        minLength={3}
                        maxLength={3}
                        name="addrPhone1"
                        value={addrPhone1}
                        onChange={onAddrChange}
                      />
                      <div className="px-3">-</div>
                      <input
                        type="text"
                        className="od_input"
                        minLength={3}
                        maxLength={4}
                        name="addrPhone2"
                        value={addrPhone2}
                        onChange={onAddrChange}
                      />
                      <div className="px-3">-</div>
                      <input
                        type="text"
                        className="od_input"
                        minLength={4}
                        maxLength={4}
                        name="addrPhone3"
                        value={addrPhone3}
                        onChange={onAddrChange}
                      />
                    </div>
                  </div>
                  <div className="flex items-center max-md:text-xs">
                    <input
                      type="checkbox"
                      id="setBasic"
                      name="setBasic"
                      className="mr-1 w-[15px] h-[15px] accent-[#7a1cea] max-md:w-[12px] max-md:h-[12px]"
                      value="1"
                      onChange={onAddrChange}
                    />{" "}
                    <label htmlFor="setBasic">기본 배송지로 설정하기</label>
                  </div>
                </div>
                <div className="pt-8 max-md:pt-6">
                  <div className="od_input_box">
                    <div className="od_label">배송 시 요청 사항</div>
                    <div>
                      <input
                        type="text"
                        className="od_input"
                        name="requests"
                        value={requests}
                        onChange={onAddrChange}
                      />
                    </div>
                  </div>
                  <div className="mt-6 max-md:mt-4 max-md:text-xs">
                    제주 및 도서 산간 지역의 배송은 추가 배송비가 발생할 수
                    있습니다.
                  </div>
                </div>
              </div>
            </div>
            {/* 결제 정보 */}
            <div className="od_box">
              <div className="od_title">결제 정보</div>
              <div>
                <div className="border-b border-[#e0e0e0]">
                  <div className="od_input_box">
                    <div className="od_label">
                      DR포인트 (보유 포인트 {order.myPoint?.toLocaleString()}원)
                    </div>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        className="od_input"
                        value={order.point === 0 ? "" : order.point}
                        name="point"
                        onChange={onPointChange}
                        placeholder="0"
                      />
                      <div
                        className="w-[100px] h-[56px] ml-3 text-center leading-[56px] text-[#7a1cea] border border-[#7a1cea] rounded-[3px] cursor-pointer max-md:h-[40px] max-md:leading-[40px] max-md:text-xs"
                        onClick={onUseTotalPointClick}
                      >
                        전액 사용
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-5 border-b border-[#e0e0e0] max-md:py-3 max-md:text-sm">
                  <div className="flex justify-between py-4 max-md:py-2">
                    <div>상품 합계</div>
                    <div>{order.totalItemsPrice.toLocaleString()} 원</div>
                  </div>
                  <div className="flex justify-between py-4 max-md:py-2">
                    <div>배송비</div>
                    <div>
                      {order.totalItemsPrice >= 100000 ? 0 : "3,000"} 원
                    </div>
                  </div>
                  <div className="flex justify-between py-4 max-md:py-2">
                    <div>총 할인 DR</div>
                    <div>
                      {order.point ? order.point.toLocaleString() : 0} DR
                    </div>
                  </div>
                </div>
                <div>
                  <div className="pt-[30px] flex justify-between items-center max-md:text-sm max-md:pt-6">
                    <div className="font-bold">상품합계</div>
                    <div className="font-bold text-2xl text-[#7c34d2] max-md:text-lg max-md:font-jamsilRegular">
                      {order.totalPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 결제 방법 */}
            <div className="od_box">
              <div className="od_title">결제 방법</div>
              <div className="grid grid-cols-2 gap-3 max-md:gap-2">
                <Payment
                  id="creditCard"
                  label="신용/체크카드"
                  defaultChecked={true}
                  onChange={onPaymentChange}
                />
                {/* <Payment
                  id="accountTransfer"
                  label="계좌이체"
                  defaultChecked={false}
                  onChange={onPaymentChange}
                />
                <Payment
                  id="virtualAccount"
                  label="가상계좌"
                  defaultChecked={false}
                  onChange={onPaymentChange}
                /> */}
                <Payment
                  id="withoutBankbook"
                  label="무통장 입금"
                  defaultChecked={false}
                  onChange={onPaymentChange}
                />
              </div>
              {order.payment === "withoutBankbook" && (
                <div className="pt-6">
                  <div className="od_input_box">
                    <div className="od_label">입금자</div>
                    <div>
                      <input
                        type="text"
                        className="od_input"
                        name="depositor"
                        value={depositor}
                        onChange={onBankbookChange}
                      />
                    </div>
                  </div>
                  <div className="od_input_box">
                    <div className="od_label">입금계좌</div>
                    <div>
                      <textarea
                        name="depositAccount"
                        value={`${order.bank.bankName}(${order.bank.bankNumber}) 예금주 : ${order.bank.bankHolder}`}
                        className="od_input resize-none leading-[34px] max-md:!h-[70px] max-md:leading-[24px]"
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                  <div className="od_input_box">
                    <div className="od_label">환불 계좌</div>
                    <div className="flex justify-between mb-3 gap-3 max-md:mb-2 max-md:gap-2">
                      <select
                        name="refundBank"
                        value={refundBank}
                        className="od_input"
                        onChange={onBankbookChange}
                      >
                        {bankList.map((bank, index) => (
                          <option key={index} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="od_input"
                        name="refundAccountHolder"
                        value={refundAccountHolder}
                        onChange={onBankbookChange}
                        placeholder="예금주"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="od_input"
                        name="refundAccount"
                        value={refundAccount}
                        onChange={onBankbookChange}
                        placeholder="계좌 번호"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`${
                order.btn ? "sticky" : "fixed"
              } bottom-0 py-4 max-md:pb-0`}
            >
              <button className="w-[100%] h-[70px] leading-[70px] text-center bg-[#7865a5] text-white text-xl max-md:h-[52px] max-md:leading-[52px] max-md:text-lg">
                {order.totalPrice.toLocaleString()}원{" "}
                {order.payment !== "withoutBankbook" ? "결제하기" : "진행하기"}
              </button>
            </div>
          </form>
        </div>
      </ContentLayout>
      <Footer />
      <style jsx>{`
        .od_title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 20px;
        }
        .od_box {
          display: flex;
          flex-direction: column;
          border-bottom: 20px solid #f9f9f9;
          padding: 24px 16px;
        }
        .od_input_box {
          margin-bottom: 16px;
        }
        .od_label {
          margin-bottom: 5px;
        }
        .od_input {
          border: 1px solid #e8e8e8;
          border-radius: 3px;
          padding: 10px;
          width: 100%;
          height: 56px;
        }
        @media not all and (min-width: 768px) {
          .od_title {
            font-size: 18px;
            margin-bottom: 15px;
          }
          .od_box {
            border-bottom: 12px solid #f9f9f9;
            padding: 20px 12px;
          }
          .od_input_box {
            margin-bottom: 12px;
          }
          .od_label {
            font-size: 12px;
          }
          .od_input {
            height: 40px;
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
