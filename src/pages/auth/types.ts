// Interfaz que define las credenciales de usuario para el login (email y contraseña)
export interface Credentials {
  email: string;
  password: string;
}

// Interfaz que define la estructura de la respuesta de login, que incluye el token de acceso
export interface Login {
  accessToken: string;
}
