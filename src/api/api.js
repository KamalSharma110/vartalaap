export const BASE_URL = "https://chatapp-backend-production-1727.up.railway.app/";

function getCurrentUserInfo() {
  const currentUserInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
  if (currentUserInfo) {
    return currentUserInfo;
  }
  throw new Error("Could not find the token");
}

async function sendRequest(url, method, body = null) {
  const { token } = getCurrentUserInfo();
  let headers = {
    Authorization: "Bearer " + token,
  };

  if (method === "POST") headers["Content-Type"] = "application/json";

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.error.message);
  return resData;
}

export async function searchUsers(searchTerm) {
  const { localId } = getCurrentUserInfo();

  return await sendRequest(
    BASE_URL + "auth/search-users?name=" + searchTerm,
    "POST",
    {
      currentUserId: localId,
    }
  );
}

export async function getRecentChats() {
  const { localId } = getCurrentUserInfo();

  return await sendRequest(BASE_URL + "recent-chats/" + localId, "GET");
}

export async function getChats(combinedId) {
  return await sendRequest(BASE_URL + "get-chats", "POST", { combinedId });
}

export async function createChat(combinedId) {
  return await sendRequest(BASE_URL + "create-chat", "POST",{ combinedId});
}

export async function createRecentChats(body) {
  return await sendRequest(BASE_URL + "create-recent-chats", "POST", body);
}

export async function sendChat(formData) {
  const { token } = getCurrentUserInfo();

  const response = await fetch(BASE_URL + "send-chat", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
    },
    body: formData,
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.error.message);
}
