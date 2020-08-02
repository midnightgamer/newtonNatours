import React from 'react';
import './Account.css';

const Account = (props) => (
   <main className="main">
      <div className="user-view">
         <nav className="user-view__menu">
            <ul className="side-nav">
               <li className="side-nav--active">
                  <a href="#">
                     <svg>
                        <use xlinkHref="../../assets/img/icons.svg#icon-settings"></use>
                     </svg>
                     Settings
                  </a>
               </li>
               <li>
                  <a href="#">
                     <svg>
                        <use xlinkHref="../../assets/img/icons.svg#icon-briefcase"></use>
                     </svg>
                     My bookings
                  </a>
               </li>
               <li>
                  <a href="#">
                     <svg>
                        <use xlinkHref="../../assets/img/icons.svg#icon-star"></use>
                     </svg>
                     My reviews
                  </a>
               </li>
               <li>
                  <a href="#">
                     <svg>
                        <use xlinkHref="../../assets/img/icons.svg#icon-credit-card"></use>
                     </svg>
                     Billing
                  </a>
               </li>
            </ul>
            <div className="admin-nav">
               <h5 className="admin-nav__heading">Admin</h5>
               <ul className="side-nav">
                  <li>
                     <a href="#">
                        <svg>
                           <use xlinkHref="../../assets/img/icons.svg#icon-map"></use>
                        </svg>
                        Manage tours
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <svg>
                           <use xlinkHref="../../assets/img/icons.svg#icon-users"></use>
                        </svg>
                        Manage users
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <svg>
                           <use xlinkHref="../../assets/img/icons.svg#icon-star"></use>
                        </svg>
                        Manage reviews
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <svg>
                           <use xlinkHref="../../assets/img/icons.svg#icon-briefcase"></use>
                        </svg>
                     </a>
                  </li>
               </ul>
            </div>
         </nav>
         <div className="user-view__content">
            <div className="user-view__form-container">
               <h2 className="heading-secondary ma-bt-md">
                  Your account settings
               </h2>
               <form className="form form-user-data">
                  <div className="form__group">
                     <label className="form__label" htmlFor="name">
                        Name
                     </label>
                     <input
                        className="form__input"
                        id="name"
                        type="text"
                        value="Jonas Schmedtmann"
                        required="required"
                     />
                  </div>
                  <div className="form__group ma-bt-md">
                     <label className="form__label" htmlFor="email">
                        Email address
                     </label>
                     <input
                        className="form__input"
                        id="email"
                        type="email"
                        value="admin@natours.io"
                        required="required"
                     />
                  </div>
                  <div className="form__group form__photo-upload">
                     <img
                        className="form__user-photo"
                        src="img/user.jpg"
                        alt="User"
                     />
                     <a className="btn-text" href="">
                        Choose new photo
                     </a>
                  </div>
                  <div className="form__group right">
                     <button className="btn btn--small btn--green">
                        Save settings
                     </button>
                  </div>
               </form>
            </div>
            <div className="line">&nbsp;</div>
            <div className="user-view__form-container">
               <h2 className="heading-secondary ma-bt-md">Password change</h2>
               <form className="form form-user-settings">
                  <div className="form__group">
                     <label className="form__label" htmlFor="password-current">
                        Current password
                     </label>
                     <input
                        className="form__input"
                        id="password-current"
                        type="password"
                        placeholder="••••••••"
                        required="required"
                        minLength="8"
                     />
                  </div>
                  <div className="form__group">
                     <label className="form__label" htmlFor="password">
                        New password
                     </label>
                     <input
                        className="form__input"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required="required"
                        minLength="8"
                     />
                  </div>
                  <div className="form__group ma-bt-lg">
                     <label className="form__label" htmlFor="password-confirm">
                        Confirm password
                     </label>
                     <input
                        className="form__input"
                        id="password-confirm"
                        type="password"
                        placeholder="••••••••"
                        required="required"
                        minLength="8"
                     />
                  </div>
                  <div className="form__group right">
                     <button className="btn btn--small btn--green">
                        Save password
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </main>
);

export default Account;
