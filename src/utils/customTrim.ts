function trim(str: string, chars?: string) {
  if (chars === undefined) {
    chars = "\\s";
  } else {
    chars = chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const pattern = new RegExp("^[" + chars + "]+|[" + chars + "]+$", "g");
  return str.replace(pattern, "");
}

export default trim;
