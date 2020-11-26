import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

const Event = ({ event, index, style, isOnSecondHalf, ...props }) => (
  <div
    role="presentation"
    className={classnames(
      'timeline-plot-event',
      { active: event.id === props.selectedEvent.id },
      { 'second-half': isOnSecondHalf },
    )}
    style={style}
    onClick={(eventObject) => {
      props.onEventSelected(event);
      // Stop propagation otherwise we would be calling the change year handler as well
      eventObject.stopPropagation();
    }}
  >
    <div className="timeline-plot-event-date">
      { moment(event.date).format('MMMM D') }
    </div>
    <div className="timeline-plot-event-point" />
    <div className="timeline-plot-event-active-line" />
    <div className="timeline-plot-event-active-info">
      <div className="timeline-plot-event-active-info-date">
        { moment(event.date).format('MMMM D, YYYY') }
      </div>
      <div className="timeline-plot-event-active-info-title">
        { event.title }
      </div>
    </div>
  </div>
);

export default Event;
