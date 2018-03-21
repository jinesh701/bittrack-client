import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let defaultButtons;

    const buttonStyle = {
      backgroundColor: 'transparent',
      color: 'white'
    };

    if (!this.props.loggedIn) {
      defaultButtons = (
        <div>
          <Link to="/">
            <FlatButton label="Home" style={buttonStyle} />
          </Link>
          <Link to="/login">
            <FlatButton label="Log in" style={buttonStyle} />
          </Link>
          <Link to="/register">
            <FlatButton label="Register" style={buttonStyle} />
          </Link>
        </div>
      );
    } else {
      defaultButtons = (
        <FlatButton label="Log out" onClick={() => this.logOut()} />
      );
    }

    return (
      <div className="header-bar">
        <AppBar
          showMenuIconButton={false}
          title="Bittrack"
          iconElementRight={defaultButtons}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

HeaderBar.propTypes = {
  dispatch: PropTypes.func,
  loggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(HeaderBar);
