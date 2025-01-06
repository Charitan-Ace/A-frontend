export function base64EncodeUnicode(str) {
  try {
    return btoa(encodeURIComponent(str));
  }
  catch (e) {
    return str;
  }
}

export function base64DecodeUnicode(str) {
  try {
    return decodeURIComponent(atob(str));
  }
  catch (e) {
    return str;
  }
}