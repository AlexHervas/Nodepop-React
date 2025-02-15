export interface Advert {
  id: number;
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: string;
}

export interface NewAdvert {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: File | null;
}
