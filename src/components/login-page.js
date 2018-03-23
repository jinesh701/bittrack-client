import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './login-form';

export function LoginPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home">
      <LoginForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

LoginPage.propTypes = {
  loggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(LoginPage);
