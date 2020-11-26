import React from 'react';
import moment from 'moment';
import { translate } from 'react-i18next';
import GatsbyLink from 'gatsby-link';

import Icon from '../../../../shared/components/icon';
import ctaArrowIcon from '../../../../shared/components/icon/cta-arrow.icon';

import './careers-listing-card.scss';

const CareersListingCard = ({ jobTitle, postDate, place, excerpt, url, t }) => (
  <div className="careers-listing-card-wrapper">
    <div className="careers-listing-card">
      <div className="careers-listing-card-header">
        <div className="careers-listing-card-name">{jobTitle}</div>
        <div className="careers-listing-card-date">{moment(postDate).format('D-M-YYYY')}</div>
      </div>
      <div className="careers-listing-card-place">{place}</div>
      <div className="careers-listing-card-summary">
        {excerpt}
      </div>
      <div className="careers-listing-card-button-wrapper">
        <GatsbyLink to={url} className="careers-listing-card-button">
          <span>{t('careersListing').applyButtonText}</span>
          <Icon id={ctaArrowIcon.id} />
        </GatsbyLink>
      </div>
    </div>
  </div>
);

export default translate('labels')(CareersListingCard);
