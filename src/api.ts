import { ERROR_MESSAGE } from "@constants/index";
const URL = process.env.API_URL;
const TIMEOUT = 8000;
const controller = new AbortController();
const signal = controller.signal;

const cache = new Map();

async function request(query: string) {
  if (cache.has(query)) return cache.get(query);
  const timer = setTimeout(() => {
    controller.abort();
    throw new Error(ERROR_MESSAGE);
  }, TIMEOUT);
  const response = await fetch(`${URL}/${query}`, { signal });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }
  const data = await response.json();
  clearTimeout(timer);
  const result = data.message.result.translatedText;
  cache.set(query, result);
  return result;
}

export default request;
