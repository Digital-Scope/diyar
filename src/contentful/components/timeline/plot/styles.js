import { isDocumentLtr } from '../../../../shared/helpers/document-direction';

const config = {
  center: 'year',
  transitions: {
    duration: 600,
  },
  event: {
    size: 1.5,
    spacing: 1.5,
    transitionDelay: 50,
  },
  year: {
    size: 1.1,
    spacing: 4,
  },
};

const layout = {
  event: {
    position: position => (
      config.year.spacing +
      (position * (config.event.size + config.event.spacing))
    ),
  },
  year: {
    // Year spacing when it is active to accommodate for all its events
    activeSpacing: totalEvents => (totalEvents * (config.event.size + config.event.spacing)) +
      ((config.year.spacing * 2) - config.event.spacing),
    position: ({ index: position, year, selectedYear: activeYear, years }) => {
      const afterActive = year.year > activeYear.year;
      const activeIndex = years.findIndex(({ year: yearValue }) => yearValue === activeYear.year);
      const totalYears = years.length;

      const activeSpacing = layout.year.activeSpacing(activeYear.events.length);
      const plotSize = (totalYears * config.year.size) +
          ((totalYears - 1) * config.year.spacing) +
          activeSpacing;
      const plotSizeBeforeActive = activeIndex * (config.year.size + config.year.spacing);

      let transform =
          (position * (config.year.size + config.year.spacing));

        // Center plot
      if (config.center === 'year') {
        transform -= plotSizeBeforeActive + (activeSpacing / 2);
      } else if (config.center) {
        transform -= plotSize / 2;
      }

      if (afterActive) {
        // Add extra spacing to the years after the current one selected
        transform += activeSpacing - config.year.spacing;
      }

      return transform;
    },
  },
};

const translateX = position => `translateX(${isDocumentLtr() ? position : -1 * position}rem)`;
const left = position => (isDocumentLtr() ? { left: `${position}rem` } : { right: `${position}rem` });

export default {
  plot: () => ({
    '--event-size': `${config.event.size}rem`,
    '--event-spacing': `${config.event.spacing}rem`,
    '--year-size': `${config.year.size}rem`,
    '--year-spacing': `${config.year.spacing}rem`,
  }),
  year: props => ({
    transform: translateX(layout.year.position(props)),
    transition: `transform ${config.transitions.duration}ms`,
  }),
  events: ({ totalEvents }) => ({
    width: `${layout.year.activeSpacing(totalEvents)}rem`,
    ...left(config.year.size),
  }),
  event: ({ index }) => ({
    transform: translateX(layout.event.position(index)),
    transition: `opacity ${config.transitions.duration}ms ${config.transitions.duration + (config.event.transitionDelay * (index - 1))}ms`,
  }),
};
