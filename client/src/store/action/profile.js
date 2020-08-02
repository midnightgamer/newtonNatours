import { USER_LOADED } from './types';

export const loadUser = (user) => (dispatch) => {
   dispatch({
      type: USER_LOADED,
      payload: user,
   });
};
