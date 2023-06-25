import { BASE_URL } from "./api";

export const getAuthUserData = async (token, localId) => {
  const response = await fetch(`${BASE_URL}auth/get-user`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ localId: localId }),
  });
  const resData = await response.json();
  return resData;
};

export const getExpirationTime = () => {
  const currentUserInfo = localStorage.getItem("currentUserInfo");
  let expirationTime;
  if (currentUserInfo) {
    expirationTime = JSON.parse(currentUserInfo).expirationTime;
    return new Date(expirationTime) - Date.now();
  }
  return null;
};
