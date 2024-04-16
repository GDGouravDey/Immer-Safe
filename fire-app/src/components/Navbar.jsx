import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { close, menu } from '../assets';
import immersafe from '../assets/immersafe.png';
import { toast , Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const [username, setUsername] = useState(''); // Track username
  const navigateTo = useNavigate();
  const location = useLocation();

  // Function to check if user is logged in based on cookie
  const checkLoggedIn = () => {
    const username = getCookie('username');
    setLoggedIn(!!username); // Set loggedIn to true if username cookie exists, false otherwise
    setUsername(username || ''); // Set username to the value of the cookie or an empty string
  };

  const signout = () => {
    toast.success('Logged Out Successfully!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
    });
  };

  useEffect(() => {
    checkLoggedIn(); // Check login status when component mounts
    // Send username to backend when component mounts
    sendUsernameToBackend();
  }, []);

  // Function to send the username cookie value to the backend
  const sendUsernameToBackend = () => {
    const username = getCookie('username');
    const email = getCookie('email');
    const phone_num = getCookie('phone_num');
    axios.post('https://immer-safe.onrender.com/backend-route', { username, email, phone_num })
      .then(response => {
        console.log('Username sent to backend successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending username to backend:', error);
      });
  };

  // Function to get cookie by name
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  };

  // Function to delete cookie by name
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  // Function to handle logout
  const handleLogout = () => {
    deleteCookie('username');
    deleteCookie('email');
    deleteCookie('phone_num');
    setLoggedIn(false);
    setUsername('');
    signout();
    if (location.pathname === "/notifications") {
      navigateTo("/");
    }
  };

  return (
    <nav className="w-full flex py-6 xl:py-8 justify-between items-center navbar">
      <p className="hidden" id="name">{username}</p>
      <img src={immersafe} alt="immersafe" className="w-[180px] xl:w-[200px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li className={`font-poppins font-normal cursor-pointer text-[18px] xl:text-[23px] text-white mr-10 xl:mr-12 ${location.pathname === "/" && "active"}`}>
          <Link to="/">Home</Link>
        </li>
        {loggedIn && (
          <>
            <li className={`font-poppins font-normal cursor-pointer text-[18px] xl:text-[23px] text-white mr-10 xl:mr-12 ${location.pathname === "/notifications" && "active"}`}>
              <Link to="/notifications">Notifications</Link>
            </li>
          </>
        )}
        <li className={`font-poppins font-normal cursor-pointer text-[18px] xl:text-[23px] text-white mr-10 xl:mr-12 ${location.pathname === "/tips" && "active"}`}>
          <Link to="/tips">Safety Tips</Link>
        </li>
        <li className={`font-poppins font-normal cursor-pointer text-[18px] xl:text-[23px] text-white mr-10 xl:mr-12 ${location.pathname === "/about" && "active"}`}>
          <Link to="/about">About Us</Link>
        </li>
        {loggedIn ? (
          <li className={`font-poppins font-normal cursor-pointer text-[18px] xl:text-[23px] text-white mr-10 xl:mr-12 ${location.pathname === "/logout" && "active"}`} onClick={handleLogout}><a>Logout</a></li>
        ) : (
          <li className={`font-poppins font-normal cursor-pointer text-[18px] xl:text-[23px] text-white mr-10 xl:mr-12 ${location.pathname === "/signin" && "active"}`}><Link to="/signin">Sign In</Link></li>
        )}
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
            } p-7 bg-black-gradient absolute top-[5.2rem] right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-50`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <li className={`font-poppins font-normal cursor-pointer text-[18px] text-white mr-10 mb-1.5 ${location.pathname === "/" && "active"}`}>
              <Link to="/">Home</Link>
            </li>
            {loggedIn && (
              <>
                <li className={`font-poppins font-normal cursor-pointer text-[18px] text-white mr-10 mb-1.5 ${location.pathname === "/notifications" && "active"}`}>
                  <Link to="/notifications">Notifications</Link>
                </li>
                {/* Add other navigation links */}
              </>
            )}
            <li className={`font-poppins font-normal cursor-pointer text-[18px] text-white mr-10 mb-1.5 ${location.pathname === "/tips" && "active"}`}>
              <Link to="/tips">Safety Tips</Link>
            </li>
            <li className={`font-poppins font-normal cursor-pointer text-[18px] text-white mr-10 mb-1.5 ${location.pathname === "/about" && "active"}`}>
              <Link to="/about">About Us</Link>
            </li>
            {loggedIn ? (
              <li className={`font-poppins font-normal cursor-pointer text-[18px] text-white mr-10 ${location.pathname === "/logout" && "active"}`} onClick={handleLogout}><a>Logout</a></li>
            ) : (
              <li className={`font-poppins font-normal cursor-pointer text-[18px] text-white mr-10 ${location.pathname === "/signin" && "active"}`}><Link to="/signin">Sign In</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
