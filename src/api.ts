const URL = "https://hanbon.herokuapp.com/translate";
const TIMEOUT = 8000;
const { signal, abort } = new AbortController();

const cache = new Map();

async function request(query: string) {
  if (cache.has(query)) return cache.get(query);
  const timer = setTimeout(() => abort(), TIMEOUT);
  const response = await fetch(`${URL}/${query}`, { signal });
  if (!response.ok) {
    throw new Error("에러");
  }
  const data = await response.json();
  clearTimeout(timer);
  const result = data.message.result.translatedText;
  cache.set(query, result);
  return result;
}

export default request;
