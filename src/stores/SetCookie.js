
import { defineStore } from 'pinia';

export const useSetCookieStore = defineStore("setCookie", () => {

  //執行涵式

  // 設定cookie 測試用
  const setCookie = (cookieName, cookieValue, expirationDays) => {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/`;
  };
  // setCookie("csrfToken", "testCsrfToken", 1); // 名稱，值，有效天數
  // setCookie("accessToken", "testAccessToken", 1); 
  // setCookie("refreshToken", "testRefreshToken", 1); 

  // 刪除 cookie
  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  // deleteCookie("csrfToken"); // 刪除名稱為"csrfToken" 的 cookie
  // deleteCookie("accessToken"); 
  // deleteCookie("refreshToken"); 

  //刪除全部cookie 
  const deletAll = () => {
    // deleteCookie("csrfToken"); // 刪除名稱為"csrfToken" 的 cookie
    // deleteCookie("accessToken"); 
    deleteCookie(TOKEN);
    deleteCookie(REFRESH_TOKE);
  }
  // 從 cookie 中取得指定名稱的值
  const getCookie = (cookieName) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  //返回資料
  return {
    deletAll,
    setCookie,
    getCookie,
    deleteCookie, // 確保這裡的名稱正確
  }
})