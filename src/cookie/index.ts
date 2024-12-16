export function setCookie(cookieName: string, cookieValue: any) {
  window.localStorage.setItem(cookieName, JSON.stringify(cookieValue));
  console.log('save', cookieName, 'into local storage successfully!');
}
export function getCookie(cookieName: string) {
  const result = window.localStorage.getItem(cookieName);
  return JSON.parse(result);
}
export function deleteCookie(cookieName: string) {
  window.localStorage.removeItem(cookieName);
  console.log('deleted', cookieName, 'from local storage');

  return true;
}
