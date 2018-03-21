import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, focus } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';

import './login-form.css';

const buttonStyle = {
  fontSize: 10,
  height: 20,
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
        <div>
          <Field
            name="username"
            component={TextField}
            hintText="username"
            floatingLabelText="username"
            id="username"
            validate={[required, nonEmpty]}
          />
        </div>
        <div>
          <Field
            component={TextField}
            hintText="password"
            floatingLabelText="password"
            type="password"
            name="password"
            id="password"
            validate={[required, nonEmpty]}
          />
        </div>
        <RaisedButton
          type="submit"
          label="Log in"
          disabled={this.props.pristine || this.props.submitting}
          style={buttonStyle}
          labelStyle={buttonStyle}
        />
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
