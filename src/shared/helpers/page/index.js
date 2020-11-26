const path = require('path');

const jobListingComponent = 'ContentfulComponentCareersListing';

const pageWithLatestArticlesPath = './src/contentful/pages/page-with-articles.js';
// const careersListingPath = './src/contentful/pages/careers-listing.js';
const normalPagePath = './src/contentful/pages/page.js';

exports.jobListingComponent = jobListingComponent;

exports.getPagePath = (page) => {
  if (page.showLatestArticles && page.category) {
    return path.resolve(pageWithLatestArticlesPath);
  }
  // } else if (page.components && page.components.some(
  //   component => component.__typename === jobListingComponent)
  // ) {
  //   return path.resolve(careersListingPath);
  return path.resolve(normalPagePath);
};

exports.isPageWithLatestArticles = pagePath => (
  pagePath === path.resolve(pageWithLatestArticlesPath)
);

exports.getArticlesCategory = page => page.category || null;

exports.getRawPageTitle = pageTitle => pageTitle.split(' | ')[0]
;
