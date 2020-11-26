import React from 'react';

import Navigation from '../../../../../contentful/components/navigation';

import './desktop.scss';

export default ({ data }) => (
  <nav className="navigation">
    <Navigation
      data={data}
      className="navigation-list"
      itemClassName="navigation-list-item"
      itemLinkClassName="header-item"
      itemLinks={
        ({ links }) => (
          <div className="navigation-list-item-links">
            { links.map(link => <Navigation.ItemLink data={link} key={link.id} />) }
          </div>
        )
      }
    />
  </nav>
);
