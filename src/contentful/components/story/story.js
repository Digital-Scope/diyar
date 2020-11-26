import React from 'react';
import classnames from 'classnames';
import Waypoint from 'react-waypoint';

import Cta from '../cta';
import NavigationBlock from '../../../shared/components/navigation-block';
import StoryPart from './part';

export default ({
  data,
  showCta,
  showPaintHint,
  onFirstPaint,
  onCtaWaypointEnter,
  onCtaWaypointLeave,
}) => (
  <Waypoint
    bottomOffset="90%"
    onEnter={onCtaWaypointEnter}
    onLeave={onCtaWaypointLeave}
  >
    <section className="story container">
      <div className={classnames(
        'story-cta',
        { visible: showCta },
      )}
      >
        <Cta data={data.cta} arrow={false} />
      </div>
      <NavigationBlock
        mobileBottomBlock={() => <Cta data={data.cta} arrow={false} />}
      >
        {
          data.storyCards.map((storyCard, index) => (
            <StoryPart
              key={storyCard.id}
              data={storyCard}
              imageSide={index % 2 === 0 ? 'right' : 'left'}
              showPaintHint={showPaintHint}
              onFirstPaint={onFirstPaint}
            />
          ))
        }
      </NavigationBlock>
    </section>
  </Waypoint>
);
