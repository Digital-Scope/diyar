import React from 'react';
import classnames from 'classnames';
import Img from 'gatsby-image';
import Media from 'react-media';

import MediaModal from '../../../../../shared/components/media-modal';
import TransitionIn from '../../../../../shared/components/transition-in';
import { jumpToIndex } from '../../../../../shared/helpers/circular-array';
import SliderArrows from '../../../../../shared/components/sliders/arrows';
import { isDocumentRtl } from '../../../../../shared/helpers/document-direction';
import SectionTitle from '../../../../../shared/components/section-title';

import './default.scss';
import Icon from '../../../../../shared/components/icon';
import playbutton from '../../../../../shared/components/icon/play-button.icon';

const queryPhoneMax = '(max-width: 575px)';
const slideLengthDesktop = 4;
const slideLengthMobile = 2;
const inAnimationDuration = 150;
let firstLoad = true;
const slidePosition = (index, activeIndex) => (
  `calc(${index - activeIndex} * var(--slide-width))`
);

const Slide = ({ data, index, activeIndex, visible, isFirst, isLast }) => (
  <TransitionIn
    wrapper
    inStyle={{ opacity: 0 }}
    finalStyle={{ opacity: 1 }}
    transitionDuration={(index * inAnimationDuration) + 5}
    transitionDelay={index * inAnimationDuration}
  >
    <MediaModal
      media={data}
      style={{
        [isDocumentRtl() ? 'right' : 'left']: slidePosition(index, activeIndex),
      }}
      className={classnames(
        'gallery-media-slider-slide',
        { 'first-slide': isFirst, 'last-slide': isLast, visible },
      )}
    >
      <Img
        outerWrapperClassName="gallery-media-slider-slide-image-wrapper"
        className="gallery-media-slider-slide-image"
        sizes={data.sizes}
      /> {data.isVideo && <Icon id={playbutton.id} className="gallery-media-slider-icon" />}
    </MediaModal>
  </TransitionIn>
);

const GalleryMediaSlider = ({
  data,
  className, wrapperClassName,
  activeIndex,
  nextSlide, previousSlide,
}) => {
  if (data.youtubeVideo && data.youtubeVideo.length > 0 && firstLoad) {
    data.youtubeVideo.forEach((item) => {
      const mediaItem = {
        id: item.id,
        sizes: item.thumbnail.sizes,
        url: item.url,
        isVideo: true,
      };
      data.media.unshift(mediaItem);
    });
    firstLoad = false;
  }
  return (
    <section className={classnames(
      'gallery-media-slider-container',
      'gallery-media-slider-layout-default',
      wrapperClassName,
    )}
    >
      <div className="container">
        <SectionTitle className="gallery-media-slider-title">
          { data.displayTitle }
        </SectionTitle>
      </div>
      <div className={classnames('gallery-media-slider-wrapper', className)}>
        <div className="gallery-media-slider-background" />
        <div className="gallery-media-slider">
          {
            data.media.map((media, index) => (
              <Media key={media.id} query={queryPhoneMax}>{ (matches) => {
                const lastIndex = jumpToIndex(
                  activeIndex,
                  matches ? slideLengthMobile - 1 : slideLengthDesktop - 1,
                  data.media.length,
                );

                return (
                  <Slide
                    index={index}
                    data={media}
                    activeIndex={activeIndex}
                    visible={activeIndex < lastIndex ?
                      activeIndex <= index && index <= lastIndex :
                      activeIndex <= index}
                    isFirst={activeIndex === index}
                    isLast={lastIndex === index}
                  />
                );
              }}</Media>
            ))
          }
        </div>
        <div className="container gallery-media-slider-arrows">
          <Media query={queryPhoneMax}>{ matches => (
            (matches && data.media.length > slideLengthMobile) ||
            (!matches && data.media.length > slideLengthDesktop) ? (
                <SliderArrows
                onPrevious={() => previousSlide(matches ? slideLengthMobile : slideLengthDesktop)}
                onNext={() => nextSlide(matches ? slideLengthMobile : slideLengthDesktop)}
              />
              ) : null
          )}
          </Media>
        </div>
      </div>
    </section>
  );
};

export default GalleryMediaSlider;

export const fragment = graphql`
  fragment ContentfulComponentGalleryMediaSliderFragment on ContentfulComponentGalleryMediaSlider {
    displayTitle
    media {
      id
      sizes(quality: 100, toFormat: JPG) {
        ...GatsbyContentfulSizes
      }
    }
      youtubeVideo {
          id
          url
          thumbnail {
              sizes(quality: 100, toFormat: JPG) {
                  ...GatsbyContentfulSizes
              }
          }
      }
    layout
  }
`;
