import parseHangul from "./parseHangul";

const SPECIAL_CASE = new Set([".", ",", "!", "?"]);
const cache = new Map();

function convertHangul(hangul: string): string {
  const hiraganaResult = hangul.split("").map((word) => {
    if (SPECIAL_CASE.has(word)) return word;
    if (cache.has(word)) return cache.get(word);
    const hiragana = parseHangul(word).join("");
    cache.set(word, hiragana);
    return hiragana;
  });
  return hiraganaResult.join("");
}

export default convertHangul;
