let inDebounce;

function debounce(cb: Function, delay: number) {
  return function () {
    if (inDebounce) clearTimeout(inDebounce);
    inDebounce = setTimeout(() => cb(), delay);
  };
}

export default debounce;
