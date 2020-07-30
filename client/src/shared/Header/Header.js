import React from 'react';
import './header.css';
import userImage from '../../assets/img/users/user-1.jpg';
import logoWhite from '../../assets/img/logo-white.png';
import { Link } from 'react-router-dom';

const Header = (props) => {
   return (
      <header className="header">
         <nav className="nav nav--tours">
            <Link to="/" className="nav__el">
               All tours
            </Link>
            <form className="nav__search">
               <button className="nav__search-btn">
                  <svg>
                     <use xlinkHref="img/icons.svg#icon-search" />
                  </svg>
               </button>
               <input
                  type="text"
                  placeholder="Search tours"
                  className="nav__search-input"
               />
            </form>
         </nav>
         <div className="header__logo">
            <img src={logoWhite} alt="Natours logo" />
         </div>
         <nav className="nav nav--user">
            <Link to="/my-tours" className="nav__el">
               My bookings
            </Link>
            <Link to="/me" className="nav__el">
               <img src={userImage} alt="User" className="nav__user-img" />
               <span>Jonas</span>
            </Link>
            {/* <button class="nav__el">Log in</button>
        <button class="nav__el nav__el--cta">Sign up</button> */}
         </nav>
      </header>
   );
};

export default Header;
