import { StorageKind } from "@constants/index";

interface Props {
  key: string;
  kind: StorageKind;
}

function useWebStorage<T>({ key, kind }: Props) {
  const storage = kind === StorageKind.LOCAL ? localStorage : sessionStorage;

  function get(): T {
    return JSON.parse(storage.getItem(key) ?? "[]");
  }

  function set(item: T): void {
    storage.setItem(key, JSON.stringify(item));
  }

  return [get, set] as const;
}

export default useWebStorage;
