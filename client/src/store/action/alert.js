import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (type, msg, timeout = 3000) => (dispatch) => {
   dispatch({
      type: SET_ALERT,
      payload: {
         type,
         msg,
      },
   });
   setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
   /*setTimeout(() => {
      const el = document.querySelector('.alert');
      if (el) {
         el.parentElement.removeChild(el);
      }
      return dispatch({
         type: REMOVE_ALERT,
      });
   }, 2500);*/
};
