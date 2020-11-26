import React from 'react';
import classnames from 'classnames';

import './card-background.scss';

export default ({ children, className, secondary }) => (
  <div className={classnames('card-background', className)}>
    <div
      className={classnames(
        'card-background-square',
        { secondary },
      )}
    />
    { children }
  </div>
);
