import React, { Component } from 'react';
import { nextIndex, previousIndex } from '../../../../shared/helpers/circular-array';

import DefaultLayout from './layouts/default';
import OneSlideLayout from './layouts/one-slide';

class GalleryMediaSliderContainer extends Component {
  constructor() {
    super();

    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    const { media, layout } = this.props.data;

    if (!media || !media.length) {
      return null;
    }

    const Layout = layout === 'Default' || !layout ? DefaultLayout : OneSlideLayout;

    return (
      <Layout
        data={this.props.data}
        activeIndex={this.state.activeIndex}
        nextSlide={visibleLength => this.setState({
          activeIndex: nextIndex(
            this.state.activeIndex,
            ((this.props.data.media.length - visibleLength) + 1),
          ),
        })}
        previousSlide={visibleLength => this.setState({
          activeIndex: previousIndex(
            this.state.activeIndex,
            ((this.props.data.media.length - visibleLength) + 1),
          ),
        })}
      />
    );
  }
}

export default GalleryMediaSliderContainer;
