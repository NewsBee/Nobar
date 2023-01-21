import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Daftar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();
  const [pengguna, setPengguna] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("nama", JSON.stringify(pengguna));
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full object-cover h-screen"
          src="https://images3.alphacoders.com/882/882548.jpg"
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16 ">
              <h1 className="text-3xl font-bold">Daftar</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setPengguna(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="text"
                  placeholder="Username"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                />
                <div className="flex justify-between w-full">
                  <div className="h-[60px] w-[50%] border-red-600 border flex flex-col justify-center active:bg-gray-600/40">
                    <label className="labl w-full h-full">
                      <input type="radio" name="radioname" value="1 Bulan" />
                      <div>
                        <h1 className="text-red-600 text-xl font-bold cursor-pointer">
                          NOBAR
                        </h1>
                        <span className="harga">
                          <sup>Rp</sup>
                          40.000 <span className="bulan">/ Bulan</span>
                        </span>
                      </div>
                    </label>
                    {/* <h1 className="text-red-600 text-xl font-bold cursor-pointer">
                      NOBAR
                    </h1>
                    <span className="harga">
                      <sup>Rp</sup>
                      40.000 <span className="bulan">/ Bulan</span>
                    </span> */}
                  </div>
                  <div className="w-[50%] border-red-600 border ml-6 h-[60px] active:bg-gray-600/40">
                    <label className="labl w-full h-full">
                      <input type="radio" name="radioname" value="1 Tahun" />
                      <div>
                        <h1 className="text-red-600 text-xl font-bold cursor-pointer">
                          NOBAR
                        </h1>
                        <span className="harga">
                          <sup>Rp</sup>
                          299.000 <span className="thun">/ Tahun</span>
                        </span>
                      </div>
                    </label>
                    {/* <h1 className="text-red-600 text-xl font-bold cursor-pointer">
                      NOBAR
                    </h1>
                    <span className="harga">
                      <sup>Rp</sup>
                      299.000 <span className="bulan">/ Tahun</span>
                    </span> */}
                  </div>
                </div>
                <button className="bg-red-600 py-3 my-5 rounded font-bold">
                  Daftar
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="mr-2 cursor-pointer">
                    <input type="checkbox" /> Ingat saya
                  </p>
                  <p className="cursor-pointer">Butuh bantuan?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">Sudah mendaftar?</span>{" "}
                  <Link to="/login"> Silahkan Masuk </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Daftar;
