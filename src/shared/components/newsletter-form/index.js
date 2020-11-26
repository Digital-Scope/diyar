import React from 'react';
import { translate } from 'react-i18next';
import { Field, withFormik } from 'formik';
import axios from 'axios';
import './newsletter-form.scss';
import Cta from '../../../contentful/components/cta';
import Icon from '../icon';
import checked from '../icon/checked.icon';
import FormValidation, { getXMLBodyNewsLetterForm } from '../../../shared/helpers/forms';
import FormSubmitButton from '../form-submit-button';

const InnerForm = ({
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  status,
  t,
}) => (<form
  className="newsletter-form"
  onSubmit={handleSubmit}
>
  {(!status || !status.isSubmitted) && (
    <React.Fragment>
      <div className="newsletter-form-title">{t('newsletterForm').title}</div>
      <div className="newsletter-form-field">
        <Field type="email" name="email" onChange={handleChange} onBlur={handleBlur} placeholder={t('newsletterForm').inputPlaceholder} />
        { touched.email && errors.email && <div className="form-field-group-error">{errors.email}</div>}
      </div>
      <div className="cta cta-primary">
        <FormSubmitButton text={t('contactUsForm').submitButtonText} isSubmitting={isSubmitting} />
      </div>
    </React.Fragment>)}
  {status && status.isSubmitted && (
    <div className="newsletter-form-title"><Icon id={checked.id} />{t('newsletterForm').successMsg}</div>
  )}
  <Cta data={{
    type: 'simple',
    link: {
      externalLink: t('newsletterForm').link,
      linkText: t('newsletterForm').checkNews,
    },
  }}
  />
</form>
);

const validateEmail = (values) => {
  const errors = {};
  if (!FormValidation.validateStringExistance(values.email) ||
      !FormValidation.validateEmail(values.email)) {
    errors.email = values.t('newsletterForm').errorMsg;
  }
  return errors;
};
export default translate('labels')(
  withFormik({
    mapPropsToValues: props => ({
      email: '',
      t: props.t,
    }),
    validate: validateEmail,
    handleSubmit: (values, { setSubmitting, setStatus, setFieldError }) => {
      setSubmitting(true);
      const { email } = values;
      const name = email.substring(0, email.lastIndexOf('@'));
      axios.post(process.env.GATSBY_CRM_LEAD_URL, getXMLBodyNewsLetterForm(values.email, name), {
        headers: {
          'Content-type': 'text/xml',
          SOAPAction: 'JsonpAjaxService/IService1/CreateNewsLetterLead',

        },
      }).then((resp) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(resp.data, 'text/xml');
        if (!xml.getElementsByTagName('a:LEADNO').innerHTML && xml.getElementsByTagName('a:ERRORRESPONSE').innerHTML) {
          setSubmitting(false);
          setFieldError('email', values.t('contactUsForm').formFailure);
        } else {
          setStatus({ isSubmitted: true });
        }
        setSubmitting(false);
      }).catch(() => {
        setFieldError('email', values.t('contactUsForm').formFailure);
        setSubmitting(false);
      });
    },
  })(InnerForm),
);

