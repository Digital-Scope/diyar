import React from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';

import SectionTitle from '../../../../shared/components/section-title';
import TransitionIn from '../../../../shared/components/transition-in';
import TextBlock from '../../../../shared/components/text-block';

import './media-block-highlight.scss';

export default ({ data: { displayTitle, body, image } }) => (
  <section className={classnames('highlight-wrapper', { 'no-image': !image })}>
    <div className="container">
      <div className="highlight-container">
        {
          image && (
            <TransitionIn>
              <div className="highlight-image-outer-wrapper">
                <Img sizes={image.sizes} className="highlight-image" outerWrapperClassName="highlight-image-wrapper" />
              </div>
            </TransitionIn>
          )
        }
        <div className="highlight-text-container">
          <SectionTitle title={displayTitle} />
          <TransitionIn wrapper>
            <TextBlock html className="highlight-body">
              { body.childMarkdownRemark.html }
            </TextBlock>
          </TransitionIn>
        </div>
      </div>
    </div>
  </section>
);

export const fragment = graphql`
  fragment ContentfulComponentMediaBlockHighlightFragment on ContentfulComponentMediaBlockHighlight {
    id,
    displayTitle,
    body {
      childMarkdownRemark {
        html
      }
    }
    image {
      sizes(quality: 90, toFormat: JPG) {
        ...GatsbyContentfulSizes
      }
    }
  }
`;
