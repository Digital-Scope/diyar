import React from 'react';
import Img from 'gatsby-image';

import TransitionIn from '../../../../shared/components/transition-in';
import TextBlock from '../../../../shared/components/text-block';
import SectionTitle from '../../../../shared/components/section-title';

import './media-block-with-three-images.scss';

export default ({ data }) => (
  <section className="media-block-with-three-images">
    <div className="media-block-with-three-images-content container">
      <TransitionIn>
        <div className="media-block-with-three-images-content-images">{
          data.images.map(image => (
            <Img
              key={image.id}
              sizes={image.sizes}
              outerWrapperClassName="media-block-with-three-images-content-image"
            />
          ))
        }
        </div>
      </TransitionIn>
      <div className="media-block-with-three-images-text">
        <SectionTitle>{ data.displayTitle }</SectionTitle>
        <TextBlock>{ data.text.text }</TextBlock>
      </div>
    </div>
  </section>
);

export const fragment = graphql`
  fragment ContentfulComponentMediaBlockWithThreeImagesFragment on ContentfulComponentMediaBlockWithThreeImages {
    displayTitle,
    text {
      text
    }
    images {
      id
      # ratio: ~1.24
      sizes(quality: 100, maxHeight: 270, maxWidth: 220, toFormat: JPG) {
        ...GatsbyContentfulSizes
      }
    }
  }
`;
