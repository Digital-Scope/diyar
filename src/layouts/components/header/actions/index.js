import React from 'react';

import Store from '../../../../shared/store';
import LanguageSwitcherLink from '../../../../shared/components/link/language-switcher';
import Icon from '../../../../shared/components/icon';
import searchIcon from '../../../../shared/components/icon/search.icon';
import navigationIcon from '../../../../shared/components/icon/navigation.icon';
import crossIcon from '../../../../shared/components/icon/cross.icon';

import './actions.scss';

export default ({ onAction }) => (
  <div className="header-actions">
    <div className="header-action language-switcher">
      <LanguageSwitcherLink className="header-item" />
    </div>
    <button
      className="header-action search-toggle"
      onClick={() => onAction('search')}
    >
      <Icon id={searchIcon.id} className="header-item" />
    </button>
    <Store>{ ({ actions }) => (
      <button
        className="header-action navigation-toggle"
        onClick={() => actions.toggleMobileNavigation()}
      >
        <Icon id={navigationIcon.id} className="header-item navigation-toggle-hamburger" />
        <Icon id={crossIcon.id} className="header-item navigation-toggle-close" />
      </button>

    )}</Store>
  </div>
);
