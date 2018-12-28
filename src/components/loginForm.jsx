import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: ''
    },
    errors: {}
  };
  // username = React.createRef();

  // componentDidMount() {
  //   this.username.current.focus(); // focus input username type
  // }

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  doSubmit = () => {
    // Call the server
    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
