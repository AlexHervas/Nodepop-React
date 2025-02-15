import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import { Credentials, Login } from "./types";

const loginUrl = "api/auth/login";

export const login = async (
  credentials: Credentials,
  localSavedToken: boolean
) => {
  const response = await client.post<Login>(loginUrl, credentials);
  const { accessToken } = response.data;

  storage.set("auth", accessToken, localSavedToken);

  setAuthorizationHeader(accessToken);
};

export const logout = async () => {
  storage.remove("auth");
  removeAuthorizationHeader();
};
