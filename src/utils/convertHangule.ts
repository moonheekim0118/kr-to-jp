import parseHangule from "./parseHangule";

const cache = new Map();

function convertHangule(hangule: string): string {
  const hiraganaResult = hangule.split("").map((word) => {
    if (cache.has(word)) return cache.get(word);
    const hiragana = parseHangule(word).join("");
    cache.set(word, hiragana);
    return hiragana;
  });
  return hiraganaResult.join("");
}

export default convertHangule;
