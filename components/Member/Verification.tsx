import axios from "axios";
import Input from "./Input";
import { useEffect } from "react";

//const IMP = window.IMP; // 생략 가능
//IMP.init("imp15801485"); // 예: imp00000000

export default function Verification({
  name,
  phone,
  onChange,
}: VerificationProps) {
  const handleVerification = async () => {
    /* IMP.certification(
      {
        // param
        // 주문 번호
        pg: "B010008233", //본인인증 설정이 2개이상 되어 있는 경우 필
        merchant_uid: "ORD20180131-0000011",
        // 모바일환경에서 popup:false(기본값) 인 경우 필수
        m_redirect_url: "http://localhost:3000/",
        // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
        popup: false,
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 인증 성공 시 로직,
          console.log(rsp);
          axios
            .get(`https://api.iamport.kr/certifications/${rsp.imp_uid}`)
            .then((res) => {
              console.log(res.data);
            });
        } else {
          // 인증 실패 시 로직,
        }
      }
    ); */
  };
  return (
    <>
      <div className="relative">
        <Input
          title="이름 *"
          name="name"
          type="text"
          value={name}
          onChange={onChange}
          readonly={true}
        />
        <button
          className="absolute right-0 top-0 text-sm font-bold text-[#6846b7]"
          onClick={handleVerification}
        >
          본인인증
        </button>
      </div>
      <Input
        title="휴대전화 *"
        name="phone"
        type="text"
        value={phone}
        onChange={onChange}
        readonly={true}
      />
    </>
  );
}
