import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import API from "@services/API";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";

type LoginProps = {
  id: string;
  password: string;
};
export default function Login() {
  const [values, setValues] = useState<LoginProps>({
    id: "",
    password: "",
  });
  const { id, password } = values;
  const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await API.auth.login(id, password);
    if (res.statusCode === 2000) {
      /* 정상 반환시 비즈니스 로직*/
      console.log("로그인 성공");
    } else alert(res.message);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
              <a className="text-sm font-medium text-[#6846b7] max-md:text-xs">
                비밀번호 찾기
              </a>
            </Link>
            <Link href={"/checkGuestOrder"}>
              <a className="text-sm font-medium text-[#6846b7] ml-5 max-md:text-xs">
                비회원 주문 조회하기
              </a>
            </Link>
          </div>
        </div>
        <div className="max-md:flex max-md:justify-center">
          <div className="mb-5 text-center max-md:mb-0 max-md:mr-3 max-md:w-[43%]">
            <Button
              text="로그인하기"
              type="submit"
              width="w-[240px] max-md:w-[100%]"
            />
          </div>
          <div className="text-center max-md:w-[43%]">
            <Link href={"/signup"}>
              <a>
                <Button
                  text="회원 가입하기"
                  theme="white"
                  type=""
                  width="w-[240px] max-md:w-[100%]"
                />
              </a>
            </Link>
          </div>
        </div>
      </form>
    </SubLayout>
  );
}
