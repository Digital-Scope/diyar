import React from 'react';
import classnames from 'classnames';

import Icon from '../icon';
import arrowIcon from '../icon/cta-arrow.icon';

import './arrows.scss';

export default ({ className, onPrevious, onNext }) => (
  <div className={classnames('slider-arrows', className)}>
    <button
      className="slider-arrow slider-arrow-previous"
      onClick={onPrevious}
    >
      <Icon id={arrowIcon.id} />
    </button>
    <button
      className="slider-arrow slider-arrow-next"
      onClick={onNext}
    >
      <Icon id={arrowIcon.id} />
    </button>
  </div>
);
