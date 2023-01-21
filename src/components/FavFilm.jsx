import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const FavFilm = () => {
    const [movies, setMovies] = useState([])
    const {user} = UserAuth();


    const slideLeft = () =>{
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
      }
      const slideRight = () =>{
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
      }

      useEffect(()=>{
        onSnapshot(doc(db, 'users', `${user?.email}`),(doc) =>{
            setMovies(doc.data()?.savedFilm)
        })
      }, [user?.email])

      const filmRef = doc(db, 'users', `${user?.email}`);
      const deleteShow = async (passedID) => {
        try{
            const res = movies.filter((item) => item.id !== passedID)
            await updateDoc(filmRef, {
                savedFilm : res,
            })
        }catch (error){
            console.log(error)
        }
      }
    //   console.log(user?.email)

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">FAVORIT</h2>
      <div className="relative flex items-center group">
      <MdChevronLeft
          onClick={slideLeft}
          className='bg-white text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id={'slider'}
          className='w-full h-full'
        >
          {movies?.map((item, id) => (
            <div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <p onClick={()=> deleteShow(item.id)} className="absolute text-grey-300 top-4 right-4"><AiOutlineClose /></p>
              </div>
            </div>
          ))}
          
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white text-black rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
          size={40}
        />
      </div>
    </>
  );
};

export default FavFilm;
