import ContentLayout from "@components/Layout/ContentLayout";
import ContentTitle from "@components/Layout/ContentTitle";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function About() {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5dd182cadaef2ad101522d43778eb7a7&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        var options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(
            37.49214931965894,
            127.03094090818745
          ), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        var map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 마커가 표시될 위치입니다
        var markerPosition = new window.kakao.maps.LatLng(
          37.49214931965894,
          127.03094090818745
        );

        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        var iwContent =
            '<div style="width: 280px;text-align: center; padding: 8px;">아담플레이스<br>강남대로 324 역삼디오슈페리움 1층</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwPosition = new window.kakao.maps.LatLng(
            37.49214931965894,
            127.03094090818745
          ); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성합니다
        var infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);
  return (
    <>
      <Header title="DSHOPMALL | ABOUT" description="ABOUT" />
      <ContentLayout>
        <ContentTitle title="about" />
        <div className="p-4 pb-10 max-md:px-3 max-md:pb-6">
          <div className="text-center mb-4">
            <div className="uppercase font-black text-[42px] mb-6 gmarket max-md:text-[24px]">
              design my beauty
            </div>
            <div className="leading-8 max-md:text-xs">
              디샵은 나 자신을 디자인하여 다양한 페르소나를{" "}
              <br className="md:hidden" />
              표현 할 수 있는 뷰티철학을 가진 브랜드입니다. <br />
              누구나 쉽고 빠르게 이용할 수 있는 디샵과 함께 나를{" "}
              <br className="md:hidden" />
              표현 할 수 있는 아름다움을 느껴보세요.
            </div>
          </div>
        </div>
        <div className="max-w-[900px] m-auto pb-[80px] max-md:pb-[0px]">
          <div className="p-5 relative max-md:overflow-hidden max-md:pb-10">
            <div className="w-[100%] h-[1080px] bg-[url('/img/cosmetics.jpg')] bg-no-repeat bg-bottom bg-cover max-md:h-[auto] max-md:pt-[120%]"></div>
            <div className="w-[283px] h-[283px] bg-[url('/img/round_text.png')] bg-no-repeat bg-bottom bg-cover absolute right-[-100px] bottom-[-100px] animate-[spin_8s_linear_infinite] max-md:right-[-20px] max-md:bottom-[5px] max-md:w-[160px] max-md:h-[160px]"></div>
          </div>
        </div>
        <div className="text-center py-[80px] max-md:py-[60px] max-md:text-xs">
          서울특별시 강남구 강남대로 324 <br className="md:hidden" />
          역삼디오슈페리움 1층
        </div>
      </ContentLayout>
      <div className="">
        <div className="">
          <div
            id="map"
            className="w-[100%] h-[520px] max-md:h-[240px] max-md:text-sm"
          ></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
