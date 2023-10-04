import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import Verification from "@components/Member/Verification";
import { useState, ChangeEvent, FormEvent } from "react";

export default function FindPassword() {
  const [values, setValues] = useState({
    id: "",
    name: "",
    phone: "",
  });
  const { id, name, phone } = values;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onFindPasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <SubLayout title="비밀번호 찾기">
      <form action="" onSubmit={onFindPasswordSubmit}>
        <Input
          title="아이디 *"
          name="id"
          type="text"
          value={id}
          onChange={onChange}
        />
        <Verification name={name} phone={phone} onChange={onChange} />
        <div className="text-center">
          <Button text="비밀번호 찾기" type="submit" />
        </div>
      </form>
    </SubLayout>
  );
}
