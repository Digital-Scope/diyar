import React from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';

import TransitionIn from '../../../../shared/components/transition-in';
import TextBlock from '../../../../shared/components/text-block';
import Cta from '../../cta';
import SectionTitle from '../../../../shared/components/section-title';
import { renderComponent } from '../../../render';

import './media-block-simple.scss';

export default ({ data }) => {
  const { displayTitle, bodyText, image, imagePosition, ctaButton, video } = data;
  const textClassNames = classnames({
    'media-block-simple-text': true,
    'media-block-simple-text-only': !displayTitle,
    'media-block-simple-text-on-right': imagePosition,
    'media-block-simple-text-on-left': !imagePosition,
  });
  return (
    <section className="container">
      <div className="media-block-simple-container">
        {image && <TransitionIn>
          <div className="media-block-simple-image-outer-wrapper">
            <Img sizes={image.sizes} className="media-block-simple-image" outerWrapperClassName="media-block-simple-image-wrapper" />
          </div>
        </TransitionIn>
        }

        {!image && video && <TransitionIn>
          <div className="media-block-simple-image-outer-wrapper">
            { renderComponent(data.video) }
          </div>
        </TransitionIn>
        }

        { !displayTitle &&
        <TextBlock html className={textClassNames}>
          { bodyText.childMarkdownRemark.html }
        </TextBlock>
        }
        { displayTitle &&
        <div className={textClassNames}>
          <SectionTitle title={displayTitle} />
          <TextBlock html className="media-block-simple-text-with-title">
            { bodyText.childMarkdownRemark.html }
          </TextBlock>
          { ctaButton && <div className="media-block-simple-cta">
            <TransitionIn wrapper>
              <Cta data={ctaButton} />
            </TransitionIn>
          </div>}
        </div>
        }
      </div>
    </section>
  );
};

export const mediaBlockSimpleFragment = graphql`
  fragment ContentfulComponentMediaBlockSimpleFragment on ContentfulComponentMediaBlockSimple {
    displayTitle
    bodyText {
        childMarkdownRemark {
            html
        }
    }
    image {
      sizes(quality: 100, toFormat: JPG) {
        ...GatsbyContentfulSizes
      }
    },
    video {
      __typename
      ...ContentfulComponentVideoFragment
    },
    imagePosition
    ctaButton {
        ...ContentfulComponentCtaFragment
    }
  }
`;
