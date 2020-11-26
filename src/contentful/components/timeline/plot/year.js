import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

import Event from './event';
import styles from './styles';

export default ({ index, year, ...props }) => (
  <div
    key={year.year}
    role="presentation"
    className={classnames(
      'timeline-plot-year',
      { active: year.year === props.selectedYear.year },
    )}
    style={styles.year({ index, year, years: props.data, ...props })}
    onClick={() => props.onYearSelected(year)}
  >
    <div className="timeline-plot-year-marker" />
    <div className="timeline-plot-year-number">{ moment(year.events[0].date).format('YYYY') }</div>
    <div
      className="timeline-plot-events"
      style={styles.events({ totalEvents: year.events.length })}
    >
      {
        year.events.map((event, eventIndex) => (
          <Event
            key={event.id}
            event={event}
            index={eventIndex}
            isOnSecondHalf={eventIndex >= (year.events.length / 2)}
            style={styles.event({ index: eventIndex })}
            {...props}
          />
        ))
      }
    </div>
  </div>
);
