import React from 'react';
import Img from 'gatsby-image';

import MediaModal from '../../../../shared/components/media-modal';
import searchIcon from '../../../../shared/components/icon/search.icon';
import Icon from '../../../../shared/components/icon';
import CardBackground from '../background';
import './card-with-image.scss';

export default ({ data }) => (
  <CardBackground secondary>
    <div className="card-with-image">
      <div className="card-with-image-top">
        <div className="card-with-image-subtitle">{ data.subtitle }</div>
        <div className="card-with-image-thumbnail">
          <MediaModal
            media={data.image}
            className="card-with-image-thumbnail-button"
          >
            <Img
              sizes={data.image.sizes}
              outerWrapperClassName="card-with-image-thumbnail-image"
            />
            <div className="card-with-image-zoom">
              <Icon id={searchIcon.id} />
            </div>
          </MediaModal>
        </div>
      </div>
      <div className="card-with-image-text">
        <div className="card-with-image-title">{ data.displayTitle }</div>
        <div className="card-with-image-text-body">{ data.text.text }</div>
      </div>
    </div>
  </CardBackground>
);

export const fragment = graphql`
  fragment ContentfulComponentCardWithImageFragment on ContentfulComponentCardWithImage {
    id
    displayTitle
    subtitle
    image {
      sizes(toFormat: JPG) {
        ...GatsbyContentfulSizes_tracedSVG
      }
    }
    text {
      text
    }
  }
`;
