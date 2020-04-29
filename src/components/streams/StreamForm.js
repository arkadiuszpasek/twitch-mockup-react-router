import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  onSubmit = (formValues) => {
    const { onSubmit } = this.props;
    onSubmit(formValues);
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }

    return null;
  }

  renderInput = ({ input, label, meta }) => {
    // const { onChange, value } = formProps.input;
    // return <input onChange={onChange} value={value} />;
    const classNameError = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={classNameError}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
        <Field
          name="title"
          component={this.renderInput}
          label="Title: "
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Description: "
        />
        <button type="submit" className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
