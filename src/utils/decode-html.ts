import { decode } from "he";

export function deepDecode(obj: any): any {
  if (typeof obj === "string") {
    return decode(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(deepDecode);
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [key, deepDecode(val)])
    );
  }

  return obj;
}