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
   let { locations } = mapBox.dataset;
   locations = JSON.parse(locations);
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
   settingsButton.addEventListener('click', async (evt) => {
      evt.preventDefault();
      document.querySelector('#save-data').innerHTML = 'Updating...';
      let form = new FormData();

      form.append('name',document.getElementById('name').value)
      form.append('email',document.getElementById('email').value)
      form.append('photo',document.getElementById('photo').files[0])

      await updateData(
         form
      , 'data');
      document.querySelector('#save-data').innerHTML = 'save settings';
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
