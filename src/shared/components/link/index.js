import React from 'react';
import GatsbyLink from 'gatsby-link';
// WARNING: We assume gatsby is using react-router
import { withRouter } from 'react-router';

import Store from '../../store';
import { isArabicURL } from '../../helpers/misc';

export const localizeLink = (location, link) => (
  isArabicURL(location.pathname) ? `/ar${link}` : link
);

export const LocalizeLink = withRouter(({ children, link, location }) => (
  children({ link: localizeLink(location, link) })
));

const Link = ({ children, to, location, ...props }) => (
  <Store>{ ({ actions }) => (
    <GatsbyLink
      to={localizeLink(location, to)}
      className={props.className}
      onClick={() => actions.toggleMobileNavigation(false)}
      activeClassName="active-link"
    >
      { children }
    </GatsbyLink>
  )}</Store>
);

export default withRouter(Link);
