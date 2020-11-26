import React from 'react';

import BaseLayout from './base-layout';

export default props => <BaseLayout key="with-hero-layout" {...props} headerProps={{ blend: true }} />;

export const withHeroLayoutQueryquery = graphql`
  query WithHeroLayoutQuery {
    ...Layout
  }
`;
