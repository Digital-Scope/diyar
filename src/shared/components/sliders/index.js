import React from 'react';

import Slider from 'react-slick';

import { isDocumentRtl } from '../../helpers/document-direction';
import './sliders.scss';

export const Default = ({ children, ...props }) => (
  <Slider
    autoplay
    arrows={false}
    dots
    easing="ease"
    speed={1000}
    autoplaySpeed={5000}
    infinite
    rtl={isDocumentRtl()}
    appendDots={dots => <div><div className="default-slider-dots container"><ul>{dots}</ul></div></div>}
    customPaging={() => <div className="default-slider-dot" />}
    {...props}
  >
    { children }
  </Slider>
);

export default {
  Default,
};
