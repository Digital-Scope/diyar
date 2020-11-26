import React from 'react';
import Icon from '../../../shared/components/icon';
import arrowIcon from "../../../shared/components/icon/cta-arrow.icon";
import GatsbyLink from 'gatsby-link';

import './read-more-button.scss';

export default ({ text, articleLink }) => (
    <GatsbyLink className="read-more-button-wrapper" to={articleLink}>
        <span className="read-more-button-link">{text}</span>
        <span className="read-more-button-icon">
            <Icon id={arrowIcon.id} />
        </span>
    </GatsbyLink>
);