import React, { useState } from 'react';
import './Account.css';
import { updateUser } from '../../store/action/profile';
import { connect } from 'react-redux';

const Account = (props) => {
   const { updateUser, user } = props;
   const [name, setName] = useState(user.name);
   const [email, setEmail] = useState(user.email);
   const [photo, setPhoto] = useState(null);
   const onFileChange = (event) => {
      // Update the state
      setPhoto(event.target.files[0]);
   };
   const updateSettings = (e, type) => {
      e.preventDefault();
      // Create an object of formData
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', photo);
      console.log('exe');
      updateUser(formData, type);
   };

   /*if (userEmail && userName) {
      setName(userName);
      setEmail(userEmail);
      console.log(userEmail,userEmail);
   }*/
   return (
      <main className="main">
         <div className="user-view">
            <nav className="user-view__menu">
               <ul className="side-nav">
                  <li className="side-nav--active">
                     <a href="#">
                        <svg>
                           <use xlinkHref="/img/icons.svg#icon-settings" />
                        </svg>
                        Settings
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <svg>
                           <use xlinkHref="/img/icons.svg#icon-briefcase" />
                        </svg>
                        My bookings
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <svg>
                           <use xlinkHref="/img/icons.svg#icon-star" />
                        </svg>
                        My reviews
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <svg>
                           <use xlinkHref="/img/icons.svg#icon-credit-card" />
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
                              <use xlinkHref="/img/icons.svg#icon-map" />
                           </svg>
                           Manage tours
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <svg>
                              <use xlinkHref="/img/icons.svg#icon-users" />
                           </svg>
                           Manage users
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <svg>
                              <use xlinkHref="/img/icons.svg#icon-star" />
                           </svg>
                           Manage reviews
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <svg>
                              <use xlinkHref="/img/icons.svg#icon-briefcase" />
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
                           value={name}
                           onChange={(e) => setName(e.target.value)}
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
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required="required"
                        />
                     </div>
                     <div className="form__group form__photo-upload">
                        <img
                           className="form__user-photo"
                           src={`${process.env.REACT_APP_API_ROUTE}/img/users/${user.photo}`}
                           alt="User "
                        />
                        <input
                           className="form__upload"
                           type="file"
                           accept="image/*"
                           id="photo"
                           onChange={(e) => onFileChange(e)}
                           name="photo"
                        />
                        <label htmlFor="photo">Choose new photo</label>
                     </div>
                     <div className="form__group right">
                        <button
                           onClick={(e) => updateSettings(e, 'data')}
                           className="btn btn--small btn--green"
                        >
                           Save settings
                        </button>
                     </div>
                  </form>
               </div>
               <div className="line">&nbsp;</div>
               <div className="user-view__form-container">
                  <h2 className="heading-secondary ma-bt-md">
                     Password change
                  </h2>
                  <form className="form form-user-settings">
                     <div className="form__group">
                        <label
                           className="form__label"
                           htmlFor="password-current"
                        >
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
                        <label
                           className="form__label"
                           htmlFor="password-confirm"
                        >
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
};
const mapStateToPro = (state) => ({
   user: state.profile.users,
});
export default connect(mapStateToPro, { updateUser })(Account);
