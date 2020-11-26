import React from 'react';
import classnames from 'classnames';

import TransitionIn from '../../../../shared/components/transition-in';

import PaintingCanvas from './painting-canvas';
import './story-part.scss';

export default ({ data, imageSide = 'right', showPaintHint, className, onRef, onFirstPaint }) => (
  <div
    className={classnames('story-part', { 'story-part-layout-reverse': imageSide === 'left' }, className)}
    ref={onRef}
  >
    <div className="story-part-content">
      <TransitionIn wrapper>
        <div className="story-part-title">{data.displayTitle}</div>
      </TransitionIn>
      <TransitionIn>
        <div className="story-part-text">{data.text.text}</div>
      </TransitionIn>
    </div>
    <TransitionIn>
      <div className="story-part-canvas">
        <PaintingCanvas
          image={data.image}
          showPaintHint={showPaintHint}
          onFirstPaint={onFirstPaint}
        />
      </div>
    </TransitionIn>
  </div>
);
