import React from 'react'
import CurrentMovie from '../components/CurrentMovie'
import FavFilm from '../components/FavFilm'
import Footer from '../components/Footer'

const Account = () => {
  return (
    <div className='text-white w-full'>
       <img
          className="w-full object-cover h-[400px]"
          src="https://images3.alphacoders.com/882/882548.jpg"
          alt=""
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[400px]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>Favorit saya</h1>
        </div>
        <FavFilm />
        <CurrentMovie/>
        <div className='sm:mt-20'></div>
        <Footer/>
    </div>
  )
}

export default Account