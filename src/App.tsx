import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import RequireAuth from "./pages/auth/RequireAuth";
import Layout from "./components/layout/Layout";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";
import AdvertPage from "./pages/adverts/AdvertPage";

function App() {
  return (
    <Routes>
      {/* Ruta para la página de login, sin autenticación requerida */}
      <Route path="/login" element={<LoginPage />} />

      {/* Ruta para la página de anuncios (adverts). Está protegida por autenticación. */}
      <Route
        path="/adverts"
        element={
          <RequireAuth>
            {" "}
            {/* El componente RequireAuth asegura que el usuario esté logueado */}
            <Layout>
              {" "}
              {/* El layout común para las páginas de anuncios */}
              <Outlet /> {/* Aquí se renderizan las subrutas de anuncios */}
            </Layout>
          </RequireAuth>
        }
      >
        {/* Ruta principal de anuncios (adverts), se muestra el listado de anuncios */}
        <Route index element={<AdvertsPage />} />

        {/* Ruta para crear un nuevo anuncio */}
        <Route path="new" element={<NewAdvertPage />} />

        {/* Ruta para ver los detalles de un anuncio específico, usando el ID del anuncio */}
        <Route path=":advertId" element={<AdvertPage />} />
      </Route>

      {/* Ruta por defecto que redirige al usuario a la página de anuncios */}
      <Route path="/" element={<Navigate to="/adverts" />} />

      {/* Ruta para manejar la página 404, cuando no se encuentra la ruta solicitada */}
      <Route path="/404" element={<div>404 | Not Found</div>} />

      {/* Ruta comodín para redirigir cualquier ruta no definida a la página 404 */}
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
