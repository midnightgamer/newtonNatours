/*eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapBox';
import { updateData } from './updateSettings';

//DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutButton = document.querySelector('.nav__el-logout');
const settingsButton = document.querySelector('#save-data');
const passwordForm = document.querySelector('.form-user-password');

//Values

//Delegation
if (mapBox) {
   let { locations } = JSON.parse(mapBox.dataset);
   displayMap(locations);
}

if (loginForm) {
   loginForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
   });
}

if (logoutButton) {
   logoutButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      logout();
   });
}

if (settingsButton) {
   settingsButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      document.querySelector('.btn--save-password').value = 'Updating...';
      const email = document.getElementById('email').value;
      const name = document.getElementById('name').value;
      updateData({
         name,
         email
      }, 'data');
      document.querySelector('.btn--save-password').value = 'save settings';
   });
}

if (passwordForm) {
   passwordForm.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      document.querySelector('.btn--save-password').textContent = 'Updating...';
      const currentPassword = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      await updateData({
         currentPassword,
         password,
         passwordConfirm
      }, 'password');
      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
      document.querySelector('.btn--save-password').textContent = 'Save Password';
   });
}
