import { useSyncExternalStore } from "react";

let clientNow: number | null = null;

const subscribe = () => () => {};
const getClientSnapshot = () => (clientNow ??= Date.now());

// Server and hydration use the build-time value so markup matches; after
// hydration it switches to the visitor's real clock so the static site
// never shows a stale upcoming/past split.
export function useNow(buildTime: number): number {
  return useSyncExternalStore(subscribe, getClientSnapshot, () => buildTime);
}
