import React from 'react';

import CardBackground from '../background';
import './card-simple.scss';

export default ({ data }) => (
  <CardBackground secondary>
    <div className="card-simple">
      { data.sentence }
    </div>
  </CardBackground>
);

export const fragment = graphql`
  fragment ContentfulComponentCardSimpleFragment on ContentfulComponentCardSimple {
    id
    sentence
  }
`;
