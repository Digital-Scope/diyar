import React from 'react';
import classnames from 'classnames';
import Img from 'gatsby-image';

import MediaModal from '../../../../../shared/components/media-modal';
import TransitionIn from '../../../../../shared/components/transition-in';
import SliderArrows from '../../../../../shared/components/sliders/arrows';
import SectionTitle from '../../../../../shared/components/section-title';

import './one-slide.scss';

const inAnimationDuration = 150;

const Slide = ({ data, visible }) => (
  <TransitionIn
    wrapper
    inStyle={{ opacity: 0 }}
    finalStyle={{ opacity: 1 }}
    transitionDuration={inAnimationDuration}
  >
    <MediaModal
      media={data}
      className={classnames(
        'gallery-media-slider-slide',
        { visible },
      )}
    >
      <Img
        outerWrapperClassName="gallery-media-slider-slide-image-wrapper"
        className="gallery-media-slider-slide-image"
        sizes={data.sizes}
      />
    </MediaModal>
  </TransitionIn>
);

const GalleryMediaSlider = ({
  data,
  className, wrapperClassName,
  activeIndex,
  nextSlide, previousSlide,
}) => (
  <section className={classnames(
    'gallery-media-slider-container',
    'gallery-media-slider-layout-one-slide',
    wrapperClassName,
  )}
  >
    <div className="container">
      <SectionTitle className="gallery-media-slider-title">
        { data.displayTitle }
      </SectionTitle>
    </div>
    <div className={classnames('gallery-media-slider-wrapper', className)}>
      <div className="gallery-media-slider">
        {
          data.media.map((image, index) => (
            <Slide
              key={image.id}
              data={image}
              visible={index === activeIndex}
            />
          ))
        }
      </div>
      <div className="container gallery-media-slider-arrows">
        <SliderArrows
          onPrevious={() => previousSlide(1)}
          onNext={() => nextSlide(1)}
        />
      </div>
    </div>
  </section>
);

export default GalleryMediaSlider;
