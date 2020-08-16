import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logoGreen from '../../assets/img/logo-green.png';

const Footer = (props) => (
   <footer className="footer">
      <div className="footer__logo">
         <img src={logoGreen} alt="Natours logo" />
      </div>
      <p className="footer__copyright">
         &copy; by Natours. All rights reserved.
      </p>
   </footer>
);

export default Footer;
