import React from 'react';
import TransitionIn from '../../../../shared/components/transition-in';
import SectionTitle from '../../../../shared/components/section-title';
import ContactUsFormFields from './contact-us-form-fields';

const ContactUsFormContainer = (props) => {
  const { data } = props;
  const {
    displayTitle,
    subtitle,
    inquiryType,
    successPage,
  } = data;

  return (
    <div className="contact-us-form-container">
      {(
        <TransitionIn>
          <div>
            {displayTitle && (<SectionTitle title={displayTitle} />)}
            {subtitle
              && (
                <TransitionIn>
                  <div className="contact-us-form-subtitle">{subtitle}</div>
                </TransitionIn>
              )}
          </div>
        </TransitionIn>
      )}
      <ContactUsFormFields
        inquiryType={inquiryType}
        successPage={successPage}
      />
    </div>
  );
};

export default ContactUsFormContainer;
