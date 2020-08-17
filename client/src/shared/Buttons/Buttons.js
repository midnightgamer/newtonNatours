import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Buttons = (props) => {
   const { onClick, type, isLoading, to, ...newProps } = props;
   let buttons = (
      <Link
         {...newProps}
         to={`${to}`}
         className={`btn btn--green btn--small ${
            type === 'danger' ? 'btn--red' : ''
         }`}
         onClick={onClick}
      >
         <div className={isLoading ? 'spinner' : ''}>
            <div className="double-bounce1" />
            <div className="double-bounce2" />
         </div>

         {props.children}
      </Link>
   );

   if (props.type === 'text') {
      buttons = (
         <Link to={`${to}`} className="btn-line" onClick={onClick}>
            {props.children}
         </Link>
      );
   }
   return buttons;
};

export default Buttons;
