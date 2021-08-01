const URL = "https://hanbon.herokuapp.com/translate";
const TIMEOUT = 8000;
const { signal, abort } = new AbortController();

async function request(query: string) {
  const timer = setTimeout(() => abort(), TIMEOUT);
  const response = await fetch(`${URL}/${query}`, { signal });
  if (!response.ok) {
    throw new Error("에러");
  }
  const data = await response.json();
  clearTimeout(timer);
  return data.message.result.translatedText;
}

export default request;
