function set(object: Record<any, any>, path: string, value: unknown) {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  if (typeof object !== "object" || object === null) {
    return object;
  }

  const keys = path.split(".");
  let current = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current.hasOwnProperty(key) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;

  return object;
}

export default set;
