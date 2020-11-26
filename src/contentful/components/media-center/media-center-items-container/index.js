import React, { Component } from 'react';

import MediaCenterItem from '../media-center-item';
import './media-center-items-container.scss';

export default ({ mediaItems }) => (
  <div className="media-center-items-container">
    { mediaItems.map(mediaItem => <MediaCenterItem key={mediaItem.id} {...mediaItem} />) }
  </div>
);
