import React from 'react';

import BaseLayout from './base-layout';

export default props => <BaseLayout key="layout" {...props} />;

export const defaultLayoutQuery = graphql`
  query DefaultLayoutQuery {
    ...Layout
  }
`;
