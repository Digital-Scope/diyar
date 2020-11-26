import React, { PureComponent } from 'react';

const StoreContext = React.createContext();

export default StoreContext.Consumer;

export class StoreProvider extends PureComponent {
  constructor() {
    super();

    this.state = {
      navigation: { mobileOpen: false },
    };

    // Actions
    this.toggleMobileNavigation = (value) => {
      this.setState({
        navigation: {
          ...this.state.navigation,
          mobileOpen: typeof value !== 'undefined' ? value : !this.state.navigation.mobileOpen,
        },
      });
    };
  }

  render() {
    return (
      <StoreContext.Provider value={{
        state: this.state,
        actions: {
          toggleMobileNavigation: this.toggleMobileNavigation,
        },
      }}
      >
        { this.props.children }
      </StoreContext.Provider>
    );
  }
}
