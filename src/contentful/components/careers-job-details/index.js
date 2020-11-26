import React, { Component } from 'react';
import moment from 'moment';
import { translate } from 'react-i18next';
import Img from 'gatsby-image';

import Title from '../../../shared/components/title';
import SectionTitle from '../../../shared/components/section-title';
import TransitionIn from '../../../shared/components/transition-in';

import CareersJobDetailsFormSection from './careers-job-details-form-section';

import './careers-job-details.scss';

const CareersJobDetails = ({ mainTitle, jobTitle, postDate, jobDescription, place, benefits, t }) => (
  <section className="container job-details-wrapper">
    <Title text={mainTitle}>
      <div>
        <TransitionIn>
          <div className="job-details-full-card">
            <SectionTitle title={jobTitle} />
            <div className="job-details-full-card-date-and-place-container">
              <div className="job-details-full-card-date">{postDate}</div>
              <div className="job-details-full-card-place">{place}</div>
            </div>
            <div className="job-details-full-card-description" dangerouslySetInnerHTML={{ __html: jobDescription.childMarkdownRemark.html }} />
          </div>
        </TransitionIn>

      </div>
    </Title>
    <CareersJobDetailsFormSection benefits={benefits} />
  </section>
);

export default translate('labels')(CareersJobDetails);
