const slugify = require('arslugify');

exports.generateJobPostURL = (jobTitle, jobDate, locale) => {
  const enRoute = `/jobs/${jobDate}/${slugify(jobTitle, '-')}`;
  return locale === 'en' ? enRoute : `/${locale}${enRoute}`;
};
