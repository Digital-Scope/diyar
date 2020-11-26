import React from 'react';
import GatsbyLink from 'gatsby-link';
// WARNING: We assume gatsby is using react-router
import { withRouter } from 'react-router';

import { isArabicURL } from '../../helpers/misc';

const Link = ({ location, className }) => {
  const isHome = location.pathname === '/' || location.pathname === '/ar' || location.pathname === '/ar/';
  let to;

  if (isHome) {
    to = location.pathname.startsWith('/ar') ? '/' : '/ar';
  } else {
    // Remove trailing slashes
    to = location.pathname.replace(/\/$/, '');
    to = to.startsWith('/ar/') ? to.replace('/ar', '') : to.replace('/', '/ar/');
  }

  return (
    <GatsbyLink to={to} className={className}>
      { isArabicURL(to) ? 'عربى' : 'English' }
    </GatsbyLink>
  );
};

export default withRouter(Link);
