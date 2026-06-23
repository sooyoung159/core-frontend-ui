export const deepCompare = <T extends Record<string, unknown>>(
  a: T,
  b: T,
): boolean => {
  return Object.entries(a).every(([key, value]) => {
    return value !== null && typeof value === 'object'
      ? deepCompare(value as T, b[key] as T)
      : value === b[key];
  });
};
