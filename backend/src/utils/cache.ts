// basic in-memory cache utility

const cache = new Map();

// get data for cache
export function getCache(key: string) {
  return cache.get(key);
}

// set data to cache
export function setCache(key: string, value: unknown) {
  cache.set(key, value);
}
