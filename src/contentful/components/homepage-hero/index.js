import React from 'react';
import Img from 'gatsby-image';
import ReactPlayer from 'react-player';
import classnames from 'classnames';

import Slider from '../../../shared/components/sliders/simple';
import scrollHintIcon from '../../../shared/components/icon/scroll-hint.icon';
import Icon from '../../../shared/components/icon';
import rightIcon from '../../../shared/components/icon/right.icon';
import './homepage-hero.scss';
import Cta from '../cta';


export default ({ data }) => (
  <section className={classnames(
    'homepage-hero',
    `homepage-hero-${data.layout ? data.layout.toLowerCase().replace(' ', '-') : 'default'}`,
    { 'homepage-hero-no-animation': data.animationOff },
  )}
  >
    <div className="homepage-hero-background">
      { data.useBackgroundVideo && (
        <div>
          <ReactPlayer
            key="video"
            playsinline
            muted
            loop
            playing
            height="100%"
            width="100%"
            url={data.backgroundVideo.file.url}
            className="homepage-hero-background-video"
          />
          <div className="container">
            <div className="homepage-hero-slogan">
              {data.preTitleText && (<div className="homepage-hero-slogan-pretitle">{ data.preTitleText }</div>)}
              <div className="homepage-hero-slogan-title">{ data.displayTitle }</div>
              <div className="homepage-hero-slogan-underline">l</div>
            </div>
            <div className="homepage-hero-scroll-hint">
              <span>{data.scrollToContent}</span>
              <Icon id={scrollHintIcon.id} />
            </div>
          </div>
        </div>
      )}
      { !data.useBackgroundVideo && (
        <Slider
          slides={data.sliders}
          autoPlay
          autoPlayInterval={10000}
          className="homepage-hero-slider"
        >{ ({ currentSlide, onNextSlide, onPreviousSlide }) => (
            data.sliders && data.sliders.map(slide => (
              <div>
                {(currentSlide === slide) && (
                  <div className="homepage-hero-content">
                    { data.sliders.length > 1 && (
                      <div className="homepage-hero-slider-left">
                        <Icon id={rightIcon.id} onClick={onPreviousSlide} />
                      </div>)}
                    { data.sliders.length > 1 && (
                      <div className="homepage-hero-slider-right">
                        <Icon id={rightIcon.id} onClick={onNextSlide} />
                      </div>)}
                    <div className="container">
                      <div className="homepage-hero-slogan">
                        {slide.description && slide.description.description && (<div className="homepage-hero-slogan-pretitle">{ slide.description.description }</div>) }
                        <div className="homepage-hero-slogan-title">{ slide.displayTitle }</div>
                        {/* <div className="homepage-hero-slogan-underline">l</div> */}

                        {slide.button && slide.button.link && (<Cta data={{
                          type: 'primary',
                          link: {
                            ...slide.button.link,

                          },
                        }}
                        />)}
                      </div>
                      <div className="homepage-hero-scroll-hint">
                        <span>{data.scrollToContent}</span>
                        <Icon id={scrollHintIcon.id} />
                      </div>
                    </div>
                  </div>)}
                <Img
                  key={slide.bannerImage.sizes.src}
                  sizes={slide.bannerImage.sizes}
                  outerWrapperClassName={classnames('homepage-hero-background-image-wrapper', { active: currentSlide === slide })}
                  className="homepage-hero-background-image homepage-hero-background-image--desktop"
                />
                <Img
                  key={`${slide.bannerImagemobile ?
                    slide.bannerImagemobile.sizes.src :
                    slide.bannerImage.sizes.src}-mobile`}
                  sizes={slide.bannerImagemobile ?
                    slide.bannerImagemobile.sizes :
                    slide.bannerImage.sizes}
                  outerWrapperClassName={classnames('homepage-hero-background-image-wrapper', { active: currentSlide === slide })}
                  className="homepage-hero-background-image homepage-hero-background-image--mobile"
                />
              </div>),
            )
          )
          }</Slider>
      )}
    </div>
  </section>
);

export const homepageHeroFragment = graphql`
  fragment ContentfulComponentHomepageHeroFragment on ContentfulComponentHomepageHero {
    id,
    displayTitle,
    preTitleText,
    scrollToContent,
    sliders {
        bannerImage {
            sizes(quality: 90, maxWidth: 2560, toFormat: JPG) {
                ...GatsbyContentfulSizes
            }
        },
        bannerImagemobile {
            sizes(quality: 90, maxWidth: 2560, toFormat: JPG) {
                ...GatsbyContentfulSizes
            }
        },
        displayTitle,
        description {
            description
        }
        button {
            ...ContentfulComponentCtaFragment
        }
    },
    backgroundVideo {
      file {
        url,
        fileName,
        contentType
      }
    }
    useBackgroundVideo
    layout,
    animationOff
  }
`;
