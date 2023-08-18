function merge(lhs: Record<any, any>, rhs: Record<any, any>) {
  const merged: Record<any, any> = {};

  for (const key in lhs) {
    if (Object.prototype.hasOwnProperty.call(lhs, key)) {
      merged[key] = lhs[key];
    }
  }

  for (const key in rhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, key)) {
      if (typeof rhs[key] === "object" && typeof merged[key] === "object") {
        merged[key] = merge(merged[key], rhs[key]);
      } else {
        merged[key] = rhs[key];
      }
    }
  }
}

export default merge;
