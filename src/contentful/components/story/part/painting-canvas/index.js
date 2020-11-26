/* eslint no-useless-escape: off */

import React, { Component } from 'react';
import Img from 'gatsby-image';
import classnames from 'classnames';

import IsDeviceTouch from '../../../../../shared/components/is-device-touch';
import './painting-canvas.scss';

export default class PaintingCanvas extends Component {
  constructor() {
    super();

    this.canvasRef = React.createRef();
    this.containerRef = React.createRef();
  }

  onLoadImage() {
    const container = this.containerRef.current;
    // Only get the one image that has the real image,
    // not any other preview elements like svgs or base64 images
    const image = container.querySelector("img[src^='//']");
    const canvas = this.canvasRef.current;

    // Scale the canvas, since the image is being scaled according to the
    // "background-position: cover"/"object-fit: cover" algorithm.
    canvas.width = image.clientHeight * this.props.image.sizes.aspectRatio;
    canvas.height = image.clientHeight;

    const canvasContext = canvas.getContext('2d');

    canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);
    container.classList.add('in');
    this.imageLoaded = true;

    const brushSize = Math.max(canvas.width * 0.1, 50);

    canvasContext.globalCompositeOperation = 'destination-out';
    canvasContext.lineWidth = brushSize;
    canvasContext.lineJoin = 'butt';
    canvasContext.lineCap = 'butt';

    const getBrushPosition = (x, y) => {
      const canvasRect = canvas.getBoundingClientRect();

      return {
        x: Math.floor(
          ((x - canvasRect.left) / (canvasRect.right - canvasRect.left)) *
          canvas.width,
        ),
        y: Math.floor(
          ((y - canvasRect.top) / (canvasRect.bottom - canvasRect.top)) *
          canvas.height,
        ),
      };
    };

    const drawLine = (startPoint, endPoint) => {
      canvasContext.beginPath();

      canvasContext.globalAlpha = 1;
      canvasContext.moveTo(startPoint.x - 4, startPoint.y - 4);
      canvasContext.lineTo(endPoint.x - 4, endPoint.y - 4);
      canvasContext.stroke();

      canvasContext.globalAlpha = 0.6;
      canvasContext.moveTo(startPoint.x - 2, startPoint.y - 2);
      canvasContext.lineTo(endPoint.x - 2, endPoint.y - 2);
      canvasContext.stroke();

      canvasContext.globalAlpha = 0.4;
      canvasContext.moveTo(startPoint.x, startPoint.y);
      canvasContext.lineTo(endPoint.x, endPoint.y);
      canvasContext.stroke();

      canvasContext.globalAlpha = 0.3;
      canvasContext.moveTo(startPoint.x + 2, startPoint.y + 2);
      canvasContext.lineTo(endPoint.x + 2, endPoint.y + 2);
      canvasContext.stroke();

      canvasContext.globalAlpha = 0.2;
      canvasContext.moveTo(startPoint.x + 4, startPoint.y + 4);
      canvasContext.lineTo(endPoint.x + 4, endPoint.y + 4);
      canvasContext.stroke();

      canvasContext.fill();
    };

    canvas.addEventListener('mousemove', (event) => {
      this.setPaintingStarted();

      if (this.isDeviceTouch) {
        return;
      }

      event.preventDefault();
      const point = getBrushPosition(event.clientX, event.clientY);

      drawLine({ x: point.x - 5, y: point.y - 5 }, { x: point.x + 5, y: point.y + 5 });
    }, false);

    canvas.addEventListener('touchstart', (event) => {
      this.setPaintingStarted();
      this.isDeviceTouch = true;

      const touch = event.targetTouches[0];

      if (touch) {
        const point = getBrushPosition(touch.clientX, touch.clientY);

        drawLine({ x: point.x - 10, y: point.y - 10 }, { x: point.x + 10, y: point.y + 10 });
      }
    }, { capture: false, passive: false });
  }

  setPaintingStarted() {
    if (this.paintingStarted) {
      return;
    }

    this.paintingStarted = true;
    this.props.onFirstPaint();
  }

  render() {
    return (
      <IsDeviceTouch>{
        isDeviceTouch => (
          <div
            className={classnames(
              'painting-canvas',
              {
                'painting-started': !this.props.showPaintHint,
                in: this.imageLoaded,
                'device-is-touch': isDeviceTouch,
              },
            )}
            ref={this.containerRef}
          >
            <Img
              sizes={this.props.image.sizes}
              outerWrapperClassName="painting-canvas-image-wrapper"
              className="painting-canvas-image"
              onLoad={() => this.onLoadImage()}
              imgStyle={{ objectFit: 'contain' }}
            />
            <canvas ref={this.canvasRef} />
            <div className="painting-canvas-hint" />
          </div>
        )}</IsDeviceTouch>
    );
  }
}
