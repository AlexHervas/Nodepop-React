import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setAuthorizationHeader = (accesToken: string) => {
  client.defaults.headers["Authorization"] = `Bearer ${accesToken}`;
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers["Authorization"];
};
