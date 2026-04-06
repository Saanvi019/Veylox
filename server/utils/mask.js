export const maskKey = (key) => {
  const visible = key.slice(-4);
  return "•".repeat(key.length - 4) + visible;
};