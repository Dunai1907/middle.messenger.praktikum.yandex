function checkKeys(obj: any, keys: string[]) {
  const objKeys = Object.keys(obj);
  return keys.every((key: string) => objKeys.includes(key));
}

export default checkKeys;
