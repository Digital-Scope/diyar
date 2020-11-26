import React from 'react';
import classnames from 'classnames';
import TextBlock from '../../../shared/components/text-block';
import Icon from '../../../shared/components/icon';
import phoneIcon from '../../../shared/components/icon/phone.icon';
import { isArabicURL } from '../../../shared/helpers/misc';
import './phone-contact.scss';

const phoneContact = (phoneNumber, textClass, containerStyling, contactStyling, location) => {
  const isArabic = location && location.pathname && isArabicURL(location.pathname);
  return (
    <div className={containerStyling}>
      <a href={`tel:${phoneNumber}`}>
        <TextBlock>
          <div className={classnames(textClass, contactStyling)}>
            <div className="landing-page-layout-call-icon-phone__direction">
              &nbsp;
              {phoneNumber}
              &nbsp;
            </div>
            <div>
              <Icon id={phoneIcon.id} className={classnames({ 'landing-page-layout-call-icon-phone__rotate': isArabic })} />
            </div>
          </div>
        </TextBlock>
      </a>
    </div>
  );
};

const PhoneContactMobile = ({ phoneNumber, textClass, location }) => (
  phoneContact(
    phoneNumber,
    textClass,
    'landing-page-layout-call-icon-popup-phone-container',
    'landing-page-layout-call-icon-phone landing-page-layout-call-icon-phone__typography',
    location,
  )
);


const PhoneContactDesktop = ({ phoneNumber, textClass, location }) => (
  phoneContact(
    phoneNumber,
    textClass,
    null,
    'landing-page-layout-call-icon-phone',
    location,
  )
);

export { PhoneContactMobile, PhoneContactDesktop };
