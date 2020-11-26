import React from 'react';
import classnames from 'classnames';

import Icon from '../../../shared/components/icon';
import ctaArrowIcon from '../../../shared/components/icon/cta-arrow.icon';
import './form-submit-button.scss';

const FormSubmitButton = ({ text, isSubmitting, status }) => {
  const buttonContainerClass = classnames({
    'form-submit-button': true,
    'form-submit-button-loading': isSubmitting,
  });
  const buttonNormalClass = classnames({
    'form-submit-button-icon': !isSubmitting,
    'form-submit-button-hide': isSubmitting,
  });
  const buttonSubmittingClass = classnames({
    'form-submit-button-loading-indicator': isSubmitting,
    'sk-fading-circle': isSubmitting,
    'form-submit-button-hide': !isSubmitting,
  });

  const statusClasses = classnames({
    'form-submit-button-status': true,
    'form-submit-button-status-success': status && status.type === 'success',
    'form-submit-button-status-failure': status && status.type === 'error',
  });
  return (
    <div>
      <button className={buttonContainerClass} type="submit" disabled={isSubmitting}>
        <span className="form-submit-button-text">{text}</span>
        <span className={buttonNormalClass}>
          <Icon id={ctaArrowIcon.id} />
        </span>
        <div
          className={buttonSubmittingClass}
          data-contact-us-spinner
        >
          <div className="sk-circle1 sk-circle-submit" />
          <div className="sk-circle2 sk-circle-submit" />
          <div className="sk-circle3 sk-circle-submit" />
          <div className="sk-circle4 sk-circle-submit" />
          <div className="sk-circle5 sk-circle-submit" />
          <div className="sk-circle6 sk-circle-submit" />
          <div className="sk-circle7 sk-circle-submit" />
          <div className="sk-circle8 sk-circle-submit" />
          <div className="sk-circle9 sk-circle-submit" />
          <div className="sk-circle10 sk-circle-submit" />
          <div className="sk-circle11 sk-circle-submit" />
          <div className="sk-circle12 sk-circle-submit" />
        </div>
      </button>
      {status && <div className={statusClasses}>{status.message}</div>}
    </div>
  );
};

export default FormSubmitButton;
