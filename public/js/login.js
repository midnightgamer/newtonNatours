/*eslint-disable*/
import { showAlert } from './alert';
import axios from 'axios';

export const login = async (email, password) => {
   try {
      const result = await axios({
         method: 'POST',
         url: 'http://localhost:3000/api/v1/auth/login',
         data: {
            email,
            password
         }
      });
      if (result.data.status === 'success') {
         showAlert('success', 'Login successful');
         location.assign('/');
      }

   } catch (e) {
      showAlert('error', e.response.data.message);
   }
};

export const logout = async () => {
   try {
      const res = await axios({
         method: 'GET',
         url: 'http://localhost:3000/api/v1/auth/logout'
      });
      if (res.data.status === 'success') location.reload(true);
   } catch (e) {
      showAlert('error', e.response.data.message);
   }
};
