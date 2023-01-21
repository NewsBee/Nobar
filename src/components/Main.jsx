import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import requests from "../Request";
import { UserAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const RootContext = createContext();

const Main = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const [isAlert, setIsAlert] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [isWelcome, setWelcome] = useState(false);
  const [fav, setFav] = useState(false);
  const [saved, setSaved] = useState(false);
  const [muncul, setMuncul] = useState(false);
  const [munculFilm, setMunculFilm] = useState(false);
  const [trail, setTrail] = useState(null);
  const [movie, setMovie] = useState({
    title: "Loading",
    backdrop_path: "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
  });
  const api_key = "fa0f028c2f1c5b9c5ec2050550883dbf";
  const [queryParameters] = useSearchParams();
  const namafilm = queryParameters.get("namafilm");
  const selectFilm = JSON.parse(localStorage.getItem("film"));
  const fetchURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${namafilm}&append_to_response=videos`;
  const selected = `https://api.themoviedb.org/3/movie/${selectFilm}?api_key=${api_key}&language=en-US`;
  const type = namafilm ? fetchURL : requests.reqPopular;
  //console.log(fetchURL)
  //const film = type !== requests.reqPopular ? movies[0] : movies[Math.floor(Math.random() * movies.length)];

  const idFilm = doc(db, "users", `${user?.email}`);
  const simpanFilm = async () => {
    if (user?.email) {
      setFav(true);
      setSaved(true);
      await updateDoc(idFilm, {
        savedFilm: arrayUnion({
          id: movie?.id,
          title: movie?.title,
          img: movie?.backdrop_path,
        }),
      });
      alert("Film telah ditambahkan!!");
    } else {
      alert("Masuk/Daftar terlebih dahulu!");
    }
  };

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const { data } = await axios.get(type);

    fetchMovie(selected);
    const { thb } = await axios.get(selected);
    console.log(thb.results);
    setMovies(data.results);
    setMovie(data.results[0]);
    //data.length > 0 ? setMovie(data[Math.floor(Math.random() * movie.length)]) : setMovie(data.results[0])
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(selected, {
      params: {
        append_to_response: "videos",
      },
    });
    const trailer = data.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    //console.log(data.videos.results.find(vid => vid?.name === "Official Trailer"))
    setTrail(trailer ? trailer : data.videos.results[0]);
    setMovie(data);
  };

  //fetchMovie(selectFilm)
  //console.log(movie)
  if (!movie) {
    setMovie(movies[0]);
  }

  useEffect(() => {
    fetchMovies();
    window.scroll({
      top: 0,
    });
    if(localStorage.getItem('nama')){
      setWelcome(true)
      setTimeout(() => {
        setWelcome(false);
      }, 3000);
    }
  }, [type]);
  //console.log(film);
  const notLogin = (e) => {
    e.preventDefault();
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  const potongString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const kluarFilm = () =>{
    setMunculFilm(false);
    if(cnt >= 5){
        updateDoc(idFilm,{
        currentFilm : arrayUnion({
          id : movie?.id,
          title : movie?.title,
          img : movie?.backdrop_path
        })
      })
    }
    setCnt(0)
  }

  const renderTrailer = () => {
    const tes = !movie?.id
      ? "6KkONLf_ZKU"
      : movie?.videos.results.find((vid) => vid.name === "Official Trailer");
    //console.log(tes)
  


    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/60">
          <div className="relative w-[80%] h-[80%] mt-[5%] mx-auto">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none text-white">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">{movie?.title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setMuncul(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    X
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto justify-center">
                <YouTube
                  videoId={tes?.key}
                  className="flex justify-center"
                  opts={{
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      cc_load_policy: 0,
                      fs: 1,
                      iv_load_policy: 0,
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setMuncul(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      // <YouTube
      // className="absolute"
      // videoId={tes?.key}
      // />
    );
  };

  const renderFilm = () => {
    // const tes = movie?.videos.results.find(vid => vid.name === 'Official Trailer')
    //console.log(tes)
    setInterval(() => setCnt(cnt + 1), 1000);
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/60">
          <div className="relative w-[80%] h-[80%] mt-[5%] mx-auto">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none text-white">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">{movie?.title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={kluarFilm}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    X
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto justify-center mx-auto max-w-[100%]">
                <iframe
                  className="w-[300px] h-[300px] sm:w-[500px] md:w-[640px] md:h-[380px] sm:h-[380px]"
                  src="https://drive.google.com/file/d/1k29nI6Ff0AZfaxtOO6-oW_wW9T0zq_ur/preview"
                  allow="autoplay"
                  allowFullScreen="allowfullscreen"
                ></iframe>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={kluarFilm}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  console.log(movie?.videos?.results);
  console.log(muncul);
  return (
    <div>
      <div className="w-full h-[550px] text-white">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          {muncul ? renderTrailer() : null}
          {munculFilm ? renderFilm() : null}
          {isAlert ? (
            <>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-[10%] left-[25%] justify-center w-[50%]"
                role="alert"
              >
                <strong className="font-bold">Anda belum login!</strong>
                <span className="block sm:inline">
                  Pastikan untuk login/daftar terlebih dahulu
                </span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </>
          ) : null}
          {isWelcome ? (          
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-[10%] left-[25%] justify-center w-[50%]"
            role="alert"
          >
            <p>SELAMAT DATANG  {localStorage.getItem('nama')}</p>
            <span class="absolute inset-y-0 right-0 flex items-center mr-4">
              <svg
                class="w-4 h-4 fill-current"
                role="button"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
          </div>):  null}

          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
            <div className="my-4">
              {user?.email ? (
                <>
                  <button
                    className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:opacity-50 hover:translate-x-1 transition-2s"
                    onClick={() => setMunculFilm(true)}
                  >
                    Mulai
                  </button>
                  <button
                    className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:opacity-50 hover:translate-x-1 transition-2s ml-[10px]"
                    onClick={() => setMuncul(true)}
                  >
                    Trailer
                  </button>
                  <button
                    className="border text-white border-gray-300 py-2 px-5 ml-4 hover:opacity-50"
                    onClick={simpanFilm}
                  >
                    Tonton nanti
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={notLogin}
                    className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
                  >
                    Mulai
                  </button>
                  <button
                    className="border text-white border-gray-300 py-2 px-5 ml-4 hover:opacity-50"
                    onClick={() => setMuncul(true)}
                  >
                    Tonton Trailer
                  </button>
                </>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              Mulai tayang pada: {movie?.release_date}
            </p>
            <p className="w-full text-gray-200 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
              {potongString(movie?.overview, 150)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
