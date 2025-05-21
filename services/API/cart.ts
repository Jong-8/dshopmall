// import { apiHelper } from "./serviceHelper";
// import { apiHeader } from "@utils/api";

// const helper = apiHelper();

// export const cart = async (token: string) => {
//   const config = apiHeader(token);
//   const res = await helper.Get<ShopCartResponse>("/user/cart", config);
//   return res;
// };

// export const addCart = async (token: string, infos: ShopCartAddRequest) => {
//   const config = apiHeader(token);
//   const body = infos;
//   const res = await helper.Post<ShopCartResponse>(
//     "/user/cart/add",
//     body,
//     config
//   );
//   return res;
// };

// export const deleteCart = async (
//   token: string,
//   counter: ShopCartRemoveRequest
// ) => {
//   const config = apiHeader(token);
//   const body = counter;
//   const res = await helper.Post<ShopCartResponse>(
//     "/user/cart/remove",
//     body,
//     config
//   );
//   return res;
// };

// export const changeCart = async (
//   token: string,
//   datas: ShopCartChangeRequest
// ) => {
//   const config = apiHeader(token);
//   const body = datas;
//   const res = await helper.Post<ShopCartResponse>(
//     "/user/cart/change",
//     body,
//     config
//   );
//   return res;
// };
