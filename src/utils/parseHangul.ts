import hiraganaTable from "@assets/hiraganaTable";

const KOREAN_ONSET = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const KOREAN_ONSET_CONNECTOR = {
  ㄱ: 0,
  ㄲ: 1,
  ㄴ: 2,
  ㄷ: 3,
  ㄸ: 4,
  ㄹ: 5,
  ㅁ: 6,
  ㅂ: 7,
  ㅃ: 8,
  ㅅ: 9,
  ㅆ: 10,
  ㅇ: 11,
  ㅈ: 12,
  ㅉ: 13,
  ㅊ: 14,
  ㅋ: 15,
  ㅌ: 16,
  ㅍ: 17,
  ㅎ: 18,
};

const KOREAN_NUCLEUS = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const KOREAN_SYLLABLE = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const HANGUL_UNICODE_START = 44032;
const HANGUL_UNICODE_END = 55203;
const CONSONANTS_UNICODE_START = 12623;

const CONSONANTS_UNICODE = 588;
const VOWELS_UNICODE = 28;

function splitHangule(word: string): string[] {
  const unicodeOfWord = word.charCodeAt(0);
  if (
    unicodeOfWord < HANGUL_UNICODE_START ||
    unicodeOfWord > HANGUL_UNICODE_END
  )
    return [word];

  const size = unicodeOfWord - HANGUL_UNICODE_START;

  const onsetIndex = Math.floor(size / CONSONANTS_UNICODE);
  const nucleusIndex = Math.floor(
    (size - onsetIndex * CONSONANTS_UNICODE) / VOWELS_UNICODE
  );
  const syllableIndex = Math.floor(size % VOWELS_UNICODE);

  return [
    KOREAN_ONSET[onsetIndex],
    KOREAN_NUCLEUS[nucleusIndex],
    KOREAN_SYLLABLE[syllableIndex],
  ];
}

function mergeHangule(onset: string, nucleus: string): string {
  const nucleusUnicode = nucleus.charCodeAt(0);

  const onsetIndex = KOREAN_ONSET_CONNECTOR[onset];
  const nucleusIndex = nucleusUnicode - CONSONANTS_UNICODE_START;

  return String.fromCharCode(
    HANGUL_UNICODE_START +
      onsetIndex * CONSONANTS_UNICODE +
      nucleusIndex * VOWELS_UNICODE
  );
}

function parseHangule(word: string): string[] {
  const [onset, nucleus, syllable] = splitHangule(word);
  const firstHiragana = nucleus
    ? hiraganaTable[mergeHangule(onset, nucleus)]
    : hiraganaTable[onset];
  const secondHiragana = hiraganaTable[syllable] ?? "";
  return [firstHiragana, secondHiragana];
}

export default parseHangule;
