/* eslint no-shadow: off */

import React, { Component } from 'react';
import moment from 'moment';

import { previous, next } from '../../../shared/helpers/circular-array';
import Timeline from './timeline';
import './timeline.scss';

/*
  A timeline is a set of years. Each year has multiple events sorted by date.
 */
const createTimeline = data => Object.values(data.events.reduce((timeline, event) => {
  const date = moment(event.date);
  const year = timeline[date.year()];

  return {
    ...timeline,
    [date.year()]: {
      year: date.year(),
      events: [
        ...(year && [...year.events]),
        {
          id: event.id,
          date: event.date,
          title: event.displayTitle,
        },
      ]
        .filter(event => !!event)
        .sort((event1, event2) => (moment(event1.date).isAfter(event2.date) ? 1 : -1)),
    },
  };
}, {})).sort(({ year: year1 }, { year: year2 }) => (year1 > year2 ? 1 : -1));

export default class TimelineContainer extends Component {
  constructor(props) {
    super(props);

    const timeline = createTimeline(props.data);
    // Default selected year and event are the latest ones
    const mostRecentYear = timeline[timeline.length - 1];
    const mostRecentEvent = mostRecentYear.events[mostRecentYear.events.length - 1];

    this.state = {
      timeline,
      selectedYear: mostRecentYear,
      selectedEvent: mostRecentEvent,
    };

    this.selectYear = (year) => {
      this.setState({
        selectedYear: year,
        selectedEvent: year.events[year.events.length - 1],
      });
    };
    this.selectEvent = (event) => {
      this.setState({ selectedEvent: event });
    };

    this.selectPreviousYear = () => (
      this.selectYear(previous(this.state.selectedYear, this.state.timeline))
    );
    this.selectNextYear = () => (
      this.selectYear(next(this.state.selectedYear, this.state.timeline))
    );
  }

  render() {
    return (
      <Timeline
        data={this.state.timeline}
        selectedYear={this.state.selectedYear}
        selectedEvent={this.state.selectedEvent}
        onYearSelected={this.selectYear}
        onEventSelected={this.selectEvent}
        selectPreviousYear={this.selectPreviousYear}
        selectNextYear={this.selectNextYear}
      />
    );
  }
}
