/* eslint global-require: off */
/* eslint import/no-dynamic-require: off */
/* eslint no-underscore-dangle: off */

import React from 'react';

import debug from '../shared/debug';
import componentsInfo from './components';

/*
  Renders a contentful component based on the `typename`
 */
export const renderComponent = (component, { keyPrefix, sections = false, props } = {}) => {
  const knownComponentInfo =
    componentsInfo.find(({ typename }) => typename === component.__typename);

  if (!knownComponentInfo) {
    if (debug) {
      console.warn(`[contentful/renderComponent] No component found to render "${component.__typename}". Skipping...`);
    }

    return null;
  }

  if (Object.keys(component).length === 1 && debug) {
    console.warn(`[contentful/renderComponent] No data found to render "${component.__typename}". Maybe you forgot to update the graphql query?`);
  }

  const module = require(`./components/${knownComponentInfo.path}`);

  // If we are rendering the components as sections, try to use the Section export
  // and fallback to the default export
  const Component = (sections ? module.Section || module.default : module.default) || module;

  return (
    <Component
      key={`${keyPrefix != null ? `${keyPrefix}-` : ''}${component.id || component.__typename}`}
      {...props}
      data={component}
    />
  );
};

/*
  Renders a series of components
 */
export const renderPage = (components, options) => (
  components.map((component, index) => (
    renderComponent(component, { keyPrefix: index, sections: true, ...options })
  ))
);

export default {
  renderComponent,
  renderPage,
};
