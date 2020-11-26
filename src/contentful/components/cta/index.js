import React from 'react';
import classnames from 'classnames';

import Icon from '../../../shared/components/icon';
import ctaArrowIcon from '../../../shared/components/icon/cta-arrow.icon';
import ContenfulLink from '../link';

import './cta.scss';

const Cta = ({ data, arrow = true, className }) => (
  <div
    className={classnames(
      'cta',
      `cta-${(data.type || 'primary').toLowerCase()}`,
      { 'no-arrow': !arrow },
      className,
    )}
  >
    <ContenfulLink
      data={data.link}
    />
    <div className="cta-icon">
      <Icon id={ctaArrowIcon.id} />
    </div>
  </div>
);

export const Section = props => (
  <section className="cta-section container">
    <Cta {...props} />
  </section>
);

export default Cta;

export const ctaFragment = graphql`
  fragment ContentfulComponentCtaFragment on ContentfulComponentCta {
    id
    link {
      ...ContentfulComponentLinkFragment
    }
    type
  }
`;
