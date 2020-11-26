import React from 'react';
import classnames from 'classnames';
import { Default as Slider } from '../../../shared/components/sliders';
import Statistic from './statistic';

import './statistics.scss';
import TransitionIn from '../../../shared/components/transition-in';


const Statistics = ({ data }) => {
  const tcDelay = (data.values && (data.values instanceof Array)) ? data.values.length * 100 : 0;
  return (
    <div className="statistics">
      {
        data.isSlider ?
          <Slider slidesToShow={2}>{
            data.values.map(
              statisticData => <Statistic key={statisticData.id} data={statisticData} />,
            )
          }</Slider> :
          <div className={
            classnames(
              'statistics-list',
              {
                'statistics-list-layout-vertical': data.layout === 'Vertical',
              },
            )}
          >
            {
              data.values.map((statisticData, index) => (
                <Statistic
                  key={statisticData.id}
                  data={statisticData}
                  animateIn
                  delay={100 * index}
                />
              ))
            }
          </div>
      }
      <TransitionIn transitionDelay={tcDelay}>
        <div className="text-block">
          {data.termsAndConditions}
        </div>
      </TransitionIn>
    </div>
  );
};

export const Section = props => (
  <section className="container statistics-section">
    <Statistics {...props} />
  </section>
);

export default Statistics;

export const statisticsFragment = graphql`
  fragment ContentfulComponentStatisticsFragment on ContentfulComponentStatistics {
    id
    isSlider
    layout
    termsAndConditions
    values {
      id
      ...ContentfulContentStatisticFragment
    }
  }
`;
