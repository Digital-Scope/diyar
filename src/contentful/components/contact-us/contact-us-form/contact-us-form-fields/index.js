import React from 'react';
import { withFormik } from 'formik';
import { translate } from 'react-i18next';
import countries from 'i18n-iso-countries';
import { withRouter } from 'react-router';
import { navigateTo } from 'gatsby-link';
import axios from 'axios';

import tracking from '../../../../../shared/tracking';
import { isArabicURL } from '../../../../../shared/helpers/misc';
import FormValidation, { getFormattedListOfCountries, getXMLBodyForContactUsForm } from '../../../../../shared/helpers/forms';
import FormSubmitButton from '../../../../../shared/components/form-submit-button';
import FormField from '../../../../../shared/components/form-field';
import InnerForm from '../../../../../shared/components/inner-form';
import { localizeLink } from '../../../../../shared/components/link';

import './contact-us-form-fields.scss';

const OuterForm = ({ t, ...props }) => (
  <InnerForm
    {...props}
    submitButton={buttonProps => (
      <FormSubmitButton text={t('contactUsForm').submitButtonText} {...buttonProps} />
    )}
  >
    <FormField
      label={t('contactUsForm').fields.firstName.label}
      type="text"
      name="firstName"
      key="firstName"
      placeholder={t('contactUsForm').fields.firstName.placeholder}
    />
    <FormField
      label={t('contactUsForm').fields.lastName.label}
      type="text"
      name="lastName"
      key="lastName"
      placeholder={t('contactUsForm').fields.lastName.placeholder}
    />
    <FormField
      label={t('contactUsForm').fields.email.label}
      type="email"
      name="email"
      key="email"
      placeholder={t('contactUsForm').fields.email.placeholder}
    />
    <FormField
      label={t('contactUsForm').fields.countryCode.label}
      type="dropdown"
      onDropdownChange={(value) => {
        props.setFieldValue('countryCallingCode', `+${value.value}`);
      }}
      name="countryCode"
      key="countryCode"
      placeholder={t('contactUsForm').fields.countryCode.placeholder}
      dropdownItems={props.values.countryInitialValues}
    />
    <FormField
      label={t('contactUsForm').fields.phone.label}
      type="tel"
      name="phone"
      key="phone"
      placeholder={t('contactUsForm').fields.phone.placeholder}
    />
    <FormField
      label={t('contactUsForm').fields.message.label}
      type="textarea"
      name="message"
      key="message"
      placeholder={t('contactUsForm').fields.message.placeholder}
    />
  </InnerForm>
);

const validateForm = (values, { t }) => {
  const errors = {};
  // validate firstname, lastname
  if (!FormValidation.validateStringExistance(values.firstName)) {
    errors.firstName = t('formValidation').required;
  }
  if (!FormValidation.validateStringExistance(values.lastName)) {
    errors.lastName = t('formValidation').required;
  }
  // validate email
  if (!FormValidation.validateStringExistance(values.email)) {
    errors.email = t('formValidation').required;
  } else if (!FormValidation.validateEmail(values.email)) {
    errors.email = t('formValidation').emailFormat;
  }
  // validate phone
  if (!FormValidation.validateStringExistance(values.phone)) {
    errors.phone = t('formValidation').required;
  } else if (!FormValidation.validatePhone(values.phone)) {
    errors.phone = t('formValidation').phoneFormat;
  }
  // validate message
  if (!FormValidation.validateStringExistance(values.message)) {
    errors.message = t('formValidation').required;
  }
  // validate countryCode
  if (!values.countryCode) {
    errors.countryCode = t('formValidation').required;
  }
  return errors;
};

// Wrap our form with the using withFormik HoC
export default withRouter(translate('labels')(
  withFormik({
    mapPropsToValues: props => ({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      message: '',
      countryCode: null,
      countryInitialValues: getFormattedListOfCountries(isArabicURL(props.location.pathname) ? 'ar' : 'en', countries),
      t: props.t,
    }),
    validate: validateForm,
    validateOnChange: false,
    validateOnBlur: true,
    handleSubmit: (values, { setSubmitting, setStatus, props }) => {
      // handle your submit
      setSubmitting(true);
      setStatus(null);

      tracking.events.formsubmission({ formname: 'contact-us' });
      tracking.events.conversion();

      if (!process.env.GATSBY_CRM_LEAD_URL) {
        console.warn('[ContactUsForm] no submission config set. Submission skipped.');

        setSubmitting(false);
        setStatus({ type: 'error', message: values.t('contactUsForm').formFailure });
        return;
      }

      axios.post(process.env.GATSBY_CRM_LEAD_URL, getXMLBodyForContactUsForm(values), {
        headers: {
          'Content-Type': 'text/xml',
          SOAPAction: '"JsonpAjaxService/IService1/CreateWebsiteLead"',
        },
      }).then((resp) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(resp.data, 'text/xml');
        if (!xml.getElementsByTagName('a:LEADNO').innerHTML && xml.getElementsByTagName('a:ERRORRESPONSE').innerHTML) {
          setSubmitting(false);
          setStatus({ type: 'error', message: values.t('contactUsForm').formFailure });
        } else if (props.successPage) {
          navigateTo(localizeLink(props.location, props.successPage.route));
        } else {
          setSubmitting(false);
          setStatus({ type: 'success', message: values.t('contactUsForm').formSuccess });
        }
      }).catch(() => {
        setSubmitting(false);
        setStatus({ type: 'error', message: values.t('contactUsForm').formFailure });
      });
    },
  })(OuterForm),
));
