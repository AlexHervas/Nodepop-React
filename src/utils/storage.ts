type StorageKey = "auth"; // Usamos la clave "auth" para el token de acceso

// Objeto que gestiona el almacenamiento de datos en localStorage y sessionStorage
const storage = {
  // Método para obtener un valor del almacenamiento, primero intenta en localStorage, luego en sessionStorage
  get(key: StorageKey) {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  },

  // Método para establecer un valor en el almacenamiento (localStorage o sessionStorage) según 'persist'
  set(key: StorageKey, value: string, persist: boolean) {
    // Si 'persist' es true, guarda el valor en localStorage (persistente)
    if (persist) {
      localStorage.setItem(key, value);
    } else {
      // Si 'persist' es false, guarda el valor en sessionStorage (solo por la duración de la sesión)
      sessionStorage.setItem(key, value);
    }
  },

  // Método para eliminar un valor del almacenamiento
  remove(key: StorageKey) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },

  // Método para limpiar todo el almacenamiento (localStorage y sessionStorage)
  clear() {
    localStorage.clear();
    sessionStorage.clear();
  },
};

export default storage;
