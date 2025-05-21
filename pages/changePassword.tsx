import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import API from "@services/API";
import { useRouter } from "next/router";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function ChangePassword() {
  const [values, setValues] = useState({
    changePassword: "",
    changePasswordConfirm: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies([
    "temporaryToken",
    "token",
  ]);
  const router = useRouter();
  const { changePassword, changePasswordConfirm } = values;

  useEffect(() => {
    if (cookies.token) {
      setCookie("temporaryToken", cookies.token, { path: "/" });
    }
  }, []);

  const onChangePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (changePassword !== changePasswordConfirm) {
      alert("비밀번호가 맞지 않습니다. 비밀번호를 확인 부탁드립니다.");
      return false;
    }

    const infos = {
      password: changePassword,
    };

    return false;

    // const res = await API.auth.modify(cookies.temporaryToken, infos);
    // if (res.statusCode === 2000) {
    //   alert("비밀번호 변경이 완료되었습니다.");
    //   removeCookie("temporaryToken");
    //   if (cookies.token) {
    //     router.push("/mypage");
    //   } else {
    //     router.replace("/login");
    //   }
    // } else alert(res.message);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            title="새 비밀번호"
            name="changePassword"
            type="password"
            value={changePassword}
            onChange={onChange}
            placeholder={"새 비밀번호를 입력해주세요."}
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
