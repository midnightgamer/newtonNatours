import React from 'react';
import { connect } from 'react-redux';
import './Alert.css';

const Alert = ({ alert }) => {
   console.log(alert);
   return (
      alert !== null &&
      alert.length > 0 && (
         <div key={alert[0]} className={`alert alert--${alert[0].type}`}>
            {alert[0].msg.toString()}
         </div>
      )
   );
};

const mapStateToProps = (state) => ({
   alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
