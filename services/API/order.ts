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
    "/payments/prepare",
    body,
    config
  );
  return res;
};
