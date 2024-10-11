export const encodeBase64 = (number: number | string) => {
  const base64 = Buffer.from(number.toString()).toString("base64");
  return base64.replace(/=+$/, "");
};

export const decodeBase64 = (base64: string) => {
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  return String(decoded);
};
