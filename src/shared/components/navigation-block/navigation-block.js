import React from 'react';
import classnames from 'classnames';
import Waypoint from 'react-waypoint';

export default ({
  show,
  activeIndex,
  renderMobileBottomBlock,
  onChange,
  onEnter,
  onLeave,
  ...props
}) => {
  const itemsRefs = {};

  return (
    <Waypoint bottomOffset="39%" topOffset="60%" onEnter={onEnter} onLeave={onLeave}>
      <div className="navigation-block">
        <div className={classnames('navigation-block-markers-wrapper', { active: show })}>
          <div className="navigation-block-markers">
            { React.Children.map(props.children, (child, index) => (
              <button
                className={classnames('navigation-block-marker', { active: activeIndex === index })}
                onClick={() => {
                  if (itemsRefs[index]) {
                    itemsRefs[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
                  }
                }}
              >
                { index < 10 ? `0${index + 1}` : index + 1 }
              </button>
            )) }
          </div>
          {
            renderMobileBottomBlock && (
              <div className="navigation-block-markers-mobile-bottom">
                { renderMobileBottomBlock() }
              </div>
            )
          }
        </div>
        <div className="navigation-block-items">
          { React.Children.map(props.children, (child, index) => [
            <Waypoint
              bottomOffset="50%"
              onEnter={() => onChange(index)}
              fireOnRapidScroll={false}
            />,
            React.cloneElement(child, {
              onRef: (ref) => { itemsRefs[index] = ref; },
              className: 'navigation-block-item',
            }),
            <Waypoint topOffset="50%" onEnter={() => onChange(index)} fireOnRapidScroll={false} />,
          ]) }
        </div>
      </div>
    </Waypoint>
  );
};
