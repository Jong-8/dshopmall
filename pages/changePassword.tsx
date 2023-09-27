import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import { useState } from "react";

export default function ChangePassword() {
  const [values, setValues] = useState({
    password: "",
    changePassword: "",
    changePasswordConfirm: "",
  });
  const { password, changePassword, changePasswordConfirm } = values;
  const onChangePasswordSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
  };
  const onChange = (e: {
    target: { name: string; value: string | number };
  }) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <SubLayout title="비밀번호 변경">
      <form action="" onSubmit={onChangePasswordSubmit}>
        <div>
          <Input
            title="현재 비밀번호"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
          <Input
            title="새 비밀번호"
            name="changePassword"
            type="password"
            value={changePassword}
            onChange={onChange}
            placeholder={"6자 이상 입력해주세요."}
          />
          <Input
            title="새 비밀번호 확인"
            name="changePasswordConfirm"
            type="password"
            value={changePasswordConfirm}
            onChange={onChange}
          />
        </div>
        <div>
          <div className="mb-5 text-center">
            <Button text="변경하기" type="submit" width="w-[160px]" />
          </div>
        </div>
      </form>
    </SubLayout>
  );
}
