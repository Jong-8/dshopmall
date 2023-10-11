import ContentLayout from "@components/Layout/ContentLayout";
import ContentTitle from "@components/Layout/ContentTitle";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";

export default function Dshop() {
  return (
    <>
      <Header title="DSHOPMALL | DSHOP" description="DSHOP" />
      <ContentLayout>
        <ContentTitle title="dshop" />
        <div className="p-4 pb-16 max-md:px-3 max-md:pb-8">
          <div className="text-center mb-[60px] max-md:mb-10">
            <div className="font-black text-[42px] mb-6 gmarket max-md:text-[24px]">
              풀서비스 뷰티 플랫폼
            </div>
            <div className="leading-8 max-md:text-xs">
              디샵은 회원들의 믿을 수 있는 리뷰 정보로 만들어진 커뮤니티,{" "}
              <br className="md:hidden" />
              다양한 엔터테인먼트 사업, <br className="max-md:hidden" />
              뷰티 쇼핑몰, 여러 분야의 예약 서비스를{" "}
              <br className="md:hidden" />
              통합한 풀서비스 뷰티 플랫폼입니다.
            </div>
            <div className="py-[80px] max-md:pt-[50px] max-md:pb-0">
              <div className="flex flex-wrap">
                <div className="w-[50%] h-[524px] bg-gray-600 relative text-lg text-white max-md:w-[100%] max-md:h-[auto] max-md:pt-[100%]">
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%]">
                    커뮤니티 이미지
                  </div>
                </div>
                <div className="w-[50%] flex items-center justify-center flex-col max-md:w-[100%] max-md:pt-8 max-md:pb-16">
                  <div className="text-xl font-bold mb-3 max-md:text-base">
                    커뮤니티
                  </div>
                  <div className="max-md:text-xs">
                    디샵의 커뮤니티는 <br />
                    뷰티 열정을 공유하고 서로 도움을 주는 공간입니다. <br />
                    회원들은 제품 리뷰, 튜토리얼, 팁 및 트릭을 공유하며, <br />
                    뷰티에 관한 지식을 확장할 수 있습니다.
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap flex-row-reverse">
                <div className="w-[50%] h-[524px] bg-gray-600 relative text-lg text-white max-md:w-[100%] max-md:h-[auto] max-md:pt-[100%]">
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%]">
                    엔터테인먼트 사업 이미지
                  </div>
                </div>
                <div className="w-[50%] flex items-center justify-center flex-col max-md:w-[100%] max-md:pt-8 max-md:pb-16">
                  <div className="text-xl font-bold mb-3 max-md:text-base">
                    엔터테인먼트 사업
                  </div>
                  <div className="max-md:text-xs">
                    디샵은 콘서트와 오디션을
                    <br /> 주관하여 예술과 뷰티의 세계를 결합시킵니다. <br />
                    엔터테인먼트 활동을 통해 다양한 아티스트들과 <br />
                    디자이너들을 만나 보실 수 있습니다.
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-[50%] h-[524px] bg-gray-600 relative text-lg text-white max-md:w-[100%] max-md:h-[auto] max-md:pt-[100%]">
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%]">
                    쇼핑몰 이미지
                  </div>
                </div>
                <div className="w-[50%] flex items-center justify-center flex-col max-md:w-[100%] max-md:pt-8 max-md:pb-16">
                  <div className="text-xl font-bold mb-3 max-md:text-base">
                    쇼핑몰
                  </div>
                  <div className="max-md:text-xs">
                    디샵의 쇼핑몰은 다양한 뷰티 제품을 한 곳에서 <br />
                    찾을 수 있는 편리한 플랫폼입니다. <br />
                    피부 관리, 화장품, 헤어 제품, 액세서리 등 <br />
                    다양한 옵션 중에서 선택할 수 있습니다.
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap flex-row-reverse">
                <div className="w-[50%] h-[524px] bg-gray-600 relative text-lg text-white max-md:w-[100%] max-md:h-[auto] max-md:pt-[100%]">
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%]">
                    예약 서비스 이미지
                  </div>
                </div>
                <div className="w-[50%] flex items-center justify-center flex-col max-md:w-[100%] max-md:pt-8 max-md:pb-16">
                  <div className="text-xl font-bold mb-3 max-md:text-base">
                    예약 서비스
                  </div>
                  <div className="max-md:text-xs">
                    디샵을 통해 헬스, 헤어, 네일, 스파 등 <br />
                    다양한 뷰티 분야의 디자이너와 전문가에게 <br />
                    손쉽게 예약할 수 있습니다. <br />
                    개개인에게 맞춘 뷰티 서비스를 예약하여 <br />
                    아름다움을 극대화하세요.
                  </div>
                </div>
              </div>
            </div>
            <div className="leading-8 max-md:text-xs">
              디샵은 뷰티와 엔터테인먼트 등을 통합한 풀서비스 플랫폼으로, <br />
              회원들이 더 나은 아름다움을 추구하고 더 많은 경험을 즐길 수 있도록{" "}
              <br className="md:hidden" />
              도울 것입니다. <br className="max-md:hidden" />
              지금 디샵을 통해 다양한 매력을 경험하세요.
            </div>
          </div>
          <div className="flex justify-center font-bold">
            <div className="mr-8 max-md:mr-5">
              <a
                className="flex items-center text-xl cursor-pointer text-[#6846b7] max-md:text-base"
                href="https://play.google.com/store/apps/details?id=com.dshop"
                target="_blank"
              >
                <div className="mr-2 text-2xl max-md:text-lg">
                  <FaGooglePlay />
                </div>
                <div>안드로이드 다운받기</div>
              </a>
            </div>
            <div>
              <a
                className="flex items-center text-xl cursor-pointer text-[#6846b7] max-md:text-base"
                href="https://apps.apple.com/kr/app/dshop/id6461306801"
                target="_blank"
              >
                <div className="mr-2 text-2xl max-md:text-lg">
                  <FaAppStoreIos />
                </div>
                <div>IOS 다운받기</div>
              </a>
            </div>
          </div>
        </div>
      </ContentLayout>
      <Footer />
    </>
  );
}
