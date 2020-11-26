import React from 'react';
import { translate } from 'react-i18next';

import './contact-us-info.scss';

const ContactUsInfo = ({ data, t }) => (
  <div className="contact-us-info-wrapper">
    <div className="container contact-us-info-container">
      {data.contactOfficeList.map(office => (
        <div className="contact-us-info-inner-container">
          <div className="contact-us-info-inner-container-office">
            {office.officeName}
          </div>
          <div className="contact-us-info-inner-container-rest">
            <div>
              <div className="contact-us-info-inner-container-rest-title">
                {office.department}
              </div>
              <div className="contact-us-info-inner-container-rest-address">
                {office.address.childMarkdownRemark.rawMarkdownBody}
              </div>
            </div>
            <div>
              <div className="contact-us-info-inner-container-rest-tel">
                <a href={`tel:+${office.telephone}`}>{t('contactUsData').Tel}: <span dir="ltr">{office.telephone}</span></a>
              </div>
              <div className="contact-us-info-inner-container-rest-fax">
                <a href={`tel:+${office.fax}`}>{t('contactUsData').Fax}: <span dir="ltr">{office.fax}</span></a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default translate('labels')(ContactUsInfo);

export const contactPeopleFragment = graphql`
  fragment ContentfulComponentContactOfficeFragment on ContentfulComponentContactOffice {
    contactOfficeList {
      officeName
      department
      address {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      telephone
      fax
    }
  }
`;
