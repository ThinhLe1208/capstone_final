import jwt_decode, { JwtPayload } from 'jwt-decode';
import { ACCESS_TOKEN, USER_LOGIN } from './constants';

class Storage {
  setStorageJson(name: string, data: any) {
    data = JSON.stringify(data);
    localStorage.setItem(name, data);
  }
  setStorage(name: string, data: any) {
    localStorage.setItem(name, data);
  }
  getStorageJson(name: string) {
    if (localStorage.getItem(name)) {
      const dataStore = localStorage.getItem(name);
      if (typeof dataStore == 'string') {
        const data = JSON.parse(dataStore);
        return data;
      }
      return undefined;
    }
    return; //undefined
  }
  getStore(name: string) {
    if (localStorage.getItem(name)) {
      const data = localStorage.getItem(name);
      return data;
    }
    return; //undefined
  }
  setCookieJson(name: string, value: any, days: number) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    value = JSON.stringify(value);
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
  getCookieJson(name: string) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
  }
  setCookie(name: string, value: any, days: number) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
  getCookie(name: string) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  eraseCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 000001 GMT;';
  }
  clearStorage(name: string) {
    localStorage.removeItem(name);
  }
  checkLogin() {
    let isLogin = true;
    const userLogin = this.getStore(USER_LOGIN);
    const accessToken = this.getStore(ACCESS_TOKEN);
    // Not log in yet
    if (!userLogin || !accessToken) {
      isLogin = false;
    }
    // Already log in but a token expired
    if (accessToken) {
      let decodedToken = jwt_decode<JwtPayload>(accessToken);
      let currentDate = new Date();
      // JWT exp is in seconds
      if ((decodedToken.exp as number) * 1000 < currentDate.getTime()) {
        isLogin = false;
        this.clearStorage(USER_LOGIN);
        this.clearStorage(ACCESS_TOKEN);
      }
    }
    return isLogin;
  }
}

const storage = new Storage();

export default storage;
