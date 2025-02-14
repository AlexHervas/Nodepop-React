import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import { Credentials, Login } from "./types";

export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>("api/auth/login", credentials);
  const { accesToken } = response.data;
  storage.set("auth", accesToken);
  setAuthorizationHeader(accesToken);
};

export const logout = async () => {
  storage.remove("auth");
  removeAuthorizationHeader();
};
