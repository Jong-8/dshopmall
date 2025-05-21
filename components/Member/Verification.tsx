import Input from "./Input";
import API from "@services/API";
import { useState, useEffect } from "react";

let IMP: any;
if (typeof window !== "undefined") {
  IMP = window.IMP; // 생략 가능
  IMP.init("imp15801485"); // 예: imp00000000
}
export default function Verification({
  name,
  phone,
  onVeriChange,
}: VerificationProps) {
  const [showButton, setShowButton] = useState(true);

  const handleVerification = async () => {
    IMP.certification(
      {
        // param
        // 주문 번호
        pg: "B010008233", //본인인증 설정이 2개이상 되어 있는 경우 필
        merchant_uid: "ORD20180131-0000011",
        // 모바일환경에서 popup:false(기본값) 인 경우 필수
        m_redirect_url: "http://localhost:3000/signup",
        // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
        popup: false,
      },
      async (rsp: any) => {
        // callback
        if (rsp.success) {
          //console.log(rsp);
          // 인증 성공 시 로직,
          // const res = await API.verification.verification(rsp.imp_uid);
          // if (res.statusCode === 2000) {
          //   //console.log(res.result);
          //   //onChange()
          //   onVeriChange(res.result.name, res.result.phone, res.result.imp_uid);
          //   setShowButton(!showButton);
          // } else {
          //   alert(res.result);
          // }
          return false;
        } else {
          // 인증 실패 시 로직,
          alert(rsp.error_msg);
        }
      }
    );
  };

  return (
    <>
      <div className="relative">
        <Input
          title="이름 *"
          name="name"
          type="text"
          value={name}
          readonly={true}
          required={true}
        />
        {showButton && (
          <button
            type="button"
            className="absolute right-0 top-0 text-sm font-bold text-[#6846b7] max-md:text-xs"
            onClick={handleVerification}
          >
            본인인증
          </button>
        )}
      </div>
      <Input
        title="휴대전화 *"
        name="phone"
        type="text"
        value={phone}
        readonly={true}
        required={true}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
