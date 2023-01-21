import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pengguna, setPengguna] = useState("");
  const [error, setError] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, Login } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("nama", JSON.stringify(pengguna));
    setError("");
    try {
      setLoading(true);
      await Login(email, password);
      if (email === "admin@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (eror) {
      console.log(eror);
      setIsAlert(true);
      setLoading(false);
      setTimeout(() => {
        setIsAlert(false);
      }, 3000);
      //email('');
      setError(eror.message);
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
              <h1 className="text-3xl font-bold">Masuk</h1>
              {isAlert ? (
                <p className="p-3 bg-red-600 my-2 transition ease-in-out delay-150">
                  {error}
                </p>
              ) : null}
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
                {loading ? (
                  <>
                    <button className="bg-red-600 py-3 my-5 rounded font-bold disabled relative">
                      <svg
                        aria-hidden="true"
                        className="absolute left-[26%] w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      Processing...
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-red-600 py-3 my-5 rounded font-bold">
                      Masuk
                    </button>
                  </>
                )}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="mr-2 cursor-pointer">
                    <input type="checkbox" /> Ingat saya
                  </p>
                  <p className="cursor-pointer">Butuh bantuan?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">Belum mendaftar?</span>{" "}
                  <Link to="/daftar"> Silahkan daftar </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
