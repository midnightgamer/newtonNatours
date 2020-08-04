import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import booking from './booking';
import tours from './tours';

export default combineReducers({
   auth,
   profile,
   booking,
   tours,
   alert,
});
