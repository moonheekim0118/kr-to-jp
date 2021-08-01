const URL = process.env.API_URL;
const TIMEOUT = 8000;
const { signal, abort } = new AbortController();

const cache = new Map();

async function request(query: string): Promise<string> {
  if (cache.has(query)) return cache.get(query);
  const timer = setTimeout(() => abort(), TIMEOUT);
  const response = await fetch(`${URL}/${query}`, { signal });
  if (!response.ok) {
    throw new Error("서버에 에러가 발생했습니다.");
  }
  const data = await response.json();
  clearTimeout(timer);
  const result = data.message.result.translatedText;
  cache.set(query, result);
  return result;
}

export default request;
