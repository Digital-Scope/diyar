import React, { Component } from 'react';

const IsDeviceTouchContext = React.createContext(false);

export default IsDeviceTouchContext.Consumer;

export class IsDeviceTouchProvider extends Component {
  constructor() {
    super();

    this.state = {
      isDeviceTouch: false,
    };

    this.onTouch = this.onTouch.bind(this);
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('touchstart', this.onTouch, { once: true });
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this.onTouch);
  }

  onTouch() {
    this.setState({ isDeviceTouch: true });
  }

  render() {
    return (
      <IsDeviceTouchContext.Provider value={this.state.isDeviceTouch}>
        { this.props.children }
      </IsDeviceTouchContext.Provider>
    );
  }
}
