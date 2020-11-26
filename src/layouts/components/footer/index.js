import React from 'react';

import Icon from '../../../shared/components/icon';
import flagIcon from '../../../shared/components/icon/flag.icon';
import Navigation from '../../../contentful/components/navigation';
import SocialNetworks from '../../../contentful/components/social-networks';
import NewsLetterForm from '../../../shared/components/newsletter-form';
import isoLogo from '../../../images/Logo - ISO 9001.png';
import './footer.scss';

const Footer = ({ data, content }) => (
  <footer id="footer" className="footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-slogan">
          <img src={data.logo.file.url} alt={data.logo.file.title} className="footer-slogan-logo" />
          <div className="footer-slogan-text">{content.project.slogan}</div>
          <img src={isoLogo} alt="ISO-9001" className="footer-slogan-iso-logo" />
          {/*
            Removed due to client request. Client requires only slongan.
            <div className="footer-slogan-project-name">{content.project.name}</div>
          */}
        </div>
        <div className="footer-navigation">
          <Navigation data={data.mainNavigation} className="footer-navigation-list" />
          <Navigation data={data.subNavigation} className="footer-navigation-list" />
        </div>
        <NewsLetterForm />
      </div>
      <div className="footer-social-networks">
        <SocialNetworks data={data.socialNetworks.urls} theme="dark" />
      </div>
      <div className="footer-separator">
        <div className="footer-separator-icon">
          <Icon id={flagIcon.id} />
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">{data.copyright}</div>
        <Navigation data={data.legalPagesNavigation} className="footer-subnavigation" />
      </div>
    </div>
  </footer>
);

export const footerFragment = graphql`
  fragment ContentfulComponentFooterFragment on ContentfulComponentFooter {
    logo {
      file {
        url
      }
    }
    mainNavigation {
      ...ContentfulComponentNavigationFragment
    }
    legalPagesNavigation {
      ...ContentfulComponentNavigationFragment
    }
    subNavigation {
      ...ContentfulComponentNavigationFragment
    }
    socialNetworks {
      displayTitle
      urls {
        url
      }
    }
    copyright
  }
`;

export default Footer;
