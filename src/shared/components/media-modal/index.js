/* eslint jsx-a11y/no-static-element-interactions: off */

import React from 'react';
import Img from 'gatsby-image';
import { PortalWithState } from 'react-portal';

import closeIcon from '../icon/cross.icon';
import Icon from '../icon';
import './media-modal.scss';
import YoutubeVideo from '../youtube-video';

export default ({ children, className, style, media }) => (
  <PortalWithState closeOnOutsideClick closeOnEsc>
    {({ openPortal, closePortal, portal }) => (
      <React.Fragment>
        <button
          onClick={openPortal}
          className={className}
          style={style}
        >
          { children }
        </button>
        {
          portal(
            <div className="media-modal">
              {!media.isVideo && (<Img
                sizes={media.sizes}
                outerWrapperClassName="media-modal-item-wrapper"
                className="media-modal-item"
                imgStyle={{ objectFit: 'contain' }}
              />)}
              {media.isVideo && (
                <div className="media-modal-item-wrapper">
                  <YoutubeVideo
                    mute={false}
                    url={media.url}
                    controls
                  /></div>)}
              <button
                className="media-modal-close"
                onClick={closePortal}
              >
                <Icon id={closeIcon.id} />
              </button>
            </div>,
          )
        }
      </React.Fragment>
    )}
  </PortalWithState>
);
