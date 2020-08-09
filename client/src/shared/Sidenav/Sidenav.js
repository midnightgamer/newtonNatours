import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sidenav = ({ role }) => (
   <nav className="user-view__menu">
      <ul className="side-nav">
         <li>
            <NavLink to={'/me'}>
               <svg>
                  <use xlinkHref="/img/icons.svg#icon-settings" />
               </svg>
               Settings
            </NavLink>
         </li>
         <li>
            <NavLink to={'/my-bookings'}>
               <svg>
                  <use xlinkHref="/img/icons.svg#icon-briefcase" />
               </svg>
               My bookings
            </NavLink>
         </li>
         <li>
            <NavLink to={'/reviews'}>
               <svg>
                  <use xlinkHref="/img/icons.svg#icon-star" />
               </svg>
               My reviews
            </NavLink>
         </li>
      </ul>
      {role === 'admin' ? (
         <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
               <li>
                  <NavLink to={'/all-tours'}>
                     <svg>
                        <use xlinkHref="/img/icons.svg#icon-map" />
                     </svg>
                     Manage tours
                  </NavLink>
               </li>
               <li>
                  <NavLink to={'/all-users'}>
                     <svg>
                        <use xlinkHref="/img/icons.svg#icon-users" />
                     </svg>
                     Manage users
                  </NavLink>
               </li>
               <li>
                  <NavLink to={'/all-reviews'}>
                     <svg>
                        <use xlinkHref="/img/icons.svg#icon-star" />
                     </svg>
                     Manage reviews
                  </NavLink>
               </li>
            </ul>
         </div>
      ) : (
         ''
      )}
   </nav>
);
const mapStateToProps = (state) => ({
   role: state.profile.users.role,
});
export default connect(mapStateToProps)(Sidenav);
