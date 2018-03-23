import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openMenu, closeMenu } from '../actions/nav';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export class HeaderBar extends React.Component {
  openMenu() {
    this.props.dispatch(openMenu());
  }

  closeMenu() {
    this.props.dispatch(closeMenu());
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
    this.props.dispatch(closeMenu());
  }

  render() {
    let defaultButtons;

    if (!this.props.loggedIn) {
      defaultButtons = (
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.closeMenu()}>Home</MenuItem>
          </Link>

          <Link to="/login" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.closeMenu()}>Login</MenuItem>
          </Link>

          <Link to="/register" style={{ textDecoration: 'none' }}>
            <MenuItem onClick={() => this.closeMenu()}>Register</MenuItem>
          </Link>
        </div>
      );
    } else {
      defaultButtons = (
        <MenuItem onClick={() => this.logOut()}>Log out</MenuItem>
      );
    }

    return (
      <div className="header-bar">
        <AppBar
          title="Bittrack"
          style={{ backgroundColor: '#673AB7', position: 'fixed', top: 0 }}
          titleStyle={{
            textAlign: 'center',
            fontWeight: 600
          }}
          iconStyleLeft={{ fill: 'black', color: 'black' }}
          onLeftIconButtonClick={() => this.openMenu()}
        />

        <Drawer
          open={this.props.open}
          docked={false}
          onRequestChange={() => this.closeMenu()}
        >
          {defaultButtons}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.nav.open,
  loggedIn: state.auth.currentUser !== null
});

HeaderBar.propTypes = {
  dispatch: PropTypes.func,
  loggedIn: PropTypes.bool,
  open: PropTypes.bool
};

export default connect(mapStateToProps)(HeaderBar);
