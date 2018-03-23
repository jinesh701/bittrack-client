import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home">
      <RegistrationForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

RegistrationPage.propTypes = {
  loggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(RegistrationPage);
