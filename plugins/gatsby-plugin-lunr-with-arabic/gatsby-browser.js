const lunr = require('lunr');

function getSearchIndexFile() {
  fetch('/search_index.json')
    .then(response => response.json())
    .then((fullIndex) => {
      window.__LUNR__ = Object.keys(fullIndex).reduce(
        (prev, key) => ({
          ...prev,
          [key]: { index: lunr.Index.load(fullIndex[key].index), store: fullIndex[key].store },
        }),
        {},
      );
    })
    .catch(e => console.log(e));
}

exports.onRouteUpdate = (location) => {
  const url = location.location.pathname;
  if (url.endsWith('/search') || url.endsWith('/search/')) {
    require('./lunr-languages/min/lunr.stemmer.support.min')(lunr);
    require('./lunr-languages/min/lunr.ar.min')(lunr);
    getSearchIndexFile();
  }
};
