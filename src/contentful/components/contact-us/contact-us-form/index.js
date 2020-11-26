import React from 'react';
import { translate } from 'react-i18next';
import classnames from 'classnames';

import Title from '../../../../shared/components/title';
import ContactUsFormContainer from './contact-us-form-container';
import './contact-us-form.scss';

const ContactUsForm = translate('labels')(({ data, className, t }) => {
  const { template } = data;

  return (
    <div className={classnames('contact-us-form-wrapper', className)}>
      { template === 'Contact us page' && (
        <Title text={t('pageTitles').contactUs}>
          <ContactUsFormContainer data={data} />
        </Title>
      )}
      { template !== 'Contact us page' && (
        <div>
          <ContactUsFormContainer data={data} />
        </div>
      )}
    </div>
  );
});

export const Section = props => (
  <section className="container contact-us-form-wrapper-section">
    <ContactUsForm {...props} />
  </section>
);

export default ContactUsForm;

export const contactUsFormFragment = graphql`
  fragment ContentfulComponentContactUsFormFragment on ContentfulComponentContactUsForm {
    displayTitle
    subtitle
    inquiryType
    template
    successPage {
      route
    }
  }
`;
