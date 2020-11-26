import React, { Component } from 'react';

import MobileNavigation from './navigation-mobile';
import './mobile.scss';

export default class ModileNavigationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemOpened: null,
      itemLinksOpened: null,
    };
  }

  render() {
    return (
      <MobileNavigation
        mainNavigation={this.props.mainNavigation}
        subNavigation={this.props.subNavigation}
        socialNetworks={this.props.socialNetworks}
        itemOpened={this.state.itemOpened}
        itemLinksOpened={this.state.itemLinksOpened}
        onOpenItemNavigation={item => this.setState({ itemOpened: item, itemLinksOpened: true })}
        onCloseItemNavigation={() => this.setState({ itemLinksOpened: false })}
      />
    );
  }
}
