import { describe, it, expect } from "vitest";
import { adverts } from "../reducers";
import { advertsLoadedFulfilled } from "../actions";

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

describe("Adverts reducer", () => {
  it("should handle adverts/loaded/fulfilled", () => {
    // Estado inicial simulado
    const initialState: AdvertsState = { data: null, loaded: false, tags: [] };

    // Array simulado de anuncios
    const fakeAdverts: Advert[] = [
      {
        id: "1",
        name: "Test Advert 1",
        sale: true,
        price: 100,
        tags: ["tag1", "tag2"],
        photo: "http://example.com/photo1.jpg",
      },
      {
        id: "2",
        name: "Test Advert 2",
        sale: false,
        price: 200,
        tags: ["tag3"],
        photo: "http://example.com/photo2.jpg",
      },
    ];

    // Se crea la acción con los anuncios y se indica que se han cargado (loaded: true)
    const action = advertsLoadedFulfilled(fakeAdverts, true);

    // Se invoca el reducer con el estado inicial y la acción
    const newState = adverts(initialState, action);

    // Se comprueba que el estado se actualice correctamente
    expect(newState.data).toEqual(fakeAdverts);
    expect(newState.loaded).toBe(true);
    // Se conserva el array de tags actual (vacío en este caso)
    expect(newState.tags).toEqual([]);
  });
});
