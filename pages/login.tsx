import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import API from "@services/API";
import Link from "next/link";
import { useState } from "react";

type LoginProps = {
  id: string;
  password: string;
};
const dummyLogin: LoginProps = {
  id: "tester",
  password: "1234",
};
export default function Login() {
  const [values, setValues] = useState<LoginProps>({
    id: "",
    password: "",
  });
  const { id, password } = values;
  const onLoginSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();

    //const res = await API.auth.login(id, password);
    //if(res.statusCode === 2000) {
    //  /* 정상 반환시 비즈니스 로직*/
    //} else alert(res.message);

    // if (dummyLogin.id === id && dummyLogin.password === password) {
    //   alert("로그인 성공");
    // } else alert("비밀번호가 올바르지않습니다.");
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
    <SubLayout title="로그인">
      <form onSubmit={onLoginSubmit}>
        <div>
          <Input
            title="아이디"
            name="id"
            type="text"
            value={id}
            onChange={onChange}
          />
          <Input
            title="비밀번호"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
          <div className="flex justify-center mb-7">
            <Link href={"/findPassword"}>
              <a className="text-sm font-medium text-[#6846b7]">
                비밀번호 찾기
              </a>
            </Link>
            <Link href={"/checkGuestOrder"}>
              <a className="text-sm font-medium text-[#6846b7] ml-5">
                비회원 주문 조회하기
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mb-5 text-center">
            <Button text="로그인하기" type="submit" />
          </div>
          <div className="text-center">
            <Link href={"/signup"}>
              <a>
                <Button text="회원 가입하기" theme="white" type="" />
              </a>
            </Link>
          </div>
        </div>
      </form>
    </SubLayout>
  );
}
