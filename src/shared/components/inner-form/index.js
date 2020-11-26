import React, { Component } from 'react';

class InnerForm extends Component {
  constructor() {
    super();
    this.state = {
      currentFocusedFieldNumber: 0,
      submitCount: 0,
      focusAfterSubmit: false,
      countryCallingCode: '',
    };

    this.setCountryCallingCode = (countryCallingCode) => {
      this.setState({
        countryCallingCode,
      });
    };

    this.onFieldChange = (fieldIndex, isMouseClicked, domElementToFocus) => {
      if (fieldIndex >= 0 && fieldIndex < this.props.children.length) {
        this.setState({
          currentFocusedFieldNumber: fieldIndex,
        });
        if (domElementToFocus && isMouseClicked) {
          setTimeout(() => domElementToFocus.focus(), 0);
        } else if (domElementToFocus && !isMouseClicked) {
          setTimeout(
            () => domElementToFocus
              .closest('.form-field-group')
              .nextElementSibling.querySelector('input, textarea')
              .focus(),
            0,
          );
        }
      }
    };
  }

  componentDidMount() {
    if (typeof Element !== 'undefined' && !Element.prototype.closest) {
      // import the polyfill for closest
      require('mdn-polyfills/Element.prototype.closest');
    }
  }

  static getDerivedStateFromProps(props, state) {
    let firstFieldWithErrorsIndex = null;
    if (state.submitCount !== props.submitCount) {
      for (let i = 0; i < props.children.length; i += 1) {
        if (props.errors[props.children[i].props.name]) {
          firstFieldWithErrorsIndex = {
            currentFocusedFieldNumber: i,
            submitCount: state.submitCount + 1,
            focusAfterSubmit: true,
          };
          break;
        }
      }
    } else {
      firstFieldWithErrorsIndex = {
        focusAfterSubmit: false,
      };
    }
    return firstFieldWithErrorsIndex;
  }

  render() {
    const { children, allowEnterAfterField } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit} noValidate>
        {this.props.children.map((child, index) => React.cloneElement(child, {
          fieldIndex: index,
          focusedField: this.state.currentFocusedFieldNumber,
          onBlur: this.props.handleBlur,
          onChange: this.props.handleChange,
          values: this.props.values,
          error: this.props.errors[child.props.name],
          touched: this.props.touched[child.props.name],
          onDropdownChange: child.props.onDropdownChange,
          onFieldChange: this.onFieldChange,
          submitCount: this.props.submitCount,
          showEnterButton: (index !== children.length - 1) && allowEnterAfterField,
          focusAfterSubmit: this.state.focusAfterSubmit,
          setFieldValue: this.props.setFieldValue,
          setFieldTouched: this.props.setFieldTouched,
          setCountryCallingCode: this.countryCallingCode,
        }))}
        {this.props.submitButton({
          isSubmitting: this.props.isSubmitting, status: this.props.status,
        })}
      </form>
    );
  }
}

export default InnerForm;
