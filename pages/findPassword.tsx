import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import Verification from "@components/Member/Verification";
import API from "@services/API";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import { useCookies } from "react-cookie";

export default function FindPassword() {
  const [values, setValues] = useState({
    id: "",
    name: "",
    phone: "",
    imp_uid: "",
  });
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["temporaryToken"]);
  const { id, name, phone, imp_uid } = values;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onVeriChange = (name: string, phone: string, imp_uid: string) => {
    setValues({
      ...values,
      name,
      phone,
      imp_uid,
    });
  };

  const onFindPasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      alert("본인인증 후 가입하실 수 있습니다.");
      return false;
    }

    const infos = {
      imp_uid,
      username: id,
      name,
      phone,
    };

    // const res = await API.auth.findPassword(infos);
    // if (res.statusCode === 2000) {
    //   //console.log(res.result);
    //   const temporaryLogin = await API.auth.login(id, res.result.password);
    //   if (temporaryLogin.statusCode === 2000) {
    //     //await API.auth.tokenLogin(temporaryLogin.result.token);
    //     setCookie("temporaryToken", temporaryLogin.result.token, {
    //       path: "/",
    //     });
    //     router.push("/changePassword");
    //   }
    // } else alert(res.message);
    return false;
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
          required={true}
        />
        <Verification name={name} phone={phone} onVeriChange={onVeriChange} />
        <div className="text-center">
          <Button text="비밀번호 찾기" type="submit" />
        </div>
      </form>
    </SubLayout>
  );
}
