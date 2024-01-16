import { URL_BASE } from './url';

export async function getAllBooks(payload) {
  const response = await fetch(`${URL_BASE}books/feed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function getBookBySlug(payload) {
  const response = await fetch(`${URL_BASE}books${payload.slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${payload.token}`
    },
  });
  console.log('pauload', response)
  const data = await response.json();
  return data;
}
