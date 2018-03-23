import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, focus } from 'redux-form';
import { Link } from 'react-router-dom';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';

import './login-form.css';

const buttonStyle = {
  fontSize: 12,
  height: 40,
  margin: 5
};

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {error}
        <div className="username-div">
          <Field
            name="username"
            component={TextField}
            hintText="Username"
            floatingLabelText="Username"
            id="username"
            validate={[required, nonEmpty]}
            floatingLabelShrinkStyle={{ color: '#673ab7' }}
            underlineFocusStyle={{ borderColor: '#673ab7' }}
            style={{ float: 'left', marginLeft: 20 }}
          />
        </div>
        <div className="password-div">
          <Field
            component={TextField}
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            name="password"
            id="password"
            validate={[required, nonEmpty]}
            floatingLabelShrinkStyle={{ color: '#673ab7' }}
            underlineFocusStyle={{ borderColor: '#673ab7' }}
            style={{ float: 'left', marginLeft: 20 }}
          />
        </div>
        <div className="login-button">
          <RaisedButton
            type="submit"
            label="Log in"
            fullWidth={true}
            disabled={this.props.pristine || this.props.submitting}
            style={buttonStyle}
            labelStyle={buttonStyle}
          />
        </div>

        <div className="not-registered">
          <span>Don't have an account? </span>
          <Link to="/register">Sign up</Link>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
