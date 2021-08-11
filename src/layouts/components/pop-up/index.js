import 'babel-polyfill';
import React, { Component } from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';
import classnames from 'classnames';
import cookie from 'react-cookies';
import '../../../sass/style.scss';
import './pop-up.scss';
import Cta from '../../../contentful/components/cta/index';
import { useLocation } from 'react-router-dom';

export default class PopUp extends Component {
  constructor(props) {
    super(props);
    this.StartDate = new Date('16 April 2020');
    this.EndDate = new Date('30 August 2021');
    this.state = {
      isVisible: false,
    };
  }
  componentWillMount() {
    //this.setState({ isVisible: !cookie.load('isViewed') && this.isValidDate() });
    const location = useLocation();
    if(location.pathname=="/" || location.pathname=="/en" || location.pathname=="/ar"){
      this.setState({ isVisible: this.isValidDate() });
    }else{
      this.setState({ isVisible: false });
    }

  }

  isValidDate() {
    const currendDate = Date.now();
    if (currendDate >= this.StartDate && currendDate <= this.EndDate) return true;
    return false;
  }
  closeModal() {
    cookie.save('isViewed', true);
    this.setState({ isVisible: false });
  }
  render() {
    const { logo, images, data: { project: { node_locale: locale } } } = this.props;
    const { isVisible } = this.state;
    const isArabic = locale === 'ar';
    let content = [];
    if (locale === 'ar') {
      content = require('./ar.json').content.map((value, index) => ({
        ...value,
        //image: images[index].sizes,
      })).reverse();
    } else {
      content = require('./en.json').content.map((value, index) => ({
        ...value,
        //image: images[index].sizes,
      }));
    }
    return (
      <div className={classnames('popup', { visible: isVisible })} id="popup">
        <div className="popup__wrapper">
          <span className="popup__close" onClick={() => this.closeModal()}>
            <div className="popup__close_inner">
                X
            </div>
          </span>
          <div className="popup__modal">
            <div className="popup__content">
              <div className="container height-inherit">

                <img className="popup__logo" src={logo.file.url} alt={logo.file.title} />
                <Slider
                  arrows
                  dots
                  autoplay
                  infinite
                  easing="ease"
                  speed={1000}
                  autoplaySpeed={5000}
                  slidesToShow={1}
                  // initialSlide={isArabic ? 1 : null}
                  rtl={isArabic}
                >
                  {content.map(value => (
                    <div className="row height-inherit">
                      <div className={classnames('col-lg-8', 'col-md-12', 'height-inherit', { 'col-lg-last': !isArabic })}>
                        <div class="popup__image-wrapper">
                          <img src={value.image_src} alt={value.title} class="popup__image"/>
                        </div>
                      </div>
                      <div className={classnames('col-lg-4', 'col-md-12', 'align-self-center', { 'order-lg-first': !isArabic })}>

                        <div className="popup__title">
                          {value.title}
                        </div>
                        <div className="popup__text">
                          {value.sub_title}
                        </div>
                        <div>
                          <Cta data={{
                            type: 'primary',
                            link: {
                              externalLink: value.url,
                              linkText: value.button_text,
                            },
                          }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className="popup__overlay" />
      </div>
    );
  }
}

