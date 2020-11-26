import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../sass/style.scss';

import { StoreProvider } from '../shared/store';
import Icon from '../shared/components/icon';
import phoneIcon from '../shared/components/icon/phone.icon';
import ContactUsFormLandingPage from './landing-page-layout/contact-us-form';
import Head from './components/head';
import LocalizeData from './components/localize-data';
import HeaderSimple from './components/header-simple';
import Footer from './components/footer';
import Cta from './landing-page-layout/cta';
import {PhoneContactMobile, PhoneContactDesktop} from './components/phone-contact';

import './landing-page-layout/landing-page-layout.scss';
import { isArabicURL } from '../shared/helpers/misc';

class LandingPageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlay: false
    };
  }

  toogleOverlay = () => {
    const previousOverlay = this.state.isOverlay;
    this.setState({
      ...this.state,
      isOverlay: !previousOverlay
    });
  };

  handlePhoneIconClick = () => {
    this.toogleOverlay();
  };

  handleOverlayClick = () => {
    this.toogleOverlay();
  };

  overlayClasses = () => {
    return classnames({
      'landing-page-layout-overlay': this.state.isOverlay,
    });
  };

  overlayContentClasses = () => {
    return classnames({
      'landing-page-layout-overlay-content': this.state.isOverlay,
      'landing-page-layout-overlay-content__hide': !this.state.isOverlay
    });
  };

  render() {
    const { data, children, location } = this.props;
    const isArabic = location && location.pathname && isArabicURL(location.pathname);
    return (
      <StoreProvider>
        <LocalizeData data={data}>{({ data: { header, footer, content } }) => (
          <div id="app">
            <Head/>
            <div id="layout" className="landing-page-layout">
              <HeaderSimple key="header" data={header} content={content} blend/>
              <Cta/>
              <div onClick={this.handleOverlayClick} className={this.overlayClasses()}>
                <div className={this.overlayContentClasses()}>
                  <div className="landing-page-layout-call-icon-popup">
                    <PhoneContactMobile phoneNumber="(+973) 77556606" textClass="text-block"/>
                    <PhoneContactMobile phoneNumber="80008880" textClass="text-block"/>
                  </div>
                </div>
              </div>
              <span onClick={this.handlePhoneIconClick} className={classnames('landing-page-layout-call-icon', 'landing-page-layout-call-icon-mobile')}>
                <Icon className={classnames({'landing-page-layout-call-icon-mobile__rotate': isArabic})} id={phoneIcon.id}/>
              </span>
              <div id="container" className="container">
                <div id="content-main">
                  <div id="content-main__first-column">
                    <div id="components">
                      {children()}
                    </div>
                  </div>
                  <div id="content-main__second-column">
                    <ContactUsFormLandingPage/>
                    <div className="landing-page-layout-call-icon">
                      <PhoneContactDesktop location={location} phoneNumber="(+973) 77556606" textClass="text-block"/>
                      <PhoneContactDesktop location={location} phoneNumber="80008880" textClass="text-block"/>
                    </div>
                  </div>
                </div>
              </div>
              <Footer data={footer} content={content}/>
            </div>
          </div>
        )}
        </LocalizeData>
      </StoreProvider>
    );

  }
}

LandingPageLayout.propTypes = {
  children: PropTypes.func,
};

export default LandingPageLayout;

export const landingPageLayoutQuery = graphql`
  query LandingPageLayoutQuery {
    ...Layout
  }
`;
