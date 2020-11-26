import React from 'react';
import { translate } from 'react-i18next';

import Cta from '../../contentful/components/cta';

export default translate('labels')(({ t }) => (
  <Cta
    className="landing-page-layout-mobile-cta"
    data={{
      link: {
        linkText: t('landingPage').cta,
        internalLink: {
          route: '/contact-us',
        },
      },
    }}
    arrow={false}
  />
));
