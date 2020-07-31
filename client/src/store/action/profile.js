import { USER_LOADED, USER_DELETE } from './types';

export const loadUser = (user) => (dispatch) => {
   dispatch({
      type: USER_LOADED,
      payload: user,
   });
};
