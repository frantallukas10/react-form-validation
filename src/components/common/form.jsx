import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    // const result = Joi.validate(this.state.data, this.schema, {
    //   abortEarly: false
    // });
    // console.log(result);

    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;

    // we replace it for Joi validation
    // const errors = {};
    // const { data } = this.state;
    // // The trim() method removes whitespace from both sides of a string.
    // if (data.username.trim() === '')
    //   errors.username = 'Username is required.';

    // if (data.password.trim() === '')
    //   errors.password = 'Password is required.';

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  // validateProperty = input => {
  //   if (input.name === 'username') {
  //     if (input.value.trim() === '') return 'Username is required.';
  //     // ...
  //   }
  // };

  // better write like this
  validateProperty = ({ name, value }) => {
    // if (name === 'username') {
    //   if (value.trim() === '') return 'Username is required.';
    //   // ...
    // }
    // if (name === 'password') {
    //   if (value.trim() === '') return 'Password is required.';
    //   // ...
    // }
    // update
    // const obj = { username: value };
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  // handleSubmit = e => {
  // e.preventDefault(); // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
  // console.log('Submitted');
  // }

  handleSubmit = e => {
    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    // const username = document.getElementById('username').value;
    // const username = this.username.current.value;

    this.doSubmit();
  };

  // handleChange = e => {
  //   const data = { ...this.state.data };
  //   data[e.currentTarget.name] = e.currentTarget.value;
  //   this.setState({ data });
  // };

  // better write like this

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  doSubmit = () => {
    console.log('Submitted');
  };

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        value={data[name]}
        type={type}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
