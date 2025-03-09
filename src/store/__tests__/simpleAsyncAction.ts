// actions/simpleAsyncAction.ts
export const SIMPLE_PENDING = "simple/pending";
export const SIMPLE_FULFILLED = "simple/fulfilled";

export const simpleAsyncAction = () => {
  return async (dispatch: any) => {
    dispatch({ type: SIMPLE_PENDING });
    await new Promise((resolve) => setTimeout(resolve, 50)); // Simula retardo
    dispatch({ type: SIMPLE_FULFILLED, payload: "done" });
    return "done";
  };
};
