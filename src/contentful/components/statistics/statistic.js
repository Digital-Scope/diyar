import React from 'react';
import classnames from 'classnames';

import TransitionIn from '../../../shared/components/transition-in';
import './statistics.scss';

const Statistic = ({ data }) => [
  <div key="value" className={classnames('statistics-value', { 'side-unit': data.unit === '%' })}>
    <div className="statistics-value-number">{ data.value }</div>
    <div className="statistics-value-unit">{ data.unit }</div>
  </div>,
  <div key="description" className="statistics-description">
    <div className="statistics-description-type">{ data.type }</div>
    <div className="statistics-description-name">{ data.name }</div>
    <div className="statistics-description-text">{ data.description }</div>
  </div>,
];

export default ({ animateIn, delay = 0, ...props }) => (
  animateIn ? (
    <TransitionIn transitionDelay={delay}>
      <div className="statistics-value-container">
        <Statistic data={props.data} />
      </div>
    </TransitionIn>
  ) :
    <div className="statistics-value-container">
      <Statistic data={props.data} />
    </div>
);


export const statisticsFragment = graphql`
  fragment ContentfulContentStatisticFragment on ContentfulContentStatistic {
    value
    unit
    name
    description
    type
  }
`;
