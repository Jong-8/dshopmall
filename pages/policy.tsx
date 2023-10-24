import PolicyLayout from "@components/Layout/PolicyLayout";
import { store } from "@stores/index";
import { useCookies } from "react-cookie";
import API from "@services/API";
import { useEffect } from "react";

export default function Policy() {
  const [cookies, setCookies, removeCookies] = useCookies(["shopInfo"]);
  const shopInfo = store.shop.useShopInfo();

  const shopInfoApi = async () => {
    const res = await API.shopInfo.shopInfo();
    if (res.statusCode === 2000) {
      shopInfo.setShopInfo(res.result);
      setCookies("shopInfo", res.result, {
        path: "/",
      });
    } else alert(res.message);
  };

  useEffect(() => {
    if (!shopInfo.shopInfo.company) {
      // 회사정보가 store에 없을 때
      if (cookies.shopInfo) {
        // 쿠키에 회사정보가 있다면 store에 저장
        shopInfo.setShopInfo(cookies.shopInfo);
      } else {
        // 쿠키에 회사정보가 없다면 api로 불러와서 저장
        shopInfoApi();
      }
    }
  }, [shopInfo.shopInfo, cookies.shopInfo]);

  return (
    <PolicyLayout title="이용약관">{shopInfo.shopInfo.policy}</PolicyLayout>
  );
}
