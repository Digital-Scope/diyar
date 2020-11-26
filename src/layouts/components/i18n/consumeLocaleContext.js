import React from 'react';
import LocaleContext from './localeContext';


const consumeLocaleContext = () => (Comp) => {
  const withLocale = props => (
    <LocaleContext.Consumer >
      {translation => (<Comp {...props} translation={translation.translation} />)}
    </LocaleContext.Consumer>
  );
  return withLocale;
};

export default consumeLocaleContext;
