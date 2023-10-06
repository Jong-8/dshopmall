import SubLayout from "@components/Layout/SubLayout";
import Button from "@components/Member/Button";
import Input from "@components/Member/Input";
import Verification from "@components/Member/Verification";
import { useState, FormEvent, ChangeEvent } from "react";

export default function Signup() {
  const [values, setValues] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
    email: "",
  });
  const [chks, setChks] = useState({
    allChk: 0,
    requiredChk1: 0,
    requiredChk2: 0,
    selectChk: 0,
  });
  const { id, password, passwordConfirm, name, phone, email } = values;
  const { allChk, requiredChk1, requiredChk2, selectChk } = chks;

  const onSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
          <Verification name={name} phone={phone} onChange={onChange} />
          <Input
            title="아이디 *"
            name="id"
            type="text"
            value={id}
            onChange={onChange}
          />
          <Input
            title="비밀번호 *"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
          <Input
            title="비밀번호 확인 *"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={onChange}
          />
          <Input
            title="이메일"
            name="email"
            type="text"
            value={email}
            onChange={onChange}
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
                className="max-md:w-3 max-md:h-3"
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
                className="max-md:w-3 max-md:h-3"
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
                className="max-md:w-3 max-md:h-3"
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
                className="max-md:w-3 max-md:h-3"
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
