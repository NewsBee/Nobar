import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import Film from './Film';

const Row = ({ title, fetchURL, rowId }) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
          setMovies(response.data.results);
        })
      }, [fetchURL]);


    const slideLeft = () =>{
      var slider = document.getElementById('slider' + rowId);
      slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = () =>{
      var slider = document.getElementById('slider' + rowId);
      slider.scrollLeft = slider.scrollLeft + 500;
    }

    //console.log(movies)
  return (
    <>
    <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
    <div className='relative flex items-center group group-hover:block'>
      <MdChevronLeft onClick={slideLeft} className='bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-0' size={40} />
        <div className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative' id={'slider' + rowId}>
            {movies?.map((item, id)=>(
              <Film key={id} item={item} />
            ))};
        </div>
      <MdChevronRight onClick={slideRight} className='bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0' size={40} />
    </div>
    </>
  );
};

export default Row