import { URL_BASE } from './url';

export async function postLogin(payload) {
  const response = await fetch(`${URL_BASE}user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}
