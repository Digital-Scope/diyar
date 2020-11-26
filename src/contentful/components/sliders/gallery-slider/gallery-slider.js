import React from 'react';
import classnames from 'classnames';
import Img from 'gatsby-image';
import Media from 'react-media';

import TransitionIn from '../../../../shared/components/transition-in';
import TextBlock from '../../../../shared/components/text-block';
import { jumpToIndex } from '../../../../shared/helpers/circular-array';
import ProjectCard from '../../cards/card-project';
import SliderArrows from '../../../../shared/components/sliders/arrows';
import { isDocumentRtl } from '../../../../shared/helpers/document-direction';
import SectionTitle from '../../../../shared/components/section-title';
import './gallery-slider.scss';

const queryPhoneMax = '(max-width: 575px)';
const slideLengthDesktop = 4;
const slideLengthMobile = 2;

const slidePosition = (index, activeIndex) => (
  `calc(${index - activeIndex} * var(--slide-width))`
);

const Slide = ({ data, index, activeIndex, visible, isFirst, isLast }) => (
  <TransitionIn
    wrapper
    inStyle={{ opacity: 0 }}
    finalStyle={{ opacity: 1 }}
    transitionDuration={600}
    transitionDelay={index * 150}
  >
    <div
      style={{
        [isDocumentRtl() ? 'right' : 'left']: slidePosition(index, activeIndex),
      }}
      className={classnames(
        'gallery-slider-slide',
        { 'first-slide': isFirst, 'last-slide': isLast, visible },
      )}
    >
      <Img
        outerWrapperClassName="gallery-slider-slide-image-wrapper"
        className="gallery-slider-slide-image"
        sizes={data.image.sizes}
      />
      {
        data.displayTitle && data.description && (
          <ProjectCard
            wrapperClassName="gallery-slider-slide-card"
            data={{
              displayTitle: data.displayTitle,
              description: data.description,
              link: data.link,
            }}
          />
        )
      }
    </div>
  </TransitionIn>
);

const GallerySlider = ({
  data,
  className, wrapperClassName,
  activeIndex,
  nextSlide, previousSlide,
}) => (
  <section className={classnames('gallery-slider-container', wrapperClassName)}>
    <div className="container">
      <SectionTitle className="gallery-slider-title">
        { data.displayTitle }
      </SectionTitle>
      {
        data.description &&
          <TextBlock html>{ data.description.childMarkdownRemark.html }</TextBlock>
      }
    </div>
    <div className={classnames('gallery-slider-wrapper', className)}>
      <div className="gallery-slider-background" />
      <div className="gallery-slider">
        {
          data.items.map((slide, index) => (
            <Media key={`${slide.id}-${index}`} query={queryPhoneMax}>{ (matches) => {
              const lastIndex = jumpToIndex(
                activeIndex,
                matches ? slideLengthMobile - 1 : slideLengthDesktop - 1,
                data.items.length,
              );

              return (
                <Slide
                  /* eslint react/no-array-index-key: off */
                  index={index}
                  data={slide}
                  activeIndex={activeIndex}
                  visible={activeIndex < lastIndex ?
                    activeIndex <= index && index <= lastIndex :
                    activeIndex <= index}
                  isFirst={activeIndex === index}
                  isLast={lastIndex === index}
                />
              );
            }}</Media>
          ),
          )
        }
      </div>
      <div className="container gallery-slider-arrows">
        <Media query={queryPhoneMax}>{ matches => (
          (matches && data.items.length > slideLengthMobile) ||
            (!matches && data.items.length > slideLengthDesktop) ? (
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

export default GallerySlider;

export const fragment = graphql`
  fragment ContentfulComponentGallerySliderFragment on ContentfulComponentGallerySlider {
    displayTitle
    description {
      childMarkdownRemark {
        html
      }
    }
    items {
      id
      image {
        sizes(quality: 100, toFormat: JPG) {
          ...GatsbyContentfulSizes
        }
      }
      # Project Card
      displayTitle
      description {
        description
      }
      link {
        ...ContentfulComponentCtaFragment
      }
    }
  }
`;
