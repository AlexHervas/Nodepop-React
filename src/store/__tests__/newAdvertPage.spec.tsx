import renderer from "react-test-renderer";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NewAdvertPage from "../../pages/adverts/NewAdvertPage";
import configureStore from "../../store";
import { createBrowserRouter } from "react-router-dom";

// Creamos un router y un store para el test.
// Asegúrate de que la estructura del estado coincide con la que espera tu store.
const router = createBrowserRouter([{ path: "*", element: <NewAdvertPage /> }]);
const initialState = {
  auth: false,
  adverts: { data: [], loaded: true, tags: ["tag1", "tag2"] },
  ui: { pending: false, error: null },
};
const store = configureStore(initialState, router);

describe("NewAdvertPage Snapshot", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <NewAdvertPage />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
