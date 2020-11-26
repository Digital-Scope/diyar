import React, { Component } from 'react';

import Header from './header';

export default class HeaderContainer extends Component {
  constructor() {
    super();

    this.onAction = this.onAction.bind(this);

    this.state = {
      loadedOnce: false,
      sticky: false,
      previousWasSticky: false,
      searchOpen: false,
      previousWasSearchOpen: false,
    };

    this.setSticky = sticky => this.setState({
      sticky,
      previousWasSticky: this.state.sticky && !sticky,
      searchOpen: false,
      previousWasSearchOpen: sticky ? false : this.state.searchOpen,
    });
    this.setSearch = open => this.setState({
      searchOpen: open,
      previousWasSearchOpen: this.state.searchOpen && !open,
      previousWasSticky: false,
    });
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }

    if (!this.state.loadedOnce && window.scrollY > 0) {
      /* eslint react/no-did-mount-set-state:off */
      this.setSticky(true);
      this.setState({ loadedOnce: true });
    }
  }

  onAction(type) {
    switch (type) {
      case 'search':
        this.setSearch(!this.state.searchOpen);
        break;
      default:
        console.warn(`[Header] no action of type "${type}" found`);
    }
  }

  render() {
    return (
      <Header
        key="header"
        {...this.props}
        sticky={this.state.sticky}
        previousWasSticky={this.state.previousWasSticky}
        searchOpen={this.state.searchOpen}
        previousWasSearchOpen={this.state.previousWasSearchOpen}
        onAction={this.onAction}
        onWaypointEnter={() => this.setSticky(false)}
        onWaypointLeave={() => this.setSticky(true)}
      />
    );
  }
}
