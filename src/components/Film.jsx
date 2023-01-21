import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Film = ({ item }) => {
  const { fetchFilm } = UserAuth();
    const [fav, setFav] = useState(false); 
    const [saved, setSaved] = useState(false)
    const navigate = useNavigate();
    const {user} = UserAuth();

    const idFilm = doc(db, 'users', `${user?.email}`);

    const simpanFilm = async () =>{
      if(user?.email){
        setFav(!fav);
        setSaved(true)
        await updateDoc(idFilm,{
          savedFilm : arrayUnion({
            id : item.id,
            title : item.title,
            img : item.backdrop_path
          })
        })
      }else{
        alert("Masuk/Daftar terlebih dahulu!")
      }
    }

    const pilihFilm = (e) => {
      e.preventDefault();
      localStorage.setItem("film", JSON.stringify(item?.id));
      setTimeout(() => {
        window.location.reload();
      }, 500);
      window.scroll({
        top: 0,
        behavior:'smooth'
    })
    //console.log(JSON.parse(localStorage.getItem("film")))
      //navigate(`?film=${item?.id}`);
      //console.log(item?.id);
    }


  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2" onClick={pilihFilm}>
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={simpanFilm}>
          {fav ? (
            <FaHeart className="absolute top-4 right-4 text-grey-300 z-1000" />
          ) : (
            <FaRegHeart className="absolute top-4 right-4 text-grey-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Film;
