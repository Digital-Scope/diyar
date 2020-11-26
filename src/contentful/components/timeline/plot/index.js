import React from 'react';

import Year from './year';
import styles from './styles';

import './plot.scss';

const TimelinePlot = props => (
  <div className="timeline-plot-axis">
    <div className="timeline-plot-axis-line" />
    <div
      className="timeline-plot"
      styles={styles.plot()}
    >{
        props.data.map((year, index) => (
          <Year key={year.year} index={index} year={year} {...props} />
        ))
      }
    </div>
  </div>
);

export default TimelinePlot;
