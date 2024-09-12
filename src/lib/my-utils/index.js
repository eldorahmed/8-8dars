export function getFormData(form) {
  const obj = {};
  const data = new FormData(form);
  for (const [key, value] of data.entries()) {
    obj[key] = value;
  }
  return obj;
}

export const BASE_URL = "https://json-api.uz/api/project/flowers";
