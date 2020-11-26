import React from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import Cta from '../../cta';
import CardBackground from '../background';
import './card-project.scss';

const CardProject = ({ wrapperClassName, className, data, t }) => (
  <CardBackground className={wrapperClassName}>
    <div className={classnames(className, 'card-project')}>
      <div className="card-project-title">
        { data.displayTitle }
      </div>
      <div className="card-project-description">
        { data.description.description }
      </div>
      {
        data.link && data.link.link &&
          <Cta data={{
            type: 'simple',
            link: {
              ...data.link.link,
              linkText: t('projectsList').ctaText,
            },
          }}
          />
      }
    </div>
  </CardBackground>
);

export default translate('labels')(CardProject);
//
// export const fragment = graphql`
//   fragment ContentfulComponentCardProjectFragment on ContentfulComponentCardProject {
//     id
//     displayTitle,
//     link {
//       ...ContentfulComponentCtaFragment
//     }
//   }
// `;
