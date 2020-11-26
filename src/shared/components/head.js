import React from 'react';
import Helmet from 'react-helmet';

import Store from '../../shared/store';

const Head = ({ context, data }) => (
  <Store>{ ({ state }) => (
    <Helmet
      title={data.displayTitle}
      htmlAttributes={{
        lang: context.locale || 'en',
        dir: context.locale === 'ar' ? 'rtl' : 'ltr',
        class: state.navigation.mobileOpen ? 'no-scroll' : '',
      }}
    >
      <meta name="description" content={(data.description && typeof data.description === 'object') ? data.description.description : data.description} />
    </Helmet>
  )}</Store>
);


export default Head;
