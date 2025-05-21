import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import API from "@services/API";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";

export default function CheckGuestOrder() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    orderId: "",
  });
  const router = useRouter();
  const { name, phone, orderId } = values;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onCheckGuestOrderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datas = {
      name: name,
      merchant_uid: orderId,
      phone: phone,
    };

    // const res = await API.order.orderDetail("guest", datas, "");
    // if (res.statusCode === 2000) {
    //   if (res.message === "해당 주문 내역이 존재하지 않습니다.") {
    //     alert(res.message);
    //     return false;
    //   }
    //   router.push(`/orderDetails/${orderId}?name=${name}&phone=${phone}`);
    // } else alert(res.message);
  };
  return (
    <SubLayout title="비회원 주문 조회하기">
      <form action="" onSubmit={onCheckGuestOrderSubmit}>
        <Input
          title="이름 *"
          name="name"
          type="text"
          value={name}
          onChange={onChange}
        />
        <Input
          title="연락처 *"
          name="phone"
          type="text"
          value={phone}
          onChange={onChange}
          placeholder="- 빼고 입력해주세요."
        />
        <Input
          title="주문번호 *"
          name="orderId"
          type="text"
          value={orderId}
          onChange={onChange}
        />
        <div className="mt-5">
          <div className="text-center">
            <Button text="조회하기" type="submit" />
          </div>
        </div>
      </form>
    </SubLayout>
  );
}
