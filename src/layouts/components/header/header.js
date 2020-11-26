import React from 'react';
import Waypoint from 'react-waypoint';
import classnames from 'classnames';

import Store from '../../../shared/store';
import Link from '../../../shared/components/link';
import Actions from './actions';
import NavigationDesktop from './navigation/desktop';
import NavigationMobile from './navigation/mobile';
import SearchBar from './search-bar';

import './header.scss';

const Header = ({
  data,
  blend,
  sticky,
  previousWasSticky,
  searchOpen,
  previousWasSearchOpen,
  ...props
}) => (
  <Store>{ ({ state }) => (
    <header className={classnames(
      'header-wrapper',
      {
        blend,
        sticky,
        'previous-sticky': previousWasSticky,
        'search-open': searchOpen,
        'previous-search-open': previousWasSearchOpen,
        'mobile-navigation-open': state.navigation.mobileOpen,
      },
    )}
    >
      <Waypoint
        key="waypoint"
        topOffset={blend ? '-90%' : '-20px'}
        onEnter={props.onWaypointEnter}
        onLeave={props.onWaypointLeave}
      />
      <div className="header">
        <div className="container">
          <SearchBar
            open={searchOpen}
            onClose={() => props.onAction('search')}
            searchPlaceholder={data.searchPlaceholder}
          />
          <div className="header-content">
            <Link to="/" className="header-image">
              {
                (blend && !sticky) && !state.navigation.mobileOpen && !searchOpen ?
                  <img src={data.logoWhite.file.url} alt={data.logoWhite.file.title} /> :
                  <img src={data.logoColor.file.url} alt={data.logoColor.file.title} />
              }
            </Link>
            <div className="header-menu">
              <NavigationDesktop data={data.navigation} />
              <Actions onAction={props.onAction} />
            </div>
          </div>
          <NavigationMobile
            open={state.navigation.mobileOpen}
            mainNavigation={data.navigation}
            subNavigation={data.subNavigation}
            socialNetworks={data.socialNetworks}
          />
        </div>
      </div>
    </header>
  )}</Store>
);

export const headerFragment = graphql`
  fragment ContentfulComponentHeaderFragment on ContentfulComponentHeader {
    logoColor {
      file {
        url
      }
    },
    logoWhite {
      file {
        url
      }
    },
    navigation {
      ...ContentfulComponentNavigationFragment
    }
    subNavigation {
      ...ContentfulComponentNavigationFragment
    }
    socialNetworks {
      urls {
        url
      }
    }
    searchPlaceholder
  }
`;

export default Header;
