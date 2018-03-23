import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, focus } from 'redux-form';
import { Link } from 'react-router-dom';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import registerUser from '../actions/users';
import { login } from '../actions/auth';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
import './registration-form.css';

const buttonStyle = {
  fontSize: 12,
  height: 40,
  margin: 5
};

const passwordLength = length({ min: 6, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password } = values;
    const user = {
      username,
      password
    };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <div>
          <Field
            component={TextField}
            hintText="Username"
            floatingLabelText="Username"
            name="username"
            validate={[required, nonEmpty, isTrimmed]}
            floatingLabelShrinkStyle={{ color: '#673ab7' }}
            underlineFocusStyle={{ borderColor: '#673ab7' }}
            style={{ float: 'left', marginLeft: 20 }}
          />
        </div>
        <div>
          <Field
            component={TextField}
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            name="password"
            validate={[required, passwordLength, isTrimmed]}
            floatingLabelShrinkStyle={{ color: '#673ab7' }}
            underlineFocusStyle={{ borderColor: '#673ab7' }}
            style={{ float: 'left', marginLeft: 20 }}
          />
        </div>
        <div className="confirm-password-div">
          <Field
            component={TextField}
            type="password"
            name="passwordConfirm"
            hintText="Confirm Password"
            floatingLabelText="Confirm Password"
            validate={[required, nonEmpty, matchesPassword]}
            floatingLabelShrinkStyle={{ color: '#673ab7' }}
            underlineFocusStyle={{ borderColor: '#673ab7' }}
            style={{ float: 'left', marginLeft: 20 }}
          />
        </div>
        <div className="register-button">
          <RaisedButton
            label="Register"
            type="submit"
            fullWidth={true}
            disabled={this.props.pristine || this.props.submitting}
            style={buttonStyle}
            labelStyle={buttonStyle}
          />
        </div>

        <div className="prev-registered">
          <span>Have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
