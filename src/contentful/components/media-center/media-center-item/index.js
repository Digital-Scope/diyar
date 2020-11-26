import React from 'react';
import Img from 'gatsby-image';
import moment from 'moment';
import 'moment/locale/ar';
import YouTube from 'react-youtube';
import consumeLocaleContext from '../../../../layouts/components/i18n/consumeLocaleContext';
import ReadMoreButton from '../../../../shared/components/read-more-button';
import './media-center-item.scss';

const MediaCenterItem = ({ displayTitle, youtubeId, image, publishDate, url, excerpt, translation }) => (
  <div className="media-center-item-wrapper">
    {image && <Img sizes={image.sizes} className="media-center-item-image" outerWrapperClassName="media-center-item-image-wrapper" />}
    { youtubeId && !image && <YouTube videoId={youtubeId} className="media-center-item-image-wrapper" />}
    <span className="media-center-item-date">{moment(publishDate).format('D MMM YYYY')}</span>
    <h2 className="media-center-item-header">{displayTitle}</h2>
    <div className="media-center-item-body">{ excerpt }</div>
    <ReadMoreButton text={translation.latestArticles.readMore} articleLink={url} />
  </div>
);

export default consumeLocaleContext()(MediaCenterItem);
