import React from 'react';
import { I18n } from 'react-i18next';
import Img from 'gatsby-image';

import TransitionIn from '../../../shared/components/transition-in';
import Icon from '../../../shared/components/icon';
import ctaArrowIcon from '../../../shared/components/icon/cta-arrow.icon';
import SectionTitle from '../../../shared/components/section-title';
import './take-a-tour.scss';

const ContactInformation = ({ text, data: { phoneNumbers } }) => (
  <TransitionIn>
    <div className="take-a-tour-contact-information">{
      text.split(/\[|\]/).map((partial) => {
        if (!partial.startsWith('number')) {
          return <span key={partial}>{partial}</span>;
        }

        if (!phoneNumbers) {
          return null;
        }

        const phoneMatch = phoneNumbers[partial[partial.length - 1] - 1];

        if (!phoneMatch) {
          return null;
        }

        const number = phoneMatch.phoneNumber;

        return <a dir="ltr" key={number} href={`tel:${number}`}>{number}</a>;
      })
    }</div>
  </TransitionIn>
);

const StreetviewLinksList = ({ streetviewLinks }) => (
  <div className="take-a-tour-links-list-wrapper">
    <div className="take-a-tour-links-list">
      {
        streetviewLinks && streetviewLinks.map((streetviewLink, index) => (
          <TransitionIn
            key={streetviewLink.id}
            initialStyle={{ opacity: 0, transform: 'translateY(100px)' }}
            finalStyle={{ opacity: 1, transform: 'translateY(0px)' }}
            transitionDelay={index * 250}
          >
            <a
              href={streetviewLink.link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="take-a-tour-links-list-item"
            >
              <Img
                sizes={streetviewLink.image.sizes}
                className="take-a-tour-links-list-item-image"
              />
              <div className="take-a-tour-links-list-item-link">
                <span>{ streetviewLink.displayTitle}</span>
                <Icon id={ctaArrowIcon.id} />
              </div>
            </a>
          </TransitionIn>
        ))
      }
    </div>
  </div>
);

const TakeATour = ({ data }) => (
  <section className="take-a-tour container">
    <SectionTitle title={data.displayTitle}>
      <I18n ns="labels">{ translate => translate('projectDetails').takeATour.title }</I18n>
    </SectionTitle>
    <ContactInformation
      text={data.contactInformation}
      data={{ phoneNumbers: data.phoneNumbers }}
    />
    <StreetviewLinksList streetviewLinks={data.googleMapsStreetviewLinks} />
  </section>
);

export default TakeATour;

export const fragment = graphql`
  fragment ContentfulComponentTakeATourFragment on ContentfulComponentTakeATour {
    id
    contactInformation
    phoneNumbers {
      name
      phoneNumber
    }
    googleMapsStreetviewLinks {
      id
      displayTitle
      image {
        sizes(quality: 100, maxWidth: 327, maxHeight: 436, toFormat: JPG) {
          ...GatsbyContentfulSizes
        }
      }
      link {
        link
      }
    }
  }
`;
