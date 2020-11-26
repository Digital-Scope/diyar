import React from 'react';

import ContentfulLink from '../link';

const Navigation = ({
  data,
  className,
  itemClassName,
  itemLinkClassName,
  itemLinks,
}) => (
  <ul className={className}>
    {
      data.navigationItems.map(item => (
        <li key={item.id} className={itemClassName}>
          <ContentfulLink data={item.link} className={itemLinkClassName} />
          { itemLinks && item.links && itemLinks({ item, links: item.links }) }
        </li>
      ))
    }
  </ul>
);

Navigation.ItemLink = ContentfulLink;

export const navigationFragment = graphql`
  fragment ContentfulComponentNavigationFragment on ContentfulComponentNavigation {
    navigationItems {
      id,
      links {
        ...ContentfulComponentLinkFragment
      },
      link {
        ...ContentfulComponentLinkFragment
      }
    }
  }
`;

export default Navigation;
