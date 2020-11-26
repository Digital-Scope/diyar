import React from 'react';

import SliderArrows from '../../../shared/components/sliders/arrows';
import TimelinePlot from './plot';

const Timeline = ({ data, ...props }) => (
  <section className="timeline">
    <TimelinePlot data={data} {...props} />
    <SliderArrows
      className="timeline-arrows"
      onPrevious={props.selectPreviousYear}
      onNext={props.selectNextYear}
    />
  </section>
);

export default Timeline;

export const fragment = graphql`
  fragment ContentfulComponentTimelineFragment on ContentfulComponentTimeline {
    id
    events {
      displayTitle
      date,
      id
    }
  }
`;
