export const memoize = (fn: Function): Function => {
  const cache: {
    [p: string]: any;
  } = {};
  return (...args: any[]) => {
    const KEY = JSON.stringify(args);

    if (cache[KEY] !== undefined) {
      return cache[KEY];
    }

    cache[KEY] = fn(...args);

    return cache[KEY];
  };
};
