import {createContext, useContext, useEffect, useState} from "react";
import {auth, db} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import { setDoc, doc } from "firebase/firestore";
import axios from "axios";

const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user, setUser] = useState({})
    const [film, setFilm] = useState([])

    function signUp(email, password){
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            savedFilm: [],
            currentFilm: [],
        })
      }

    async function fetchFilm(film){
        const selected = `https://api.themoviedb.org/3/movie/${film}?api_key=fa0f028c2f1c5b9c5ec2050550883dbf&language=en-US`
        const {data} = await axios.get(selected, {
            params : {
              append_to_response : "videos"
            }
          })
          console.log("Halo")
          setFilm(data);
    }

    async function getFilm(){
        return film;
    }


    function Login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return()=>{
            unsubscribe();
        };
    })

    return(
        <AuthContext.Provider value={{signUp,Login,logOut, user, fetchFilm, getFilm}} >
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext);
}