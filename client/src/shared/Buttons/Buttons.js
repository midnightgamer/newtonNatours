import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Buttons = (props) => {
   let buttons = (
      <Link
         to={`${props.to}`}
         className="btn btn--green btn--small"
         onClick={props.onClick}
      >
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
