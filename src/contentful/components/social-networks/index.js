import React from 'react';
import classnames from 'classnames';

import Icon from '../../../shared/components/icon';
import instagramIcon from '../../../shared/components/icon/instagram.icon';
import twitterIcon from '../../../shared/components/icon/twitter.icon';
import facebookIcon from '../../../shared/components/icon/facebook.icon';
import youtubeIcon from '../../../shared/components/icon/youtube.icon';
import linkedinIcon from '../../../shared/components/icon/linkedin.icon';

import './social-networks.scss';

const getIconIdFromUrl = (url) => {
  if (url.match(/instagram\.com/)) {
    return instagramIcon.id;
  } else if (url.match(/twitter\.com/)) {
    return twitterIcon.id;
  } else if (url.match(/facebook\.com/)) {
    return facebookIcon.id;
  } else if (url.match(/youtube\.com/)) {
    return youtubeIcon.id;
  } else if (url.match(/linkedin\.com/)) {
    return linkedinIcon.id;
  }
  return null;
};

export default ({ data, theme = 'light' }) => (
  <div
    className={classnames('social-networks', `theme-${theme}`)}
  >
    {
      data.map(({ url }) => (
        <a key={url} href={url} target="_blank" rel="noreferrer noopener" className="social-networks-item">
          <Icon id={getIconIdFromUrl(url)} />
        </a>
      ))
    }
  </div>
);
