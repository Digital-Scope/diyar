/* eslint react/no-danger: off */

import React from 'react';
import classnames from 'classnames';

import TransitionIn from '../transition-in';
import './text-block.scss';

export default ({ children, html, className }) => (
  <TransitionIn>
    <div
      className={classnames('text-block', className)}
      {... (html && {
        dangerouslySetInnerHTML: { __html: children },
      })}
    >
      { html ? null : children }
    </div>
  </TransitionIn>
);
