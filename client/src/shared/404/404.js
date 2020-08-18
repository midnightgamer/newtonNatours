import React, { useEffect } from 'react';
import './404.css';
import image404 from '../../assets/img/404.svg';

const NotFound = (props) => {
   const { msg } = props;
   useEffect(() => {
      document.title = `Page not found`;
   }, []);
   return (
      <div className={'container error-404'}>
         <img src={image404} alt={'Not Found'} />
         <h2 className="heading-secondary">{msg ? msg : 'Not Found'}</h2>
      </div>
   );
};

export default NotFound;
