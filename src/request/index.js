import { BASE_URL } from "../lib/my-utils/index";

export const refreshToken = async (token) => {
  const res = await fetch(BASE_URL + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: token }),
  });

  if (res.status === 200 || res.status === 201) {
    return await res.json();
  } else if (res.status == 403) {
    throw new Error(403);
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }

  console.log(res);
};

export const login = async (data) => {
  const res = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200 || res.status === 201) {
    return await res.json();
  } else if (res.status === 400) {
    throw new Error("Login yoki Parol hato kiritildi");
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }
};

export const getFlowers = async (token) => {
  const res = await fetch(BASE_URL + "/flowers", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200 || res.status === 201) {
    return await res.json();
  } else if (res.status == 403) {
    throw new Error(403);
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }
};
