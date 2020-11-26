const slugify = require('arslugify');

// We need to limit the route size otherwise it will create a huge route
// which will reflect in a huge file name: which is not supported in the deployed server
const MAX_TITLE_SIZE = 70;

exports.generateArticleURL = (articleTitle, locale = 'en') => {
  const slugifiedTitle = slugify(articleTitle, '-').slice(0, MAX_TITLE_SIZE);

  return locale === 'en' ?
    `/articles/${slugifiedTitle}` :
    `/${locale}/articles/${slugifiedTitle}`;
};

exports.generateNewsURL = (newsTitle, locale = 'en') => {
  const slugifiedTitle = slugify(newsTitle, '-').slice(0, MAX_TITLE_SIZE);

  return locale === 'en' ?
    `/news/${slugifiedTitle}` :
    `/${locale}/news/${slugifiedTitle}`;
};
