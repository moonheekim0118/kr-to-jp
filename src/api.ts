import { ERROR_MESSAGE } from "@constants/index";
const URL = process.env.API_URL;
const cache = new Map();

async function request(query: string) {
  if (cache.has(query)) return cache.get(query);
  const response = await fetch(`${URL}/${query}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }
  const data = await response.json();
  const result = data.message.result.translatedText;
  cache.set(query, result);
  return result;
}

export default request;
