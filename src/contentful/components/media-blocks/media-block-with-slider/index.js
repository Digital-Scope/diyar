import React from 'react';

import { renderComponent } from '../../../render';
import Title from '../../../../shared/components/title';
import SectionTitle from '../../../../shared/components/section-title';
import TextBlock from '../../../../shared/components/text-block';

import './media-block-with-slider.scss';

const MediaBlockWithSlider = ({ data }) => (
  <section className="media-block-with-slider">
    <div className="container">
      <Title text={data.displayTitle}>
        <div className="media-block-with-slider-content">
          <SectionTitle className="media-block-with-slider-subtitle">
            {data.subtitle}
          </SectionTitle>
          <div className="media-block-with-slider-text">
            <TextBlock className="media-block-with-slider-text-block">
              { data.textLeft.textLeft }
            </TextBlock>
            <TextBlock className="media-block-with-slider-text-block">
              { data.textRight.textRight }
            </TextBlock>
          </div>
        </div>
      </Title>
    </div>
    { renderComponent(data.slider[0], { props: { className: 'media-block-with-slider-content-slider' } }) }
  </section>
);

export default MediaBlockWithSlider;

export const fragment = graphql`
  fragment ContentfulComponentMediaBlockWithSliderFragment on ContentfulComponentMediaBlockWithSlider {
    id
    displayTitle
    subtitle
    textLeft {
      textLeft
    }
    textRight {
      textRight
    }
    slider {
      __typename
      ...ContentfulComponentBannerSliderFragment
    }
  }
`;
