import { apiHeader } from "@utils/api";
import { apiHelper } from "./serviceHelper";

const helper = apiHelper();

export const payPrepare = async (
  token: string,
  datas: ShopPayPrepareRequest
) => {
  const config = apiHeader(token);
  const body = datas;
  const res = await helper.Post<ShopPayPrepareResponse>(
    "/user/payments/prepare",
    body,
    config
  );
  return res;
};

export const payComplete = async (datas: ShopPayCompleteRequest) => {
  const body = datas;
  const res = await helper.Post<ShopOrderDetailResponse>(
    "/user/payments/complete",
    body
  );
  return res;
};

export const orderDetail = async (
  type: string,
  datas: ShopOrderDetailRequest | ShopOrderGuestRequest,
  token: string
) => {
  const body = datas;
  const config = apiHeader(token);
  let res;
  if (type === "member") {
    res = await helper.Post<ShopOrderDetailResponse>(
      "/user/order/detail",
      body,
      config
    );
  } else {
    res = await helper.Post<ShopOrderDetailResponse>("/user/order/guest", body);
  }
  return res;
};

export const orderDeliveryChange = async (
  datas: ShopOrderDeliveryRequest,
  token: string
) => {
  const body = datas;
  const config = apiHeader(token);
  const res = await helper.Post<ShopOrderDetailResponse>(
    "/user/order/change",
    body,
    config
  );
  return res;
};

export const orderList = async (token: string) => {
  const config = apiHeader(token);
  const res = await helper.Get<ShopOrderResponse>("/user/order", config);
  return res;
};
