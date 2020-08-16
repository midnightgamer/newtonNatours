import React, { useState } from 'react';
import './Account.css';
import { updateUser } from '../../store/action/profile';
import { connect } from 'react-redux';
import Sidenav from '../../shared/Sidenav/Sidenav';
import Buttons from '../../shared/Buttons/Buttons';

const Account = (props) => {
   const { updateUser, user, isLoading } = props;
   const [name, setName] = useState(user.name);
   const [email, setEmail] = useState(user.email);
   const [photo, setPhoto] = useState(null);
   const [currentPassword, setCurrentPassword] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');
   const formData = new FormData();

   const onFileChange = (event) => {
      // Update the state
      setPhoto(event.target.files[0]);
   };
   const updateSettings = async (e, type) => {
      e.preventDefault();
      // Create an object of formData
      if (type === 'password') {
         await updateUser(
            {
               currentPassword,
               password,
               passwordConfirm,
            },
            type
         );
      } else {
         formData.append('name', name);
         formData.append('email', email);
         formData.append('photo', photo);
         await updateUser(formData, type);
      }
   };
   return (
      <main className="main" id="account">
         <div className="user-view">
            <Sidenav />
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
                           onChange={(e) => {
                              setName(e.target.value);
                              formData.append('name', e.target.value);
                           }}
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
                           src={`/img/users/${user.photo}`}
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
                        <Buttons
                           onClick={(e) => updateSettings(e, 'data')}
                           isLoading={isLoading}
                        >
                           Save settings
                        </Buttons>
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
                           onChange={(e) => setCurrentPassword(e.target.value)}
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
                           onChange={(e) => setPassword(e.target.value)}
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
                           onChange={(e) => setPasswordConfirm(e.target.value)}
                           placeholder="••••••••"
                           required="required"
                           minLength="8"
                        />
                     </div>
                     <div className="form__group right">
                        <Buttons
                           isLoading={isLoading}
                           onClick={(e) => updateSettings(e, 'password')}
                        >
                           Save password
                        </Buttons>
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
   isLoading: state.auth.isLoading,
});
export default connect(mapStateToPro, { updateUser })(Account);
