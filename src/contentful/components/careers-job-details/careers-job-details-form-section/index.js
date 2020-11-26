import React from 'react';
import { translate } from 'react-i18next';
import Img from 'gatsby-image';

import CareersJobDetailsForm from './careers-job-details-form';
import SectionTitle from '../../../../shared/components/section-title';
import TransitionIn from '../../../../shared/components/transition-in';

import './careers-job-details-form-section.scss';

const CareersJobDetailsFormSection = ({ data, t }) => (
  <div className="job-details-form container">
    <div className="job-details-form-container">
      <SectionTitle title={t('careersForm').title} />
      <TransitionIn>
        <div className="job-details-form-subtitle">
          {t('careersForm').subtitle}
        </div>
      </TransitionIn>
      {/* FIXME: animation for the form */}
      <CareersJobDetailsForm />
    </div>

    <TransitionIn>
      <div className="job-details-form-benefits">
        <Img
          sizes={data.benefitsImage.sizes}
        />
      </div>
    </TransitionIn>
  </div>
);

export default translate('labels')(CareersJobDetailsFormSection);


export const fragment = graphql`
  fragment ContentfulComponentCareersFormFragment on ContentfulComponentCareersForm {
    benefitsImage {
      sizes(quality: 100, toFormat: JPG) {
        ...GatsbyContentfulSizes
      }
    }
  }
`;
