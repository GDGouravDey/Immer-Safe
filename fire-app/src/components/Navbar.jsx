import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { close, menu } from '../assets';
import fireguard from '../assets/fireguard.png';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={fireguard} alt="fireguard" className="w-[180px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li className="font-poppins font-normal cursor-pointer text-[18px] text-white mr-10"><Link to="/">Home</Link></li>
        <li className="font-poppins font-normal cursor-pointer text-[18px] text-white mr-10"><Link to="/notifications">Notifications</Link></li>
        <li className="font-poppins font-normal cursor-pointer text-[18px] text-white mr-10"><Link to="/tips">Safety Tips</Link></li>
        <li className="font-poppins font-normal cursor-pointer text-[18px] text-white mr-10"><Link to="/about">About Us</Link></li>
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${!toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <li className="font-poppins font-normal cursor-pointer text-[18px] text-white mr-10"><Link to="/">Home</Link></li>
            <li className="font-poppins font-normal cursor-pointer text-[18px] text-white mr-10"><Link to="/notifications">Notifications</Link></li>
            <li className="font-poppins font-normal cursor-pointer text-[18px] text-white mr-10"><Link to="/tips">Safety Tips</Link></li>
            <li className="font-poppins font-normal cursor-pointer text-[18px] text-white mr-10"><Link to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;