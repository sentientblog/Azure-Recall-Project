import { useSyncExternalStore } from "react";

export type CardStatus = "got" | "review";
type Store = Record<string, CardStatus>;

const KEY = "azure-recall-progress";
let state: Store = {};
let loaded = false;
const listeners = new Set<() => void>();
const empty: Store = {};

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    state = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    state = {};
  }
}

export function setStatus(id: string, status: CardStatus) {
  load();
  state = { ...state, [id]: status };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
  listeners.forEach((l) => l());
}

export function resetProgress() {
  state = {};
  try {
    localStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((l) => l());
}

export function useProgress(): Store {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      load();
      return state;
    },
    () => empty,
  );
}
