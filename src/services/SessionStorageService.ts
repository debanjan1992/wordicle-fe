class SessionStorageService {
  static saveToSession(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static getFromSession(key: string) {
    const value = sessionStorage.getItem(key);
    if (value !== null && value !== "undefined") {
      return JSON.parse(value);
    }
    return null;
  }

  static deleteKey(key: string) {
    sessionStorage.removeItem(key);
  }

  static deleteAll() {
    sessionStorage.clear();
  }
}

export default SessionStorageService;
