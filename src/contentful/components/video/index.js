import React from 'react';

import YouTubeVideo from '../../../shared/components/youtube-video';

export default ({ data }) => (
  <YouTubeVideo url={data.url} start={data.startTime} end={data.endTime} />
);

export const fragment = graphql`
  fragment ContentfulComponentVideoFragment on ContentfulComponentVideo {
    url
    startTime
    endTime
  }
`;
