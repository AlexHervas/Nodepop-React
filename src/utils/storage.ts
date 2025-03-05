type StorageKey = "auth"; // Usamos la clave "auth" para el token de acceso

// Objeto que gestiona el almacenamiento de datos en localStorage
const storage = {
  // Método para obtener un valor del almacenamiento
  get(key: StorageKey) {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }
    return value;
  },

  // Método para establecer un valor en el almacenamiento según 'persist'
  set(key: StorageKey, value: string) {
    localStorage.setItem(key, value);
  },

  // Método para eliminar un valor del almacenamiento
  remove(key: StorageKey) {
    localStorage.removeItem(key);
  },

  // Método para limpiar todo el almacenamiento
  clear() {
    localStorage.clear();
  },
};

export default storage;
