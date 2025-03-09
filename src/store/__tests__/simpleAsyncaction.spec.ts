// src/store/__tests__/simpleAsyncAction.spec.ts
import { describe, it, expect, vi } from "vitest";
import {
  simpleAsyncAction,
  SIMPLE_PENDING,
  SIMPLE_FULFILLED,
} from "./simpleAsyncAction";

describe("simpleAsyncAction", () => {
  it("dispatches SIMPLE_PENDING and SIMPLE_FULFILLED in order", async () => {
    // Creamos mocks para dispatch y getState
    const dispatch = vi.fn();
    const getState = vi.fn();
    // Extra argument (si el thunk no lo utiliza, puede ser {} o undefined)
    const extraArgument = {};

    // Ejecutamos el thunk directamente
    const thunkFn: any = simpleAsyncAction();
    const result = await thunkFn(dispatch, getState, extraArgument);

    // Comprobamos que dispatch se haya llamado en el orden correcto
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: SIMPLE_PENDING });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: SIMPLE_FULFILLED,
      payload: "done",
    });
    expect(result).toBe("done");
  });
});
