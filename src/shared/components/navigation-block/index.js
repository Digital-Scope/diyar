import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import NavigationBlock from './navigation-block';
import './navigation-block.scss';

export default class NavigationBlockContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      activeIndex: null,
    };
  }

  render() {
    return (
      <NavigationBlock
        show={this.state.show}
        activeIndex={this.state.activeIndex}
        renderMobileBottomBlock={this.props.mobileBottomBlock}
        onEnter={() => this.setState({ show: true })}
        onLeave={() => this.setState({ show: false })}
        onChange={debounce(index => this.setState({ activeIndex: index }), 200)}
      >
        { this.props.children }
      </NavigationBlock>
    );
  }
}
