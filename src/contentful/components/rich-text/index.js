import React from 'react';

import './rich-text.scss';

export default ({ data }) => (
  <div className="container rich-text-container">
    <div dangerouslySetInnerHTML={{ __html: data.text.childMarkdownRemark.html }} />
  </div>
);

export const linkFragment = graphql`
  fragment ContentfulComponentRichTextFragment on ContentfulComponentRichText {
    text {
      childMarkdownRemark {
        html
      }
    }
  }
`;
