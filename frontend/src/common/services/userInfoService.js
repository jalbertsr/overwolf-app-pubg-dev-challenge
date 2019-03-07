const isLocalStorageAvailable = () => window && window.localStorage;

const localStorageService = {
  getItem: key =>
    isLocalStorageAvailable
      ? window.localStorage.getItem(key)
      : console.error('LocalStorage not available'),
  setItem: (key, value) =>
    isLocalStorageAvailable
      ? window.localStorage.setItem(key, value)
      : console.error('LocalStorage not available'),
};

export default {
  setPUBGNickname: nickname =>
    localStorageService.setItem('nickname', nickname),
  getPUBGNickname: () => localStorageService.getItem('nickname'),
};
