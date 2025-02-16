// Definimos la interfaz Advert, que representa un anuncio existente en la aplicación.
export interface Advert {
  id: number;
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: string;
}

// Definimos la interfaz NewAdvert, que representa un anuncio que está en proceso de creación.
export interface NewAdvert {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: File | null;
}
