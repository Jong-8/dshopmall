import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import { useState, ChangeEvent, FormEvent } from "react";

export default function CheckGuestOrder() {
  const [values, setValues] = useState({
    name: "",
    orderId: "",
  });
  const { name, orderId } = values;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onCheckGuestOrderSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          title="주문번호"
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
