import React from 'react';

import Link from '../../../shared/components/link';

export default ({ data: { externalLink = '#', internalLink, linkText }, className }) => {
  if (internalLink) {
    return (
      <Link
        to={internalLink.route}
        className={className}
      >
        {linkText}
      </Link>
    );
  }
  return (
    <a href={externalLink} target="_blank" rel="noopener noreferrer" className={className}>{linkText}</a>
  );
};

export const linkFragment = graphql`
  fragment ContentfulComponentLinkFragment on ContentfulComponentLink {
    id
    linkText
    internalLink {
      route
    }
    externalLink
  }
`;
