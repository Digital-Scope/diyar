import React from 'react';
import LocaleContext from './localeContext';

const setLocaleContext = () => (Comp) => {
  const I18nHOC = props => (
    <LocaleContext.Provider
      value={{ locale: props.pathContext.locale,
        translation: props.pathContext.translation }}
    >
      <Comp {...props} />
    </LocaleContext.Provider>
  );

  return I18nHOC;
};

export default setLocaleContext;
