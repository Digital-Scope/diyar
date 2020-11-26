import React from 'react';
import Img from 'gatsby-image';

import { renderComponent } from '../../render';
import TransitionIn from '../../../shared/components/transition-in';
import TextBlock from '../../../shared/components/text-block';

import './project-hero.scss';

export default ({ data }) => (
  <section className="project-hero">
    <div className="project-hero-background">
      {/* TODO: video  */}
      <Img
        sizes={data.backgroundMedia[0].sizes}
        outerWrapperClassName="project-hero-background-image-wrapper"
        className="project-hero-background-image"
      />
    </div>
    <div className="project-hero-container-wrapper">
      <div className="container">
        <div className="project-hero-content">
          <div className="project-hero-content-text">
            <div className="project-hero-content-title">{ data.displayTitle }</div>
            <TextBlock html className="project-hero-content-text-description">
              { data.description.childMarkdownRemark.html }
            </TextBlock>
            <div className="project-hero-image-mobile-wrapper">
              <TransitionIn>
                <div className="project-hero-image-mobile">
                  <Img
                    sizes={data.media[0].sizes}
                    outerWrapperClassName="project-hero-image-mobile-image"
                    className="project-hero-image-mobile-image"
                  />
                  {
                    data.cardOverMedia && (
                      <TransitionIn
                        initialStyle={{ opacity: 0 }}
                        finalStyle={{ opacity: 1 }}
                      >
                        <div className="project-hero-card">
                          {/* TODO: fix https://github.com/gatsbyjs/gatsby/issues/3535 */}
                          { renderComponent(data.cardOverMedia[0]) }
                        </div>
                      </TransitionIn>
                    )
                  }
                </div>
              </TransitionIn>
            </div>
            <TransitionIn bottomOffset="10%">
              <div className="project-hero-content-bottom-section">
                { data.bottomSection && data.bottomSection.map(renderComponent) }
              </div>
            </TransitionIn>
          </div>
          <TransitionIn
            bottomOffset="25%"
            initialStyle={{ opacity: 0, transform: 'translateX(40px)' }}
            finalStyle={{ opacity: 1, transform: 'translateX(0)' }}
          >
            <div className="project-hero-content-image-wrapper">
              <Img
                sizes={data.media[0].sizes}
                outerWrapperClassName="project-hero-content-image"
              />
              {
                data.cardOverMedia && (
                  <TransitionIn
                    initialStyle={{ opacity: 0 }}
                    finalStyle={{ opacity: 1 }}
                  >
                    <div className="project-hero-card">
                      {/* TODO: fix https://github.com/gatsbyjs/gatsby/issues/3535 */}
                      { renderComponent(data.cardOverMedia[0]) }
                    </div>
                  </TransitionIn>
                )
              }
            </div>
          </TransitionIn>
        </div>
      </div>
    </div>
  </section>
);

export const fragment = graphql`
  fragment ContentfulComponentProjectHeroFragment on ContentfulComponentProjectHero {
    displayTitle,
    description {
      childMarkdownRemark {
        html
      }
    }
    backgroundMedia {
      sizes(quality: 90, maxWidth: 3000, toFormat: JPG) {
        ...GatsbyContentfulSizes
      }
    },
    media {
      sizes(quality: 100, toFormat: JPG) {
        ...GatsbyContentfulSizes
      }
    },
    bottomSection {
      __typename
      ...ContentfulComponentCtaFragment
      ...ContentfulComponentStatisticsFragment
    }
    cardOverMedia {
      __typename
      # ...ContentfulComponentCardWithImageFragment
      ...ContentfulComponentCardSimpleFragment
    }
  }
`;
