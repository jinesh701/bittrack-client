import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, focus } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import registerUser from '../actions/users';
import { login } from '../actions/auth';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';

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
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <div>
          <Field
            component={TextField}
            hintText="username"
            floatingLabelText="username"
            name="username"
            validate={[required, nonEmpty, isTrimmed]}
          />
        </div>
        <div>
          <Field
            component={TextField}
            hintText="password"
            floatingLabelText="password"
            type="password"
            name="password"
            validate={[required, passwordLength, isTrimmed]}
          />
        </div>
        <div>
          <Field
            component={TextField}
            type="password"
            name="passwordConfirm"
            hintText="confirm password"
            floatingLabelText="confirm password"
            validate={[required, nonEmpty, matchesPassword]}
          />
        </div>
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Register
        </button>
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
