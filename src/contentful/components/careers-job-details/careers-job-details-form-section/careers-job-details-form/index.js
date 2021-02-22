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
const nodemailer = require('nodemailer');
const emailTemplate = `
<body>
    <p>A new job application has been submitted in the website:</p>
    <br>
    <p><strong>Name:</strong> {{name}}</p>
    <p><strong>Email Address:</strong> {{email}}</p>
    <p><strong>Phone Number:</strong> {{phone}}</p>
    <p><strong>Cover Letter:</strong></p>
    <p>{{coverLetter}}</p>
</body>
`;
function sendMail(data) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // true for 465, false for other ports,
    connectionTimeout: 5000,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  // const transporter = nodemailer.createTransport({
  //   host: 'mail.diyar.bh',
  //   port: 25,
  //   secure: true, // true for 465, false for other ports,
  //   connectionTimeout: 5000,
  //   auth: {
  //     user: 'career@diyar.bh',
  //     pass: 'Diyar@123',
  //   },
  // });

  const emailBody =
    emailTemplate
      .replace(/{{name}}/g, data.name)
      .replace(/{{email}}/g, data.email)
      .replace(/{{phone}}/g, data.phone)
      .replace(/{{coverLetter}}/g, data.coverLetter);


  const mailOptions = {
    from: '"Diyar" <noreply@diyar.bh>',
    to: 'career@diyar.bh',
    subject: 'Job Application (Diyar Website)',
    html: emailBody,
  };
  
  if (data.cv && data.cv.filename && data.cv.content) {
    mailOptions.attachments = [
      {
        filename: data.cv.filename,
        content: data.cv.content,
        contentType: data.cv.contentType,
        encoding: 'binary',
      },
    ];
  }
 
  // send mail with defined transport object
  return transporter.sendMail(mailOptions,function(err,response){
    if(err){
      console.log(err);
    }
  });
}
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
      
      tracking.events.formsubmission({ formname: 'careers' });
      const data = generateFormdData(values);
console.log(data);
    const ENV_ORIGINS = process.env.CORS_ALLOWED_ORIGINS || '';
    const ALLOWED_ORIGINS = ENV_ORIGINS.split('|').map(origin => `https://${origin.toLowerCase()}`);
    const origin = '*';
    let responseHeaders = {};

    if (ALLOWED_ORIGINS.includes(origin)) {
      responseHeaders = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      };
    }

    try {
      const info = sendMail(data);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error while sending email', error);
    }
      /*
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
        });*/
    },
  })(OuterForm),
);
