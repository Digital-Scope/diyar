import React from 'react';
import Img from 'gatsby-image';
import moment from 'moment';
import YouTube from 'react-youtube';

import Title from '../../../shared/components/title';
import './media-details.scss';

export default ({ mainTitle, displayTitle, youtubeId, body, image, publishDate }) => (
  <section className="container media-center-details">
    <Title text={mainTitle}>
      <div className="media-center-details-wrapper">
        {image && <Img sizes={image.sizes} className="media-center-details-image" outerWrapperClassName="media-center-details-image-wrapper" />}
        { youtubeId && !image && <YouTube videoId={youtubeId} className="media-center-details-image-wrapper" />}
        <span className="media-center-details-date">{moment(publishDate).format('D MMM YYYY')}</span>
        <h1 className="media-center-details-header">{displayTitle}</h1>
        <div className="media-center-details-body" dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }} />
      </div>
    </Title>
  </section>
);
