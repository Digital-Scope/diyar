import React from 'react';
import Img from 'gatsby-image';
import moment from 'moment';
import consumeLocaleContext from '../../../../layouts/components/i18n/consumeLocaleContext';
import YouTube from 'react-youtube';

import ReadMoreButton from '../../../../shared/components/read-more-button';
import './latest-article-item.scss';

const LatestArticleItem = ({ displayTitle, image, youtubeId, publishDate, excerpt, articleLink, translation: t }) => (
  <article className="latest-article-item">
    {image && <div className="latest-article-item-image">
      <Img sizes={image.sizes} className="media-center-details-image" outerWrapperClassName="media-center-details-image-wrapper" />
    </div>}
    {youtubeId && !image && <div className="latest-article-item-image">
      <YouTube
        videoId={youtubeId}
        className="media-center-details-image-wrapper"
      />
    </div>}
    <div>
      <div className="latest-article-item-date">{moment(publishDate).format('D MMM YYYY')}</div>
      <div className="latest-article-item-header">{displayTitle}</div>
      <div className="latest-article-item-excerpt">{excerpt}</div>

      <ReadMoreButton text={t.latestArticles.readMore} articleLink={articleLink} />
    </div>
  </article>
);

export default consumeLocaleContext()(LatestArticleItem);
