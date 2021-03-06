import React from 'react';
import './header.css';
import { connect } from 'react-redux';
import logoWhite from '../../assets/img/logo-white.png';
import { logoutUser } from '../../store/action/auth';
import { filterTours } from '../../store/action/tours';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, user, logoutUser, tours, filterTours }) => {
   const onSearch = (e) => {
      const value = e.target.value;
      console.log(value);
      let suggestions = [];
      if (value.length > 0) {
         suggestions = tours.filter((e) => {
            if (e.name.toLowerCase().startsWith(value)) {
               return e;
            }
         });
         filterTours(suggestions);
      }
   };
   let authLinks = '';
   if (user) {
      const { name, photo } = user;
      authLinks = (
         <nav className="nav nav--user">
            {user.role === 'admin' ? (
               <Link to="tour/createTour" className="nav__el">
                  Create a Tour
               </Link>
            ) : null}
            <Link to="/" onClick={logoutUser} className="nav__el">
               Logout
            </Link>
            <Link to="/me" className="nav__el">
               <img
                  src={`/img/users/${photo}`}
                  alt="User"
                  className="nav__user-img"
               />
               <span>{name.split(' ')[0]}</span>
            </Link>
         </nav>
      );
   }
   const guestLinks = (
      <nav className="nav nav--user">
         <Link className="nav__el" to="/login">
            Log in
         </Link>
         <Link className="nav__el nav__el--cta" to="/signup">
            Sign up
         </Link>
      </nav>
   );
   return (
      <header className="header">
         <nav className="nav nav--tours">
            <Link to="/" className="nav__el">
               All tours
            </Link>
            <form className="nav__search">
               <button className="nav__search-btn">
                  <svg>
                     <use xlinkHref="/img/icons.svg#icon-search" />
                  </svg>
               </button>
               <input
                  type="text"
                  placeholder="Search tours"
                  className="nav__search-input"
                  onChange={(e) => onSearch(e)}
               />
            </form>
         </nav>
         <div className="header__logo">
            <Link to={'/'}>
               <img src={logoWhite} alt="Natours logo" />
            </Link>
         </div>
         {isAuthenticated ? authLinks : guestLinks}
      </header>
   );
};
const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   user: state.profile.users,
   tours: state.tours.tours,
});
export default connect(mapStateToProps, {
   logoutUser,
   filterTours,
})(Header);
