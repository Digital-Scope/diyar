import React, { Component } from 'react';
import Waypoint from 'react-waypoint';


const transitionFromStyles = (style, duration, delay) => Object.keys(style)
  .map(prop => `${prop} ${duration}ms ${delay}ms`)
  .join(', ');

class TransitionIn extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };

    this.onEnter = () => this.setState({ show: true });
  }

  getStyles() {
    const {
      initialStyle,
      finalStyle,
      transitionDuration,
      transitionDelay,
    } = this.props;
    const { show } = this.state;

    return show ? {
      transition: transitionFromStyles(finalStyle, transitionDuration, transitionDelay),
      ...finalStyle,
    } : {
      transition: transitionFromStyles(initialStyle, transitionDuration, transitionDelay),
      ...initialStyle,
    };
  }

  render() {
    const {
      bottomOffset,
      wrapper,
      wrapperClassname,
    } = this.props;

    return (
      <Waypoint
        scrollableAncestor="window"
        bottomOffset={bottomOffset}
        onEnter={this.onEnter}
      >
        {
          wrapper ? (
            <div className={wrapperClassname} style={this.getStyles()}>
              { this.props.children }
            </div>
          ) : React.cloneElement(this.props.children, { style: this.getStyles() })
        }
      </Waypoint>
    );
  }
}

TransitionIn.defaultProps = {
  bottomOffset: '150px',
  transitionDuration: 1200,
  transitionDelay: 0,
  initialStyle: {
    opacity: 0,
    transform: 'translateY(50px)',
  },
  finalStyle: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  wrapper: false,
  wrapperClassname: '',
};

export default TransitionIn;
