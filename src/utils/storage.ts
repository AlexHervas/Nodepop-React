type StorageKey = "auth";

const storage = {
  get(key: StorageKey) {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  },

  set(key: StorageKey, value: string, persist: boolean) {
    if (persist) {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  },

  remove(key: StorageKey) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  },
};

export default storage;