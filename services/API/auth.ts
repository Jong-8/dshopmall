import { apiHelper } from "./serviceHelper";
import { apiHeader } from "@utils/api";

const helper = apiHelper();

interface Login {
  token: string;

  designerProcess: number;
}

export const login = async (username: string, password: string) => {
  const body = { username, password };
  const res = await helper.Post<Login>("/auth/login", body);
  return res;
};

export const tokenLogin = async (token: string) => {
  const config = apiHeader(token);
  const res = await helper.Get<Login>("/auth/login/token", config);
  return res;
};
