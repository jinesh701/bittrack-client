import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import './landing-page.css';
import bitcoinImg from '../img/bitcoin.svg';
import walletImg from '../img/wallet.svg';

const style = {
  margin: 12
};

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <div className="row-container">
        <div className="first-div">
          <img src={bitcoinImg} className="image-size" alt="bitcoin logo" />
          <p className="description">Keep a list of coins to watch</p>
        </div>
        <div className="second-div">
          <img src={walletImg} className="image-size" alt="a wallet" />
          <p className="description">Manage your cryptocurrency investments</p>
        </div>
        <div className="button">
          <Link to="/register">
            <RaisedButton label="Get started" style={style} />
          </Link>
        </div>
      </div>

      <div className="footer-container">
        <p className="contacts">Contact</p>
        <div className="icons">
          <div className="icon1">
            <a
              href="https://github.com/jinesh701"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon size="3x" icon={faGithub} />
            </a>
          </div>
          <div className="icon2">
            <a
              href="https://www.linkedin.com/in/jineshpatel1"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon size="3x" icon={faLinkedin} />
            </a>
          </div>
          <div className="icon3">
            <a href="mailto:jinesh701@gmail.com">
              <FontAwesomeIcon size="3x" icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

LandingPage.propTypes = {
  loggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(LandingPage);
