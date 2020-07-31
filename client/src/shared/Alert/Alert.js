import React from 'react';
import { connect } from 'react-redux';
import './Alert.css';

const Alert = ({ alert }) =>
   alert !== null &&
   alert.length > 0 &&
   alert.map((alert) => (
      <div className={`alert alert--${alert.type}`}> {alert.msg} </div>
   ));

const mapStateToProps = (state) => ({
   alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
