import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Film from "./Film";

const CariFilm = () => {
  const api_key = "fa0f028c2f1c5b9c5ec2050550883dbf";
  const [queryParameters] = useSearchParams();
  const namafilm = queryParameters.get("namafilm");
  const fetchURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${namafilm}`;
  const [movies, setMovies] = useState([]);
  const idFilm = JSON.parse(localStorage.getItem("film"));
  //console.log(idFilm)
  //const type =
  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);
  //console.log(movies);

  return (
    <>
      {movies.length > 0 ? (
        <div className="mt-[20px]">
          <h1 className="text-white text-2xl text-center pb-[20px]">
            Hasil Pencarian : {namafilm}
          </h1>
          <div className="relative flex items-center group group-hover:block">
            <div className="pl-14 pb-6 w-full h-full overflow-x-scroll whitespace-normal scroll-smooth scrollbar-hide relative">
              {movies?.map((item, id) => (
                <Film key={id} item={item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-white text-2xl text-center ">
            Hasil Pencarian : tidak ditemukan
          </h1>
          <div className="h-[230px]">

          </div>
        </>
      )}
    </>
  );
};

export default CariFilm;
