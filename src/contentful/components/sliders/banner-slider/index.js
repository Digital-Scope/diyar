import React from 'react';
import classnames from 'classnames';
import Img from 'gatsby-image';

import Slider from '../../../../shared/components/sliders/simple';
import SliderArrows from '../../../../shared/components/sliders/arrows';
import SectionTitle from '../../../../shared/components/section-title';
import './banner-slider.scss';

const Slide = ({ data }) => (
  <div className="banner-slider-slide">
    <Img
      outerWrapperClassName="banner-slider-slide-banner-wrapper"
      className="banner-slider-slide-banner"
      sizes={data.bannerImage.sizes}
    />
    <div className="banner-slider-slide-content">
      <Img
        outerWrapperClassName="banner-slider-slide-image-wrapper"
        className="banner-slider-slide-image"
        sizes={data.portraitImage.sizes}
      />
      <div className="banner-slider-slide-text">
        <SectionTitle className="banner-slider-slide-title">
          { data.displayTitle }
        </SectionTitle>
        <div className="banner-slider-slide-text-description">
          { data.description.description }
        </div>
      </div>
    </div>
  </div>
);

const BannerSlider = ({
  data,
  className, wrapperClassName,
}) => (
  <div className={classnames('banner-slider-wrapper', wrapperClassName)}>
    <div className="banner-slider-background" />
    <div className="container">
      <div className={classnames('banner-slider', className)}>
        <Slider slides={data.items}>{
          ({ currentSlide, onPreviousSlide, onNextSlide }) => [
            data.items.map(slide => (
              <div
                key={slide.id}
                className={classnames('banner-slider-slide-wrapper', { active: currentSlide === slide })}
              >
                <Slide data={slide} />
              </div>
            )),
            <SliderArrows key="arrows" className="banner-slider-arrows" onPrevious={onPreviousSlide} onNext={onNextSlide} />,
          ]
        }</Slider>
      </div>
    </div>
  </div>
);

export default BannerSlider;

export const fragment = graphql`
  fragment ContentfulComponentBannerSliderFragment on ContentfulComponentBannerSlider {
    items {
      id
      displayTitle
      description {
        description
      }
      bannerImage {
        sizes(quality: 100, maxWidth: 2000, toFormat: JPG) {
          ...GatsbyContentfulSizes
        }
      }
      portraitImage {
        sizes(quality: 100, maxWidth: 600, toFormat: JPG) {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`;
