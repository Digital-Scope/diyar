import React from 'react';
import classnames from 'classnames';

import Link from '../../../shared/components/link';

import './header-simple.scss';

const Header = ({
  data,
  blend,
}) => (
  <header className={classnames('header-simple', 'container', { blend })}>
    <Link to="/" className="header-simple-image">
      <img src={data.logoWhite.file.url} alt={data.logoWhite.file.title} />
    </Link>
  </header>
);

export const headerFragment = graphql`
  fragment ContentfulComponentHeaderSimpleFragment on ContentfulComponentHeader {
    logoWhite {
      file {
        url
      }
    }
  }
`;

export default Header;
