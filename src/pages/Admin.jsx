import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Admin = () => {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([])


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
  console.log(user);

  return (
    <>
      <div className="h-screen w-full">
        <img
          className="w-full object-cover h-[400px] fixed"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5aecc44d-2a1f-4313-8399-98df20908b64/c79d7cea-0f2f-4b5c-9130-e3a74468be57/ID-id-20221114-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[400px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Admin Dashboard
          </h1>
          <div className="mt-2">
            <Link to={"/admin/tambah"}>
              <button className="border text-white border-gray-300 py-2 px-5 hover:opacity-50">
                Tambah Film
              </button>
            </Link>
            <Link to={"/admin/edit"}>
              <button className="border text-white border-gray-300 py-2 px-5 ml-4 hover:opacity-50">
                Edit Film
              </button>
            </Link>
          </div>
        </div>
        <div className="h-[400px]"></div>
        <div className="h-[300px]">
          <div className="flex items-center justify-center h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
