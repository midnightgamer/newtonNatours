import React from 'react';
import image404 from '../../assets/img/404.svg';
const NotFound = (msg) => (
   <div>
      <img src={image404} alt={'Not Found'} />
      <h2>{'Not Found'}</h2>
   </div>
);

export default NotFound;
