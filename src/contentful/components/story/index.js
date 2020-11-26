import React, { Component } from 'react';

import { IsDeviceTouchProvider } from '../../../shared/components/is-device-touch';
import Story from './story';

import './story.scss';

export default class StoryContainer extends Component {
  constructor() {
    super();

    this.state = {
      showCta: false,
      showPaintHint: true,
    };
  }

  render() {
    return (
      <IsDeviceTouchProvider>
        <Story
          data={this.props.data}
          showCta={this.state.showCta}
          showPaintHint={this.state.showPaintHint}
          onCtaWaypointEnter={() => this.setState({ showCta: true })}
          onCtaWaypointLeave={() => this.setState({ showCta: false })}
          onFirstPaint={() => this.setState({ showPaintHint: false })}
        />
      </IsDeviceTouchProvider>
    );
  }
}

export const storyFragment = graphql`
  fragment ContentfulComponentStoryFragment on ContentfulComponentStory {
    storyCards {
      id
      displayTitle,
      text {
        text
      },
      image {
        sizes {
          ...GatsbyContentfulSizes_tracedSVG
        }
        file {
          url
          fileName
          contentType
        }
      }
    }
    cta {
      ...ContentfulComponentCtaFragment
    }
  }
`;
