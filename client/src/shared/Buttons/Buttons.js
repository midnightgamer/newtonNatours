import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Buttons = (props) => {
   let buttons = (
      <Link
         {...props}
         to={`${props.to}`}
         className={`btn btn--green btn--small ${
            props.type === 'danger' ? 'btn--red' : ''
         }`}
         onClick={props.onClick}
      >
         <div className={props.isLoading ? 'spinner' : ''}>
            <div className="double-bounce1" />
            <div className="double-bounce2" />
         </div>

         {props.children}
      </Link>
   );

   if (props.type === 'text') {
      buttons = (
         <Link to={`${props.to}`} className="btn-line" onClick={props.onClick}>
            {props.children}
         </Link>
      );
   }
   return buttons;
};

export default Buttons;
