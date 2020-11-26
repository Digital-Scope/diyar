import React from 'react';
import classnames from 'classnames';

import TransitionIn from '../transition-in';
import './title.scss';

export default ({ children, text, className }) => (text ?
  (
    <div className={classnames('title-wrapper', className)}>
      <div className={classnames('title', { 'title-mb-0': text.trim().length <= 1 })}>
        <TransitionIn
          initialStyle={{ opacity: 0, transform: 'translateY(-20px)' }}
          finalStyle={{ opacity: 1, transform: 'translateY(0)' }}
        >
          <div className="title-text">{ text }</div>
        </TransitionIn>
      </div>
      { children }
    </div>
  ) : children);
