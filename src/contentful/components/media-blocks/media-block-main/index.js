import React from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';

import { renderComponent } from '../../../render';
import TransitionIn from '../../../../shared/components/transition-in';
import TextBlock from '../../../../shared/components/text-block';
import Title from '../../../../shared/components/title';
import SectionTitle from '../../../../shared/components/section-title';

import './media-block-main.scss';

export const MediaBlockMain = ({ data }) => (
  <div className={classnames('media-block-main', { 'no-image': !data.image })}>
    <Title text={data.displayTitle}>
      {
        data.image && (
          <div className="media-block-main-image-mobile-wrapper">
            <TransitionIn>
              <div className="media-block-main-image-mobile">
                <Img
                  sizes={data.image.sizes}
                  imgStyle={{ objectPosition: 'center top' }}
                />
              </div>
            </TransitionIn>
          </div>
        )
      }
      <div className="media-block-main-content">
        <div className="media-block-main-content-text">
          { data.subtitle && <SectionTitle className={classnames('media-block-main-content-subtitle', { 'show-subtitle': data.displayTitle.trim().length <= 1 })}>{ data.subtitle }</SectionTitle> }
          <TextBlock html className="media-block-main-content-text-body">
            { data.body.childMarkdownRemark.html }
          </TextBlock>
          <TransitionIn bottomOffset="10%">
            <div className="media-block-main-content-bottom-section">
              { data.bottomSection && data.bottomSection.map(renderComponent) }
            </div>
          </TransitionIn>
          {
            data.bottomSectionMedia && (
              <TransitionIn bottomOffset="10%">
                <div className="media-block-main-content-bottom-images">
                  {
                    data.bottomSectionMedia.map((media, index) => (
                      <div className="media-block-main-content-bottom-image-label-container">
                        <Img
                          sizes={media.sizes}
                          outerWrapperClassName="media-block-main-content-bottom-image-container"
                          className="media-block-main-content-bottom-image"
                        />
                        <div className="media-block-main-content-bottom-label-container">
                          <TextBlock className="media-block-main-content-bottom-label">{media.title}</TextBlock>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </TransitionIn>
            )
          }
        </div>
        {
          data.image && (
            <TransitionIn
              initialStyle={{ opacity: 0, transform: 'translateX(40px)' }}
              finalStyle={{ opacity: 1, transform: 'translateX(0)' }}
            >
              <div className="media-block-main-content-image-wrapper">
                <Img
                  sizes={data.image.sizes}
                  outerWrapperClassName="media-block-main-content-image"
                />
                {
                  data.cardOverImage && (
                    <TransitionIn
                      initialStyle={{ opacity: 0 }}
                      finalStyle={{ opacity: 1 }}
                    >
                      <div className="media-block-main-card">
                        {/* TODO: fix https://github.com/gatsbyjs/gatsby/issues/3535 */}
                        { renderComponent(data.cardOverImage[0]) }
                      </div>
                    </TransitionIn>
                  )
                }
              </div>
            </TransitionIn>
          )
        }
      </div>
    </Title>
  </div>
);

export const Section = props => (
  <section className="media-block-main-section container">
    <MediaBlockMain {...props} />
  </section>
);

export default MediaBlockMain;

export const fragment = graphql`
  fragment ContentfulComponentMediaBlockMainFragment on ContentfulComponentMediaBlockMain {
    displayTitle,
    subtitle,
    body {
      childMarkdownRemark {
        html
      }
    }
    image {
      sizes(quality: 100, toFormat: JPG) {
        ...GatsbyContentfulSizes
      }
    },
    bottomSectionMedia {
      sizes(quality: 100, toFormat: PNG) {
      ...GatsbyContentfulSizes
      }
      title
    }
    bottomSection {
      __typename
      ...ContentfulComponentCtaFragment
      ...ContentfulComponentStatisticsFragment
      ...ContentfulComponentVideoFragment
    }
    cardOverImage {
      __typename
      ...ContentfulComponentCardWithImageFragment
      # ...ContentfulComponentCardSubscribeFragment
      ...ContentfulComponentCardSimpleFragment
    }
  }
`;
