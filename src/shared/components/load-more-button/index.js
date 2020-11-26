import React from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import Icon from '../../../shared/components/icon';
import arrowIcon from '../../../shared/components/icon/load-more-arrow.icon';
import './load-more-button.scss';

const LoadMoreButton = ({ onClick, isVisible, t }) => {
  const containerClasses = classnames({
    'load-more-button-wrapper': true,
    'load-more-button-hidden': !isVisible(),
  });
  return (
    <div className={containerClasses}>
      <div className="load-more-button-container" onClick={onClick}>
        <span className="load-more-button-text">{t('loadMore')}</span>
        <span className="load-more-button-icon">
          <Icon id={arrowIcon.id} />
        </span>
      </div>
    </div>
  );
};

export default translate('labels')(LoadMoreButton);
