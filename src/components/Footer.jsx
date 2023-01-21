import React from "react";
import {BsFacebook} from 'react-icons/bs';
import {AiFillTwitterCircle,AiOutlineWhatsApp} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="h-[300px] sm:py-7">
      <div className="h-full w-full text-center text-white">
        <h1 className="text-red-600 text-4xl sm:text-7xl">NOBAR</h1>
        <p className="w-[80%] text-center mx-auto text-2sm">
          Nobar adalah Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Autem, omnis sed repellat quos vero in veritatis quas est nostrum?
          Quos et perferendis dolores commodi excepturi esse, distinctio
          mollitia amet doloribus! Lorem ipsum dolor sit amet
        </p>
        <div className="w-full text-white mt-8 sm:mt-[60px] flex justify-center pb-6">
        <BsFacebook className="" size={45} />
        <AiFillTwitterCircle size={50}/>
        <AiOutlineWhatsApp size={50} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
