import React from 'react';

import './card-text.scss';

export default ({ data }) => (
  <div className="card-text">
    <div className="card-text-title">{ data.displayTitle }</div>
    <div className="card-text-first-line">{ data.firstLine }</div>
    <div className="card-text-body">{ data.text.text }</div>
  </div>
);

export const fragment = graphql`
  fragment ContentfulComponentCardTextFragment on ContentfulComponentCardText {
    displayTitle
    firstLine
    text {
      text
    }
  }
`;
