import { URL_BASE } from './url';

export async function postComment(payload) {
  console.log(payload)
  const response = await fetch(`${URL_BASE}comment${payload.slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${payload.token}`
    },
    body: JSON.stringify(payload.body)
  });
  const data = await response.json();
  return data;
}
