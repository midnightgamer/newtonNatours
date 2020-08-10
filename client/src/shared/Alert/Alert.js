import React from 'react';
import { connect } from 'react-redux';
import './Alert.css';

const Alert = ({ alert }) => {
   console.log(alert);
   if (alert !== null && alert.length > 0) {
      return (
         <div key={alert[0]} className={`alert alert--${alert[0].type}`}>
            {alert[0].msg ? alert[0].msg.toString() : 'Something went wrong'}
         </div>
      );
   } else {
      return '';
   }
};

const mapStateToProps = (state) => ({
   alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
