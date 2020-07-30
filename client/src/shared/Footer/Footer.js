import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logoGreen from '../../assets/img/logo-green.png';

const Footer = (props) => (
   <footer className="footer">
      <div className="footer__logo">
         <img src={logoGreen} alt="Natours logo" />
      </div>
      <ul className="footer__nav">
         <li>
            <Link to="/">About us</Link>
         </li>
         <li>
            <Link to="/">Download apps</Link>
         </li>
         <li>
            <Link to="/">Become Link guide</Link>
         </li>
         <li>
            <Link to="/">Careers</Link>
         </li>
         <li>
            <Link to="/">Contact</Link>
         </li>
      </ul>
      <p className="footer__copyright">
         &copy; by Jonas Schmedtmann. All rights reserved.
      </p>
   </footer>
);

export default Footer;
