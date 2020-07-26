import { showAlert } from './alert';
import axios from 'axios';

export const updateData = async (data,type) => {
   try {
      const url = type === 'password' ? 'http://localhost:3000/api/v1/auth/changePassword' : 'http://localhost:3000/api/v1/users/updateMe'
      const res = await axios({
         method: 'PATCH',
         url: url,
         data
      });
      console.log('res', res);
      if (res.data.status === 'success') {
         showAlert('success', `${type.toUpperCase()} updated`);
      }
   } catch (e) {
      console.log("run into error");
      console.log('error', e);
      showAlert('error', e.response.data.message);
   }
};
