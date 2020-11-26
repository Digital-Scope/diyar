import { Component } from 'react';

import { next, previous, jumpTo } from '../../helpers/circular-array';

const autoPlayInterval = 5000;

class SimpleSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: props.slides ? props.slides[0] : null,
    };
  }

  componentDidMount() {
    if (this.props.autoPlay) {
      this.autoPlayInterval = setInterval(() => {
        this.setState({ currentSlide: next(this.state.currentSlide, this.props.slides) });
      }, this.props.autoPlayInterval || autoPlayInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.autoPlayInterval);
  }

  render() {
    const list = this.props.slides;

    return this.props.children({
      currentSlide: this.state.currentSlide,
      onNextSlide:
        () => this.setState({ currentSlide: next(this.state.currentSlide, list) }),
      onPreviousSlide:
        () => this.setState({ currentSlide: previous(this.state.currentSlide, list) }),
      onJumpNSlides:
        n => this.setState({ currentSlide: jumpTo(this.state.currentSlide, n, list) }),
    });
  }
}

export default SimpleSlider;
