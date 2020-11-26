import React from 'react';
import { I18n } from 'react-i18next';

import TransitionIn from '../../../shared/components/transition-in';
import SectionTitle from '../../../shared/components/section-title';
import Icon from '../../../shared/components/icon';
import documentPdfIcon from '../../../shared/components/icon/document-pdf.icon';
import './download-files.scss';

const DownloadFiles = ({ data }) => (
  <div className="download-files">
    <SectionTitle title={data.displayTitle} />
    <div className="download-files-list">
      {
        data.files.map(({ id, title, file }, index) => (
          <TransitionIn
            key={id}
            initialStyle={{ opacity: 0, transform: 'translateY(25px)' }}
            finalStyle={{ opacity: 1, transform: 'translateY(0px)' }}
            transitionDelay={index * 100}
            bottomOffset="20px"
          >
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="download-files-list-item"
            >
              <Icon id={documentPdfIcon.id} />
              <div className="download-files-list-item-title">
                <I18n ns="labels">{ translate => translate('download-files').download }</I18n>
                { ` ${title}` }
              </div>
            </a>
          </TransitionIn>
        ))
      }
    </div>
  </div>
);

export const Section = props => (
  <section className="download-files-section container">
    <DownloadFiles {...props} />
  </section>
);

export default DownloadFiles;

export const fragment = graphql`
  fragment ContentfulComponentDownloadFilesFragment on ContentfulComponentDownloadFiles {
    displayTitle
    files {
      id
      file {
        url
      }
      title
    }
  }
`;
