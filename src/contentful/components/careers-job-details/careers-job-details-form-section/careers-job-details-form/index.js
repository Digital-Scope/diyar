import React from 'react';
import { withFormik } from 'formik';
import { translate } from 'react-i18next';
import axios from 'axios';

import tracking from '../../../../../shared/tracking';
import FormSubmitButton from '../../../../../shared/components/form-submit-button';
import FormField from '../../../../../shared/components/form-field';
import FormValidation from '../../../../../shared/helpers/forms';
import InnerForm from '../../../../../shared/components/inner-form';

import './careers-job-details-form.scss';

const OuterForm = ({ t, ...props }) => (
  <InnerForm
    {...props}
    submitButton={buttonProps => (
      <FormSubmitButton text={t('careersForm').submitButtonText} {...buttonProps} />
    )}
  >
    <FormField
      label={t('careersForm').fields.name.label}
      type="text"
      name="name"
      key="name"
      placeholder={t('careersForm').fields.name.placeholder}
    />
    <FormField
      label={t('careersForm').fields.email.label}
      type="email"
      name="email"
      key="email"
      placeholder={t('careersForm').fields.email.placeholder}
    />
    <FormField
      label={t('careersForm').fields.coverLetter.label}
      type="textarea"
      name="coverLetter"
      key="coverLetter"
      placeholder={t('careersForm').fields.coverLetter.placeholder}
    />
    <FormField
      label={t('careersForm').fields.phone.label}
      type="tel"
      name="phone"
      key="phone"
      placeholder={t('careersForm').fields.phone.placeholder}
    />
    <FormField
      label={t('careersForm').fields.cv.label}
      type="file"
      name="cv"
      key="cv"
      placeholder={t('careersForm').fields.cv.placeholder}
    />
  </InnerForm>
);

const validateForm = (values, { t }) => {
  const errors = {};
  // validate name
  if (!FormValidation.validateStringExistance(values.name)) {
    errors.name = t('formValidation').required;
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
  // validate cover letter
  if (!FormValidation.validateStringExistance(values.coverLetter)) {
    errors.coverLetter = t('formValidation').required;
  }
  // validate cv file
  if (!FormValidation.validateFileExist(values.cv)) {
    errors.cv = t('formValidation').required;
  } else if (!FormValidation.validateFileSize(values.cv)) {
    errors.cv = t('formValidation').fileSize;
  } else if (!FormValidation.validateFileType(values.cv)) {
    errors.cv = t('formValidation').fileType;
  }

  return errors;
};
const generateFormdData = (values) => {
  const result = new FormData();
  Object.keys(values).forEach((key) => {
    if (key !== 't') {
      result.append(key, values[key]);
    }
  });
  return result;
};
export default translate('labels')(
  withFormik({
    mapPropsToValues: props => ({
      email: '',
      name: '',
      phone: '',
      coverLetter: '',
      cv: '',
      t: props.t,
    }),
    validate: validateForm,
    validateOnChange: true,
    validateOnBlur: false,
    handleSubmit: (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);
      setStatus(null);
      console.log("here");
      tracking.events.formsubmission({ formname: 'careers' });
      console.log(process.env.GATSBY_CAREERS_HANDLER_URL);
      if (!process.env.GATSBY_CAREERS_HANDLER_URL) {
        console.warn('[CareersForm] no submission config set. Submission skipped.');

        setSubmitting(false);
        setStatus({ type: 'error', message: values.t('careersForm').formFailure });
        return;
      }

      axios.post(process.env.GATSBY_CAREERS_HANDLER_URL, generateFormdData(values), {
        headers: { 'content-type': 'multipart/form-data' },
      })
        .then(() => {
          setSubmitting(false);
          setStatus({ type: 'success', message: values.t('careersForm').formSuccess });
        }).catch(() => {
          setSubmitting(false);
          setStatus({ type: 'error', message: values.t('careersForm').formFailure });
        });
    },
  })(OuterForm),
);
