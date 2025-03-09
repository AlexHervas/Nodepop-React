import { describe, it, expect } from "vitest";
import { getAdvert } from "../selectors";

// Definición inline de tipos para el estado de adverts (según tu implementación)
type Advert = {
  id: string;
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: string;
};

type AdvertsState = {
  data: Advert[] | null;
  loaded: boolean;
  tags: string[];
};

type RootState = {
  auth: boolean;
  adverts: AdvertsState;
  ui: {
    pending: boolean;
    error: Error | null;
  };
};

describe("Selector: getAdvert", () => {
  it("should return the advert with the given id", () => {
    // Creamos un anuncio simulado
    const fakeAdvert: Advert = {
      id: "123",
      name: "Test Advert",
      sale: true,
      price: 100,
      tags: ["tag1", "tag2"],
      photo: "http://example.com/photo.jpg",
    };

    // Estado simulado del store
    const state: RootState = {
      auth: true,
      adverts: { data: [fakeAdvert], loaded: true, tags: [] },
      ui: { pending: false, error: null },
    };

    // Se llama al selector con el id "123"
    const selectedAdvert = getAdvert("123")(state);

    // Se espera que el selector retorne el anuncio simulado
    expect(selectedAdvert).toEqual(fakeAdvert);
  });
});
