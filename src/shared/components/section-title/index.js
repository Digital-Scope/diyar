import React from 'react';
import classnames from 'classnames';

import TransitionIn from '../transition-in';
import './section-title.scss';

export default ({ children, title, className }) => (
  <TransitionIn>
    <div className={classnames('section-title', className)}>
      <h2 className="section-title-title">{title || children}</h2>
      <div className="section-title-underline" />
    </div>
  </TransitionIn>
);
