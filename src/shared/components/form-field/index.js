import React, { Component } from 'react';
import classnames from 'classnames';
import Select, { components } from 'react-select';
import { translate } from 'react-i18next';

import Icon from '../../../shared/components/icon';
import dropdownTriangle from '../../../shared/components/icon/dropdown-triangle.icon';
import uploadIcon from '../../../shared/components/icon/up-arrow.icon';
import formOkArrow from '../../../shared/components/icon/form-ok-arrow.icon';
import formOkArrowMobile from '../../../shared/components/icon/form-ok-arrow-mobile.icon';

import './form-field.scss';

const DropdownIndicator = props => components.DropdownIndicator && (
  <components.DropdownIndicator {...props}>
    <Icon id={dropdownTriangle.id} />
  </components.DropdownIndicator>
);


class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileName: '',
    };
    this.domInputField = null;

    this.handleDropdownChange = (value) => {
      this.props.setFieldValue(this.props.name, value);
      if (this.props.onDropdownChange) {
        this.props.onDropdownChange(value);
      }
    };

    this.handleDropdownBlur = () => {
      this.props.setFieldTouched(this.props.name, true);
    };

    this.onKeyDown = (e) => {
      if (e.key === 'Enter' && this.props.type !== 'textarea') {
        e.preventDefault();
        e.stopPropagation();
        this.props.onFieldChange(this.props.fieldIndex + 1, false, this.domInputField);
      }
    };
  }

  componentDidUpdate() {
    if (this.props.focusedField === this.props.fieldIndex && this.props.focusAfterSubmit) {
      this.domInputField.focus();
    }
  }


  render() {
    const { t, label, type, values, setFieldValue, name, placeholder, error,
      touched, dropdownItems, focusedField, fieldIndex,
      showEnterButton, onFieldChange } = this.props;
    const value = values[name];
    const inputContainerClassNames = classnames({
      'form-field-group': true,
      'form-field-group-focused': (fieldIndex === focusedField),
      'form-field-group-error': touched && error,
    });
    const inputClassNames = classnames({
      'form-field-group-input': true,
      'form-field-group-input-text': type === 'text',
      'form-field-group-input-textarea': type === 'textarea',
      'form-field-group-input-file': type === 'file',
    });

    const fileUploadTextInput = classnames({
      'form-field-group-input-file-placeholder': !this.state.uploadedFileName,
      'form-field-group-input-file-selected': this.state.uploadedFileName,
    });
    return (
      <div
        className={inputContainerClassNames}
        onMouseDown={() => this.props.onFieldChange(fieldIndex, true, this.domInputField)}
      >
        <label htmlFor={name} className="form-field-group-label">
          {label}
        </label>
        {(type === 'text' || type === 'email') && (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            autoFocus={fieldIndex === 0}
            className={inputClassNames}
            placeholder={placeholder}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onKeyDown={this.onKeyDown}
            onFocus={() => this.props.onFieldChange(fieldIndex)}
            ref={(input) => { this.domInputField = input; }}
          />

        )}
        {type === 'tel' && (
          <div className="form-field-group-input-tel">
            {values.countryCallingCode && <span className="form-field-group-input form-field-group-input-tel-country-code">
              {values.countryCallingCode}
            </span>}
            <input
              type={type}
              name={name}
              id={name}
              value={value}
              autoFocus={fieldIndex === 0}
              className={inputClassNames}
              placeholder={placeholder}
              onBlur={this.props.onBlur}
              onChange={this.props.onChange}
              onKeyDown={this.onKeyDown}
              onFocus={() => this.props.onFieldChange(fieldIndex)}
              ref={(input) => { this.domInputField = input; }}
            />
          </div>
        )}
        {type === 'file' && ([
          <input
            type={type}
            name={name}
            id={name}
            autoFocus={fieldIndex === 0}
            className={inputClassNames}
            placeholder={placeholder}
            onBlur={this.props.onBlur}
            onKeyDown={this.onKeyDown}
            onFocus={() => this.props.onFieldChange(fieldIndex)}
            onChange={(e) => {
              this.setState({
                uploadedFileName: e.target.value.split('\\').pop(),
              });
              setFieldValue(name, e.currentTarget.files[0]);
            }}
            key="originalKey"
            ref={(input) => { this.domInputField = input; }}
          />,
          <div
            className="form-field-group-input form-field-group-input-text"
            key="fieldDouble"
            onMouseDown={(e) => {
              if (fieldIndex === focusedField) {
                this.domInputField.click();
              }
            }}
          >
            <span className={fileUploadTextInput}>
              {this.state.uploadedFileName || placeholder}
            </span>
            <Icon id={uploadIcon.id} />
          </div>,
        ])}
        {type === 'textarea' && (
          <textarea
            rows="5"
            name={name}
            id={name}
            value={value}
            autoFocus={fieldIndex === 0}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onFocus={() => this.props.onFieldChange(fieldIndex)}
            className={inputClassNames}
            placeholder={placeholder}
            ref={(input) => { this.domInputField = input; }}
            onKeyDown={this.onKeyDown}
          />
        )}
        {type === 'dropdown' &&
          <div className="form-field-group-select-wrapper" ref={(input) => { this.domInputField = input; }}>
            <Select
              options={dropdownItems}
              onChange={this.handleDropdownChange}
              onBlur={this.handleDropdownBlur}
              value={value}
              autoFocus={fieldIndex === 0}
              placeholder={placeholder}
              name={name}
              onFocus={() => this.props.onFieldChange(fieldIndex)}
              className="form-field-group-input form-field-group-input-select"
              classNamePrefix="form-field-group-input-select"
              components={{ DropdownIndicator }}
              onKeyDown={this.onKeyDown}
            />
          </div>
        }
        {touched && error && <div className="form-field-group-error">{error}</div>}
        {focusedField === fieldIndex
          && showEnterButton
          && (
            <div className="form-field-group-ok">
              <div
                className="form-field-group-ok-button"
                onMouseDown={(e) => {
                  onFieldChange(fieldIndex + 1, false, this.domInputField);
                  e.stopPropagation();
                }}
              >
                <span>{t.formControls.nextInputActionText}</span>
                <Icon id={formOkArrow.id} className="form-field-group-ok-button-icon" />
                <Icon id={formOkArrowMobile.id} className="form-field-group-ok-button-icon-mobile" />
              </div>
              {type !== 'textarea'
              && (
                <div className="form-field-group-ok-text">
                  {t.formControls.nextInputActionHelper}
                </div>
              )}
            </div>
          )}
      </div>
    );
  }
}

export default translate('labels')(FormField);
