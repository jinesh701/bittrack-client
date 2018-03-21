import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import ContentCards from './content-cards';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div className="dashboard-protected-data">
          <ContentCards />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username
});

Dashboard.propTypes = {
  username: PropTypes.string
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
