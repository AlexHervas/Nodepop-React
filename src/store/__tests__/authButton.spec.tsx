import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { describe, it, expect, vi } from "vitest";
import AuthButton from "../../pages/auth/AuthButton";
import { authLogout } from "../../store/actions";

// Creamos un reducer dummy que simplemente devuelve el estado inicial
const dummyReducer = (state = { auth: true }, _action: any) => state;

// Creamos un store real con el reducer dummy
const store = createStore(dummyReducer);
// Espiamos el dispatch para verificar que se llame la acción
store.dispatch = vi.fn();

describe("AuthButton Component (without configureMockStore)", () => {
  it("dispatches authLogout action when logout is confirmed", async () => {
    render(
      <Provider store={store}>
        <AuthButton />
      </Provider>,
    );

    // Se espera que se muestre el botón "Logout" principal
    const allLogoutButtons = await screen.findAllByRole("button", {
      name: /logout/i,
    });
    // Suponemos que el primer botón es el principal y el segundo es el del ConfirmDialog
    // Primero, hacemos click en el botón principal para abrir el diálogo
    fireEvent.click(allLogoutButtons[0]);

    // Esperamos que se muestre el ConfirmDialog y volvemos a buscar todos los botones "Logout"
    const allButtonsAfterDialog = await screen.findAllByRole("button", {
      name: /logout/i,
    });
    // Seleccionamos el segundo botón (el de confirmación)
    const confirmButton = allButtonsAfterDialog[1];
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(authLogout());
    });
  });
});
