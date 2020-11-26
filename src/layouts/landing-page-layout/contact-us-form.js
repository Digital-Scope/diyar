import React from 'react';
import { translate } from 'react-i18next';

import ContactUsForm from '../../contentful/components/contact-us/contact-us-form';

const ContactUsFormLandingPage = ({ t }) => (
  <ContactUsForm
    data={{
      displayTitle: t('contactUsForm').displayTitle,
      subtitle: t('contactUsForm').subtitle,
      successPage: { route: '/contact-us/success' },
    }}
  />
);

export default translate('labels')(ContactUsFormLandingPage);
