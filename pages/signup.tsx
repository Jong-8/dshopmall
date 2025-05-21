import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import Verification from "@components/Member/Verification";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import API from "@services/API";
import { store } from "@stores/index";
import { useCookies } from "react-cookie";

export default function Signup() {
  const [values, setValues] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    phone: "",
    email: "",
    code: "",
    imp_uid: "",
  });
  const [chks, setChks] = useState({
    allChk: 0,
    requiredChk1: 0,
    requiredChk2: 0,
    selectChk: 0,
  });
  const [checkCode, setCheckCode] = useState({
    isCode: false,
    chkCode: false,
    codeMessage: "",
  });
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { setToken } = store.auth.useToken();
  const {
    id,
    password,
    passwordConfirm,
    userName,
    phone,
    email,
    code,
    imp_uid,
  } = values;
  const { allChk, requiredChk1, requiredChk2, selectChk } = chks;
  const { isCode, chkCode, codeMessage } = checkCode;

  const onSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName) {
      alert("본인인증 후 가입하실 수 있습니다.");
      return false;
    }

    if (isCode && !chkCode) {
      alert("잘못된 추천코드입니다.");
      return false;
    }

    if (!requiredChk1 || !requiredChk2) {
      alert("필수 동의항목을 모두 동의해주시기 바랍니다.");
      return false;
    }

    const infos = {
      username: id,
      password: password,
      email: email,
      code: code,
      marketing: selectChk === 1 ? true : false,
      imp_uid: imp_uid,
    };

    return false;

    // const res = await API.auth.signup(infos);
    // if (res.statusCode === 2000) {
    //   /* 정상 반환시 비즈니스 로직*/
    //   setToken(res.result.token, res.result.user);
    //   setCookie("token", res.result.token, {
    //     path: "/",
    //   });
    //   router.replace("/");
    // } else alert(res.message);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onVeriChange = (userName: string, phone: string, imp_uid: string) => {
    setValues({
      ...values,
      userName,
      phone,
      imp_uid,
    });
  };

  const onCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.length > 7) {
      return false;
    }

    setValues({
      ...values,
      [name]: value,
    });

    const code = async (code: ShopCheckCodeRequest) => {
      // const res = await API.auth.checkCode(code);
      // if (res.statusCode === 2000) {
      //   setCheckCode({
      //     isCode: true,
      //     chkCode: true,
      //     codeMessage: "추천 가능한 코드입니다.",
      //   });
      // } else {
      //   if (!code.code) {
      //     setCheckCode({
      //       isCode: false,
      //       chkCode: false,
      //       codeMessage: "",
      //     });
      //   } else {
      //     setCheckCode({
      //       isCode: true,
      //       chkCode: false,
      //       codeMessage: res.message,
      //     });
      //   }
      // }
    };
    code({ code: value });
  };

  const onAllChkChange = () => {
    const state = allChk ? 0 : 1;
    setChks({
      allChk: state,
      requiredChk1: state,
      requiredChk2: state,
      selectChk: state,
    });
  };

  const onRequiredChk1Change = () => {
    const state = requiredChk1 ? 0 : 1;
    let allChkState = 0;
    if (allChk === 0) {
      allChkState =
        state === 1 && requiredChk2 === 1 && selectChk === 1 ? 1 : 0;
    } else {
      allChkState =
        state === 0 && requiredChk2 === 0 && selectChk === 0 ? 1 : 0;
    }
    setChks({
      ...chks,
      allChk: allChkState,
      requiredChk1: state,
    });
  };

  const onRequiredChk2Change = () => {
    const state = requiredChk2 ? 0 : 1;
    let allChkState = 0;
    if (allChk === 0) {
      allChkState =
        state === 1 && requiredChk1 === 1 && selectChk === 1 ? 1 : 0;
    } else {
      allChkState =
        state === 0 && requiredChk1 === 0 && selectChk === 0 ? 1 : 0;
    }
    setChks({
      ...chks,
      allChk: allChkState,
      requiredChk2: state,
    });
  };

  const onSelectChkChange = () => {
    const state = selectChk ? 0 : 1;
    let allChkState = 0;
    if (allChk === 0) {
      allChkState =
        requiredChk1 === 1 && requiredChk2 === 1 && state === 1 ? 1 : 0;
    } else {
      allChkState =
        requiredChk1 === 0 && requiredChk2 === 0 && state === 0 ? 1 : 0;
    }
    setChks({
      ...chks,
      allChk: allChkState,
      selectChk: state,
    });
  };
  return (
    <SubLayout title="회원가입">
      <form action="" onSubmit={onSignupSubmit}>
        <div>
          <Verification
            name={userName}
            phone={phone}
            onVeriChange={onVeriChange}
          />
          <Input
            title="아이디 *"
            name="id"
            type="text"
            value={id}
            onChange={onChange}
            required={true}
          />
          <Input
            title="비밀번호 *"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            required={true}
          />
          <Input
            title="비밀번호 확인 *"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={onChange}
            required={true}
          />
          <Input
            title="이메일"
            name="email"
            type="text"
            value={email}
            onChange={onChange}
          />
          <Input
            title="추천코드"
            name="code"
            type="text"
            value={code}
            onChange={onCodeChange}
            text={codeMessage}
          />
        </div>
        <div className="max-md:text-xs">
          <div className="flex mb-2">
            <div className="mr-2 pt-[1px]">
              <input
                type="checkbox"
                value={allChk}
                checked={allChk === 1 && true}
                onChange={onAllChkChange}
                className="accent-[#7a1cea] max-md:w-3 max-md:h-3"
              />
            </div>
            <div onClick={onAllChkChange} className="cursor-pointer">
              모두 동의합니다.
            </div>
          </div>
          <div className="flex mb-2">
            <div className="mr-2 pt-[1px]">
              <input
                type="checkbox"
                value={requiredChk1}
                checked={requiredChk1 === 1 && true}
                onChange={onRequiredChk1Change}
                className="accent-[#7a1cea] max-md:w-3 max-md:h-3"
              />
            </div>
            <div onClick={onRequiredChk1Change} className="cursor-pointer">
              (필수){" "}
              <a href="" className="text-[#6846b7]">
                이용약관
              </a>
              과{" "}
              <a href="" className="text-[#6846b7]">
                개인정보 수집 및 이용
              </a>
              에 동의합니다.
            </div>
          </div>
          <div className="flex mb-2">
            <div className="mr-2 pt-[1px] max-md:pt-[5px]">
              <input
                type="checkbox"
                value={requiredChk2}
                checked={requiredChk2 === 1 && true}
                onChange={onRequiredChk2Change}
                className="accent-[#7a1cea] max-md:w-3 max-md:h-3"
              />
            </div>
            <div
              onClick={onRequiredChk2Change}
              className="cursor-pointer leading-6"
            >
              (필수) 만 14세 이상입니다.
              <span className="block text-xs max-md:text-[10px]">
                만 19세 미만의 미성년자가 결제 시 법정대리인이 거래를 취소할 수
                있습니다.
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="mr-2 pt-[1px] max-md:pt-[5px]">
              <input
                type="checkbox"
                value={selectChk}
                checked={selectChk === 1 && true}
                onChange={onSelectChkChange}
                className="accent-[#7a1cea] max-md:w-3 max-md:h-3"
              />
            </div>
            <div
              onClick={onSelectChkChange}
              className="cursor-pointer leading-6"
            >
              (선택) 이메일 및 SMS 마케팅 정보 수신에 동의합니다.
              <span className="block text-xs max-md:text-[10px]">
                회원은 언제든지 회원 정보에서 수신 거부로 변경할 수 있습니다.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="text-center">
            <Button text="가입하기" type="submit" />
          </div>
        </div>
      </form>
    </SubLayout>
  );
}
