/*eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapBox';

//DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutButton = document.querySelector('.nav__el-logout');
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
      console.log('clicked');
      logout();
   });
}
