import React from 'react';

const Icon = ({ id, ...props }) => (
  <svg {...props}>
    <use xlinkHref={`#${id}`} />
  </svg>
);

export default Icon;
