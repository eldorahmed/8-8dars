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
};

export const login = async (data) => {
  console.log("data", data);

  const res = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("res: ", res);

  if (res.status === 200 || res.status === 201) {
    return await res.json();
  } else if (res.status === 400) {
    throw new Error("Login yoki Parol hato kiritildi");
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }
};

export const getFlowers = async (token, { skip, limit }, isFiltered) => {
  const query = new URLSearchParams(`skip=${skip}&limit=${limit}`);

  if (isFiltered) {
    for (const key in isFiltered) {
      if (isFiltered[key]) {
        query.append(key, isFiltered[key]);
      }
    }
  }

  const res = await fetch(BASE_URL + "/flowers?" + query, {
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

export const uploadImage = async (image) => {
  const formData = new FormData();

  formData.append("file", image);

  const res = await fetch(BASE_URL + "/upload", {
    method: "POST",
    body: formData,
  });

  if (res.status === 200 || res.status === 201) {
    return await res.text();
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }
};
export const sendFlower = async (token, flower) => {
  const res = await fetch(BASE_URL + "/flowers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flower),
  });

  if (res.status === 200 || res.status === 201) {
    return "Ma'lumot muvaffaqiyatli qo'shildi";
  } else if (res.status === "403") {
    throw new Error("403");
  } else {
    throw new Error("Nimadir hato ketti!");
  }
};

export const deleteFlower = async (token, id) => {
  console.log("deletedID", id, BASE_URL + "/flowers/" + id);

  const res = await fetch(BASE_URL + "/flowers/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200 || res.status === 201) {
    return "Ma'lumot muvaffaqiyatli o'chirildi";
  } else if (res.status === 403) {
    throw new Error("403");
  } else {
    throw new Error("Nimadir hato ketti!");
  }
};

export const editFlower = async (token, flower) => {
  const res = await fetch(BASE_URL + "/flowers/" + flower.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flower),
  });

  if (res.status === 200 || res.status === 201) {
    return "Ma'lumot muvaffaqiyatli yangilandi";
  } else if (res.status === "403") {
    throw new Error("403");
  } else {
    throw new Error("Nimadir hato ketti!");
  }
};
