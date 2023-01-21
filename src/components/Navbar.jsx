import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  //console.log(user.email);
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("nama");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const cariFilm = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/cari',
      search: `?namafilm=${search}`,
    });
    e.target.reset();
  }
  
  const kembali = (e) =>{
    e.preventDefault();
    localStorage.removeItem("film");
    localStorage.removeItem("nama");
    navigate({
      pathname: '/'
    })
    //window.location.reload();
  }

  // const [queryParameters] = useSearchParams()
  // console.log(window.location.pathname)
  // const namafilm = queryParameters.get("namafilm")

  return (
    <div className="flex items-center justify-between p-4 z-[100] absolute w-full">
      <Link to="/" onClick={kembali}>
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NOBAR
        </h1>
      </Link>

      {window.location.pathname === "/" || window.location.pathname === `/cari` ? (
        <form onSubmit={cariFilm}>
          <div className=" text-white items-center gap-2 text-xl relative hidden sm:flex">
            <label htmlFor="cariFilm"></label>
            <input
              type="text"
              id="cariFilm"
              className="text-sm text-black hidden sm:block w-[150px] md:w-[250px] md:h-[30px] h-[20px] rounded-2xl text-center p-2 border-red-600 shadow-xl shadow-black"
              placeholder="Cari film"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-4">
              <BiSearch className=" text-black" />
            </button>
          </div>
        </form>
      ) : null}

      {user?.email ? (
        <div>
          {user?.email === "admin@gmail.com" ? (
            <Link to="/admin">
              <button className="text-white pr-4">Admin</button>
            </Link>
          ) : (
            <Link to="/akun">
              <button className="text-white pr-4">Profile</button>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Keluar
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Masuk</button>
          </Link>
          <Link to="/daftar">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Daftar
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
