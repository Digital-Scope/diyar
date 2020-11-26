import React from 'react';

import TransitionIn from '../../../../shared/components/transition-in';
import { renderComponent } from '../../../render';

import './media-block-video-highlight.scss';

export default ({ data }) => (
  <section className="media-block-video-highlight">
    <div className="container">
      <div className="media-block-video-highlight-content">
        <div className="media-block-video-highlight-content-left">
          <TransitionIn>
            <div className="media-block-video-highlight-video">
              { renderComponent(data.video) }
            </div>
          </TransitionIn>
          <TransitionIn>
            <div className="media-block-video-highlight-text">{ data.text.text }</div>
          </TransitionIn>
        </div>
        <TransitionIn transitionDelay={400}>
          <div className="media-block-video-highlight-card">
            { renderComponent(data.card) }
          </div>
        </TransitionIn>
      </div>
    </div>
  </section>
);

export const fragment = graphql`
  fragment ContentfulComponentMediaBlockVideoHighlightFragment on ContentfulComponentMediaBlockVideoHighlight {
    id
    text {
      text
    }
    video {
      __typename
      ...ContentfulComponentVideoFragment
    }
    card {
      __typename
      ...ContentfulComponentCardTextFragment
    }
  }
`;
