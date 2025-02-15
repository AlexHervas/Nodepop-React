import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import RequireAuth from "./pages/auth/RequireAuth";
import Layout from "./components/layout/Layout";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Layout>
              <Outlet />
            </Layout>
          </RequireAuth>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
