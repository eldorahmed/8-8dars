import { BASE_URL } from "../lib/my-utils";

export async function login(data) {
  const req = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(req);
}
