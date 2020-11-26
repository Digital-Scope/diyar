import React from 'react';
import classnames from 'classnames';

import ContentfulLink from '../../../../../contentful/components/link';
import Icon from '../../../../../shared/components/icon';
import arrowIcon from '../../../../../shared/components/icon/arrow.icon';
import SocialNetworks from '../../../../../contentful/components/social-networks';
import Navigation from '../../../../../contentful/components/navigation';

import './mobile.scss';

export default ({
  mainNavigation,
  subNavigation,
  socialNetworks,
  itemOpened,
  itemLinksOpened,
  onOpenItemNavigation,
  onCloseItemNavigation,
}) => (
  <nav className={classnames(
    'navigation-mobile',
    { 'item-opened': itemLinksOpened },
  )}
  >
    {/* Main Navigation */}
    <div className="navigation-mobile-main">
      <div className="navigation-mobile-list-wrapper container">
        <Navigation
          data={mainNavigation}
          className="navigation-mobile-list"
          itemClassName="navigation-mobile-item"
          itemLinkClassName="navigation-mobile-title"
          itemLinks={
            ({ item }) => (
              <button
                className="navigation-mobile-item-links-button"
                onClick={() => onOpenItemNavigation(item)}
              >
                <Icon id={arrowIcon.id} className="navigation-mobile-arrow-icon" />
              </button>
            )
          }
        />
      </div>
      <div className="navigation-mobile-item-links-wrapper">
        <div className="navigation-mobile-item-links container">
          {
            itemOpened &&
              mainNavigation.navigationItems.filter(item => item.id === itemOpened.id).map(item => [
                <button
                  key={`button-${item.id}`}
                  className="navigation-mobile-item-links-close"
                  onClick={onCloseItemNavigation}
                >
                  <Icon id={arrowIcon.id} className="navigation-mobile-arrow-icon" />
                  <span className="navigation-mobile-title">{item.link.linkText}</span>
                </button>,
                <div key={item.id} className="navigation-mobile-item-links-list">
                  {
                    item.links.map(link => (
                      <Navigation.ItemLink
                        key={link.id}
                        data={link}
                        className="navigation-mobile-subtitle"
                      />
                    ))
                  }
                </div>,
              ])
          }
        </div>
      </div>
    </div>
    {/* Subnavigation */}
    <ul className="navigation-mobile-sub container">
      {
        subNavigation.navigationItems.map(item => (
          <li key={item.id} className="navigation-mobile-sub-item">
            <ContentfulLink data={item.link} />
          </li>
        ))
      }
    </ul>
    {/* Social networks */}
    <div className="container">
      <SocialNetworks data={socialNetworks.urls} theme="light" />
    </div>
  </nav>
);
