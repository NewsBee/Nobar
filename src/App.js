import { Route, Routes } from "react-router-dom";
import AdminProtect from "./components/AdminProtect";
import CariFilm from "./components/CariFilm";
import DefaultAdmin from "./components/DefaultAdmin";
import DefaultMain from "./components/DefaultMain";
import LoginProtect from "./components/LoginProtect";
import Navbar from "./components/Navbar";
import Protect from "./components/Protect";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Daftar from "./pages/Daftar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
          <Route index element={<DefaultMain/>} />
          <Route path="/cari" element={<CariFilm/>} />
          </Route>
          <Route
            path="/login"
            element={
              <LoginProtect>
                {" "}
                <Login />{" "}
              </LoginProtect>
            }
          />
          <Route
            path="/daftar"
            element={
              <LoginProtect>
                {" "}
                <Daftar />{" "}
              </LoginProtect>
            }
          />
          <Route
            path="/akun"
            element={
              <Protect>
                <Account />
              </Protect>
            }
          />
          <Route
            path="/admin"
            element={
              <Protect>
                <AdminProtect>
                  <Admin />
                </AdminProtect>
              </Protect>
            }
          >
            <Route index element={<DefaultAdmin/>} />
            <Route path="/admin/tambah" element={<h1>Tambah data</h1>} />
            <Route path="/admin/edit" element={<h1>Edit data</h1>} />
          </Route>
          <Route path="*" element={<h1 className="text-white">NOT FOUND</h1>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
