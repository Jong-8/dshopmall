import { apiHelper } from "./serviceHelper";
import { apiHeader } from "@utils/api";

const helper = apiHelper();

export const login = async (username: string, password: string) => {
  const body = { username, password };
  const res = await helper.Post<ShopLoginResponse>("/auth/login", body);
  return res;
};

export const tokenLogin = async (token: string) => {
  const config = apiHeader(token);
  const res = await helper.Get<ShopLoginResponse>("/auth/login/token", config);
  return res;
};

export const signup = async (infos: ShopSignupRequest) => {
  const body = infos;
  const res = await helper.Post<ShopLoginResponse>("/auth/signup", body);
  return res;
};

export const checkCode = async (code: ShopCheckCodeRequest) => {
  const body = code;
  const res = await helper.Post<ShopCheckCodeResponse>(
    "/auth/check/code",
    body
  );
  return res;
};

export const findPassword = async (infos: ShopForgotRequest) => {
  const body = infos;
  const res = await helper.Post<ShopForgotResponse>("/auth/certi/forgot", body);
  return res;
};

export const modify = async (token: string, infos: ShopUserModifyRequest) => {
  const config = apiHeader(token);
  const body = infos;
  const res = await helper.Post<ShopLoginResponse>(
    "/auth/modify",
    body,
    config
  );
  return res;
};

export const unsubscribe = async (token: string) => {
  const config = apiHeader(token);
  const res = await helper.Post<ShopSecessionResponse>(
    "/auth/secession",
    {},
    config
  );
  return res;
};
