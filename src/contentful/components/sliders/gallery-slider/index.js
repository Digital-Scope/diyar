import React, { Component } from 'react';
import { nextIndex, previousIndex } from '../../../../shared/helpers/circular-array';

import GallerySlider from './gallery-slider';

class GallerySliderContainer extends Component {
  constructor() {
    super();

    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    if (!this.props.data.items || !this.props.data.items.length) {
      return null;
    }

    return (
      <GallerySlider
        data={this.props.data}
        activeIndex={this.state.activeIndex}
        nextSlide={visibleLength => this.setState({
          activeIndex: nextIndex(
            this.state.activeIndex,
            ((this.props.data.items.length - visibleLength) + 2),
          ),
        })}
        previousSlide={visibleLength => this.setState({
          activeIndex: previousIndex(
            this.state.activeIndex,
            ((this.props.data.items.length - visibleLength) + 2),
          ),
        })}
      />
    );
  }
}

export default GallerySliderContainer;
