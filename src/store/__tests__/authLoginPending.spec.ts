import { authLoginPending } from "../actions";

describe("Synchronous Actions", () => {
  it("should create an action for auth login pending", () => {
    const expectedAction = {
      type: "auth/login/pending",
    };
    expect(authLoginPending()).toEqual(expectedAction);
  });
});