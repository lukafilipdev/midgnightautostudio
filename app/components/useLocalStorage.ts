"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tiny client-only store backed by `localStorage` and a global `storage` event
 * listener. Using `useSyncExternalStore` avoids the `set-state-in-effect`
 * anti-pattern when we need to read a value that only exists on the client.
 *
 * It also emits/listens for a same-tab event so components update when another
 * component on the same page writes the key (browsers do not fire the native
 * `storage` event for same-tab mutations).
 */

const sameTabEvent = (key: string) => `mas:ls:${key}`;

function subscribe(key: string) {
  return (onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const cb = () => onStoreChange();
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) onStoreChange();
    };
    window.addEventListener(sameTabEvent(key), cb);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(sameTabEvent(key), cb);
      window.removeEventListener("storage", onStorage);
    };
  };
}

export function useLocalStorageString<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T,
): [T, (next: T) => void] {
  const getSnapshot = () => {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return (allowed as readonly string[]).includes(raw ?? "")
        ? (raw as T)
        : fallback;
    } catch {
      return fallback;
    }
  };
  const getServerSnapshot = () => fallback;

  const value = useSyncExternalStore(
    subscribe(key),
    getSnapshot,
    getServerSnapshot,
  );

  const setValue = useCallback(
    (next: T) => {
      try {
        window.localStorage.setItem(key, next);
        window.dispatchEvent(new Event(sameTabEvent(key)));
      } catch {
        /* noop */
      }
    },
    [key],
  );

  return [value, setValue];
}

export function useLocalStorageJSON<T>(
  key: string,
  fallback: T,
): [T, (next: T) => void] {
  const getSnapshot = (): string => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem(key) ?? "";
    } catch {
      return "";
    }
  };
  const getServerSnapshot = () => "";

  const raw = useSyncExternalStore(
    subscribe(key),
    getSnapshot,
    getServerSnapshot,
  );

  let value: T;
  try {
    value = raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    value = fallback;
  }

  const setValue = useCallback(
    (next: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new Event(sameTabEvent(key)));
      } catch {
        /* noop */
      }
    },
    [key],
  );

  return [value, setValue];
}
